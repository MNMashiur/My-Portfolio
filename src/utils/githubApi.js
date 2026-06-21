export async function fetchGitHubStats(username) {
  try {
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    // PROFILE
    const profileRes = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const profile = await profileRes.json();

    // REPOSITORIES
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const repos = await reposRes.json();

    // LANGUAGES (real byte-based)
    const languageBytes = {};

    for (const repo of repos) {
      if (!repo.languages_url) continue;

      const langRes = await fetch(repo.languages_url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const repoLanguages = await langRes.json();

      Object.entries(repoLanguages).forEach(([lang, bytes]) => {
        languageBytes[lang] = (languageBytes[lang] || 0) + bytes;
      });
    }

    const totalBytes = Object.values(languageBytes).reduce(
      (a, b) => a + b,
      0
    );

    const languages = Object.entries(languageBytes)
      .map(([name, bytes]) => ({
        name,
        percentage: ((bytes / totalBytes) * 100).toFixed(2),
      }))
      .sort((a, b) => b.percentage - a.percentage);

    // GRAPHQL (Contributions + Streak)
    const graphRes = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query($login: String!) {
            user(login: $login) {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { login: username },
      }),
    });

    const graphData = await graphRes.json();

    const contributionData =
      graphData.data.user.contributionsCollection.contributionCalendar;

    const contributions = contributionData.weeks.flatMap((week) =>
      week.contributionDays.map((day) => day.contributionCount)
    );

    // Calculate streak
    let currentStreak = 0;
    for (let i = contributions.length - 1; i >= 0; i--) {
      if (contributions[i] > 0) {
        currentStreak++;
      } else {
        break;
      }
    }

    return {
      profile,
      repos,
      languages,
      contributions,
      totalContributions: contributionData.totalContributions,
      currentStreak,
    };
  } catch (error) {
    console.error("GitHub API Error:", error);
    return null;
  }
}