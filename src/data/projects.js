export const initialProjects = [
  {
    id: "project1",
    title: "MovieMeter",
    category: "Full Stack , Web",
    description: "MovieMeter is a full-stack movie discovery and review platform inspired by IMDb, Letterboxd, and Netflix UI design. Users can browse trending movies, view detailed movie information, add favorites, rate movies, write reviews, and manage personal profiles securely.",
    longDescription: "MovieMeter is a full-stack movie discovery and review platform where users can browse movies, explore detailed information, rate and review films, save favorites, and manage personal profiles — built with React, Node.js, Express, and MongoDB.",
    tags: ["React", "Tailwind CSS", "Chart.js", "Node.js", "Jest", "Playwright"],
    githubUrl: "https://github.com/MNMashiur/MovieMeter",
    liveUrl: "https://moviemeter-web.vercel.app/",
    features: [
      "Movie Discovery: Browse trending movies with infinite scroll, and search by title using the TMDb API.",
      "Movie Details Page: View comprehensive movie information including synopsis, cast, trailers, and user reviews.",
      "Ratings & Reviews: Authenticated users can rate movies on a 5-star scale and write detailed reviews with markdown support.",
      "Favorites System: Users can add movies to their favorites list and view them on their profile page.",
      "User Profiles: Each user has a profile page displaying their reviews, ratings, and favorite movies.",
      "Responsive Design: The UI is fully responsive and optimized for both desktop and mobile devices."
    ],
    challenges: [
      "Integrating the TMDb API efficiently while managing rate limits and ensuring fast load times for movie data.",
    ],
    learnings: [
      "Gained hands-on experience with React state management and component architecture to build a scalable full-stack application.",
    ],
    architecture: "The frontend is built with React and Tailwind CSS, utilizing Context API for state management. The backend is a Node.js Express server that handles user authentication, review management, and interacts with the TMDb API. Jest and Playwright are used for unit and end-to-end testing.",
    image: "/projects/MovieMeter.png",
    screenshots: [
      "/projects/MovieMeter1.png",
      "/projects/MovieMeter2.png",
      "/projects/MovieMeter3.png",
    ]
  },

  {
    id: "project2",
    title: "Portfolio Website",
    category: "Web",
    description: "A modern, responsive developer portfolio built to showcase my skills, projects, technical expertise, and professional journey with interactive animations and customizable themes.",
    longDescription: "This portfolio website is a fully responsive and interactive web application designed to represent my personal brand as a Software Engineering student and developer. It highlights my expertise in Web Development, Android Development, Software Quality Assurance, AI/ML, and UI/UX design. The portfolio includes sections for my projects, technical skills, testimonials, contact information, and downloadable resume. Built with modern frontend technologies, the application focuses on clean UI design, smooth animations, customizable themes, and optimized user experience. It also integrates local storage for user preferences, dynamic content management using Context API, and reusable modular components to ensure scalability and maintainability.",
    tags: ["React, Vite, Tailwind CSS, Framer Motion, Context API, JavaScript, LocalStorage"],
    githubUrl: "https://github.com/MNMashiur/My-Portfolio",
    liveUrl: "https://example.com/fittrack",
    features: [
      "Admin Dashboard to do regular activities like adding new projects, updating skills, managing testimonials, and customizing theme settings",
      "Responsive design for all devices",
      "Interactive hero section with animated particles",
      "Dynamic theme customization (colors, typography, animations)",
      "Project showcase with detailed modal view",
      "Skills section with categorized progress indicators",
      "Testimonials slider with autoplay",
      "Contact form integration",
      "Downloadable resume support",
      "Social media integration",
      "LocalStorage-based user preferences",
      "Smooth scrolling navigation",
      "Animated transitions using Framer Motion"

    ],
    challenges: [
      "Managing dynamic theme switching globally",
      "Fixing React Fast Refresh and ESLint warnings",
      "Implementing stable particle animations without render purity issues",
      "Creating reusable and scalable component structures",
      "Handling localStorage synchronization with Context API",
      "Designing responsive layouts for multiple screen sizes",
      "Optimizing animations for performance and smooth user experience"
    ],
    learnings: [
      "Advanced React component architecture",
      "Context API state management",
      "Framer Motion animation handling",
      "Tailwind CSS advanced styling techniques",
      "Theme persistence using localStorage",
      "Responsive UI/UX principles",
      "Performance optimization in frontend apps",
      "Better code modularization and maintainability"
    ],
    architecture: "Modern frontend web application built with React (Vite) following a Component-Based Architecture, utilizing Context API for global state management, LocalStorage for persistent user preferences and data caching, Framer Motion for animations, and Tailwind CSS for responsive UI design.",
    image: "/projects/portfolio.png",
    screenshots: [
      "/projects/portfolio1.png",
      "/projects/portfolio2.png"
    ]
  },

  {
    id: "project3",
    title: "FABIP",
    category: "AI/ML, Research",
    description: "FABIP (Fairness-Aware Bias Impact Pruning) is a machine learning research project focused on reducing algorithmic bias while optimizing neural network efficiency through structured pruning. It introduces a novel fairness-aware pruning framework for responsible AI systems.",
    longDescription: "FABIP is a fairness-aware structured pruning framework designed to identify and remove bias-causing neurons in neural networks while preserving predictive performance. Built using PyTorch, the project evaluates fairness, efficiency, and model performance across multiple benchmark datasets including COMPAS, Adult Income, and German Credit.",
    tags: ["Python", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Google Colab"],
    githubUrl: "https://github.com/MNMashiur/FABIP-Fairness-Aware-Bias-Impact-Pruning-for-Sustainable-and-Fair-Recidivism-Prediction",
    liveUrl: "",
    features: [
      "Bias Impact Score (BIS): Introduced a dual-verification metric combining gradient attribution and ablation testing to identify bias-causing neurons.",
      "Fairness-Aware Pruning Score (FPS): Ranked neurons based on fairness impact and importance for structured pruning.",
      "Structured Pruning: Reduced model size and computational cost by physically removing neurons instead of zeroing weights.",
      "Fairness Evaluation: Measured Demographic Parity, Equalized Odds, and Disparate Impact across sensitive groups.",
      "Multi-Dataset Testing: Evaluated the framework on COMPAS, Adult Income, and German Credit datasets.",
      "Efficiency Optimization: Achieved significant FLOPs reduction while maintaining near-baseline model accuracy."
    ],
    challenges: [
      "Designing a pruning mechanism that balances fairness, computational efficiency, and predictive accuracy without heavily sacrificing any of them."
    ],
    learnings: [
      "Gained practical experience in fairness-aware machine learning, neural network pruning, bias mitigation techniques, and experimental evaluation of responsible AI systems."
    ],
    architecture: "The project is built using PyTorch with a multi-layer perceptron (MLP) architecture. The workflow includes baseline training, Bias Impact Score computation, Fairness Pruning Score calculation, structured pruning, and fine-tuning. Evaluation includes fairness metrics, efficiency analysis, ablation studies, and sensitivity testing.",
    image: "/projects/fabip.png",
    screenshots: [
      "/projects/fabip1.png",
      "/projects/fabip2.png",
      "/projects/fabip3.png",
      "/projects/fabip4.png"
    ]
  },

  {
    id: "project4",
    title: "SDN-Intrusion-Detection",
    category: "AI/ML, Cybersecurity",
    description: "A machine learning-based intrusion detection system for Software-Defined Networks (SDN) using the InSDN dataset. The project focuses on detecting malicious network traffic and classifying attacks with high accuracy using multiple supervised learning models.",
    longDescription: "This project develops an intelligent intrusion detection framework for Software-Defined Networks (SDN) using machine learning techniques. Built on the InSDN dataset, it evaluates multiple classification algorithms including Logistic Regression, Decision Tree, Random Forest, KNN, Gradient Boosting, XGBoost, and Ensemble Voting to identify and classify network attacks. The system improves network security by detecting abnormal traffic patterns with strong accuracy, robustness, and scalability for modern SDN environments.",
    tags: ["Python", "Scikit-learn", "XGBoost", "Random Forest", "Pandas", "NumPy", "Matplotlib", "SMOTE", "Google Colab"],
    githubUrl: "https://github.com/MNMashiur/SDN-Intrusion-Detection",
    liveUrl: "",
    features: [
      "Intrusion Detection Pipeline: Built a complete ML workflow for SDN attack classification using the InSDN dataset.",
      "Data Preprocessing: Applied duplicate removal, missing value handling, encoding, outlier detection, and feature scaling for clean training data.",
      "Feature Selection: Used Random Forest feature importance to select the most relevant 48 features for optimized performance.",
      "Class Imbalance Handling: Integrated SMOTE to balance attack classes and improve model generalization.",
      "Multi-Model Training: Trained and evaluated seven machine learning models including XGBoost, Random Forest, and KNN.",
      "Performance Evaluation: Compared models using Accuracy, Precision, Recall, F1-score, ROC-AUC, and Cohen’s Kappa.",
      "Cross Validation: Used 5-fold cross-validation for robustness and model stability analysis.",
      "Attack Classification: Successfully detected SDN-specific attacks like DoS, DDoS, Probe, Botnet, Web-Attack, and U2R."
    ],
    challenges: [
      "Handling highly imbalanced network traffic data while maintaining model generalization and avoiding overfitting in high-dimensional feature space."
    ],
    learnings: [
      "Gained practical experience in cybersecurity-focused machine learning, feature engineering, class balancing techniques, model comparison, and intrusion detection in modern SDN architectures."
    ],
    architecture: "The project follows a structured machine learning pipeline: data collection from the InSDN dataset, preprocessing, feature selection using Random Forest, train-test splitting, SMOTE balancing, model training, cross-validation, and performance evaluation. Ensemble methods and boosting-based models were used to improve intrusion detection accuracy and robustness.",
    image: "/projects/sdn.png",
    screenshots: [
      "/projects/sdn1.png",
      "/projects/sdn2.png",
      "/projects/sdn3.png"
    ]
  },

  {
    id: "project5",
    title: "Overseas Education Consultancy",
    category: "Full Stack, Group Project",
    description: "A full-stack education consultancy management platform designed to streamline student applications, university selection, visa processing, and consultation services for studying abroad.",
    longDescription: "Overseas Education Consultancy is a collaborative full-stack web application developed as a group project to simplify the overseas admission process for students. The platform provides student registration, university browsing, course booking, visa application tracking, consultation services, employee support, and administrative management through role-based access. It centralizes the entire student consultancy workflow into a single digital platform.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT", "REST API"],
    githubUrl: "https://github.com/abarman079/education_consultancy",
    liveUrl: "https://tiny-jelly-82b0da.netlify.app/",
    features: [
      "Student Registration & Authentication: Secure sign up, login, and account management for students.",
      "University Selection System: Browse and apply to universities and courses abroad.",
      "Visa Application Tracking: Submit and monitor visa processing progress digitally.",
      "Flight Ticket Booking: Integrated booking system for student travel planning.",
      "Consultation Services: Students can communicate with consultants for guidance and support.",
      "Role-Based Access Control: Separate dashboards for students, employees, and administrators.",
      "Admin Dashboard: Manage student records, application progress, and consultancy performance.",
      "Live Support System: Includes chat, email, and helpline features for assistance."
    ],
    challenges: [
      "Coordinating multiple user roles and designing an end-to-end workflow that covers student onboarding, university applications, consultation, and visa management."
    ],
    learnings: [
      "Improved teamwork and collaboration skills while gaining practical experience in building scalable full-stack systems with role-based authentication and real-world business logic."
    ],
    architecture: "The frontend is built with React and Tailwind CSS for responsive UI and user interaction. The backend uses Node.js and Express to handle authentication, application workflows, and communication services. MongoDB stores user profiles, applications, bookings, and consultancy records, while JWT is used for secure session management.",
    image: "/projects/consult.png",
    screenshots: [
      "/projects/consult1.png",
      "/projects/consult2.png",
      "/projects/consult3.png",
      "/projects/consult4.png",
      "/projects/consult5.png"
    ]
  },

  {
    id: "project6",
    title: "Smart To-Do List Manager",
    category: "Algorithms, C++",
    description: "A console-based task management system built with C++ that applies core algorithms like KMP, Greedy, and Topological Sorting to optimize task organization, searching, and time allocation.",
    longDescription: "Smart To-Do List Manager is an algorithm-driven task management application developed in C++. It allows users to add, update, delete, display, sort, and search tasks while storing them persistently in text files. The project integrates practical algorithmic concepts such as KMP string matching for fast task search, Greedy algorithm for time allocation, and Topological Sorting for priority-based task arrangement.",
    tags: ["C++", "Algorithms", "KMP", "Greedy", "Topological Sort", "File Handling", "Data Structures"],
    githubUrl: "YOUR_GITHUB_LINK",
    liveUrl: "",
    features: [
      "Task Management: Add, update, delete, and display tasks with unique IDs, priorities, and durations.",
      "Priority Sorting: Sort tasks based on priority and duration using a topological-style sorting approach.",
      "Task Search: Implemented KMP string matching for efficient task name searching.",
      "Time Allocation: Used a Greedy algorithm to allocate tasks within available time constraints.",
      "File Persistence: Stores tasks in a text file for saving and loading task data.",
      "Console-Based UI: Simple menu-driven interface for smooth user interaction.",
      "Complexity Optimization: Efficient sorting (O(n log n)) and searching (O(n+m))."
    ],
    challenges: [
      "Designing an efficient task management system while integrating multiple algorithms into one practical application and maintaining optimized time complexity."
    ],
    learnings: [
      "Strengthened understanding of real-world algorithm implementation, file handling, data structures, and optimization techniques in C++."
    ],
    architecture: "The system uses a static array-based structure for storing tasks, file handling for persistence, KMP for fast substring matching, Greedy for time allocation, and sorting algorithms for task prioritization. The program follows a modular approach where each feature is handled by dedicated functions.",
    image: "/projects/todo.png",
  },

  {
    id: "project7",
    title: "Restaurant Management System",
    category: "Java, Socket Programming",
    description: "A client-server based restaurant management system built with Java socket programming that simulates real-time order handling, menu management, and customer-service communication.",
    longDescription: "Restaurant Management System is a network-based application developed using Java Socket Programming to manage restaurant operations efficiently. It enables communication between clients and servers for order placement, menu browsing, billing, and order status updates. The system demonstrates real-world implementation of networking concepts, multi-client communication, and backend process management.",
    tags: ["Java", "Socket Programming", "Networking", "OOP", "Client-Server", "Multithreading"],
    githubUrl: "https://github.com/MNMashiur/Restaurant-Management-System",
    liveUrl: "",
    features: [
      "Connect two computer (client and server) using Java sockets for real-time communication when they are on the same network.",
      "Client-Server Architecture: Built a socket-based communication system between customers and restaurant server.",
      "Order Management: Customers can place, modify, and cancel orders dynamically.",
      "Menu System: Displays available food items with pricing and categories.",
      "Billing System: Automatically calculates total bills based on ordered items.",
      "Real-Time Communication: Supports instant order updates between client and server.",
      "Multi-User Handling: Designed to manage multiple client requests simultaneously.",
      "Efficient Data Flow: Uses object-oriented design for clean and scalable restaurant operations."
    ],
    challenges: [
      "Handling real-time socket communication, managing multiple client requests, and synchronizing order processing without conflicts."
    ],
    learnings: [
      "Gained practical experience in Java networking, socket programming, multithreading, client-server architecture, and real-time data communication."
    ],
    architecture: "The system follows a client-server architecture where the server manages menu data, orders, and billing logic while multiple clients connect through Java sockets to interact with the system. Multithreading is used to support concurrent client communication.",
    image: "/projects/socket.png",
    screenshots: [
      "/projects/socket1.png",
      "/projects/socket2.png"
    ]
  },

  {
    id: "project8",
    title: "Cryptocurrency Management System",
    category: "Database, Oracle APEX",
    description: "A full-featured cryptocurrency management web application built using Oracle APEX and Oracle SQL for managing wallets, transactions, currency exchange rates, and user portfolios in a secure and interactive environment.",
    longDescription: "Cryptocurrency Management System is a database-driven web application developed in Oracle APEX using Oracle SQL. The system allows users to manage cryptocurrency wallets, perform transfers, place orders, track live currency rates, and monitor transaction history. It focuses on efficient relational database design, advanced SQL queries, views, and interactive dashboards for portfolio tracking and financial management.",
    tags: ["Oracle SQL", "Oracle APEX", "PL/SQL", "Database Design", "Views", "Triggers", "Stored Procedures"],
    githubUrl: "https://github.com/MNMashiur/Cryptocurrency-Management-System",
    liveUrl: "https://apex.oracle.com/pls/apex/r/mohammadadnan/crypto-management-system/login",
    features: [
      "User Authentication: Secure login system with role-based access for customers and admins.",
      "Wallet Management: Create and manage multiple cryptocurrency wallets for different users.",
      "Order System: Place buy/sell orders and track order statuses in real-time.",
      "Currency Conversion: View crypto conversion rates into USD, BDT, and EUR using dynamic SQL views.",
      "Transaction Tracking: Monitor transfers and transaction histories with detailed records.",
      "Portfolio Dashboard: Display total user balances, holdings, and transaction summaries.",
      "Advanced Database Views: Implemented complex SQL views for trade history, wallet summaries, customer activities, and market trends.",
      "Relational Database Design: Structured normalized schema with multiple linked tables for scalability and consistency."
    ],
    challenges: [
      "Designing complex relational schemas, creating efficient SQL views for multi-currency conversions, and maintaining transactional consistency across wallets and orders."
    ],
    learnings: [
      "Developed strong practical skills in Oracle SQL, PL/SQL, APEX application development, schema normalization, advanced joins, views, triggers, and financial data management."
    ],
    architecture: "The system is built on Oracle APEX as the frontend interface with Oracle SQL/PLSQL as the backend. It uses a normalized relational schema consisting of CUSTOMER, CRYPTO, WALLET, ORDER_INFORMATION, RATE_OF_CURRENCY, and TRANSFER tables. Views and stored procedures are used for reporting, balance calculations, and transaction management.",
    image: "/projects/crypto.png",
    screenshots: [
      "/projects/crypto3.png",
      "/projects/crypto2.png",
      "/projects/crypto1.png"
    ]
  }


];
