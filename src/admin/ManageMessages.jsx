import { MailOpen, Trash2, Reply } from 'lucide-react';

export default function ManageMessages({ messages, onDelete, onMarkRead }) {
  const handleReplyClick = (msg) => {
    window.location.href = `mailto:${msg.email}?subject=Re: ${msg.subject}`;
  };

  return (
    <div className="font-sans">
      <div className="border-b border-accent/10 pb-4 mb-6">
        <h3 className="font-outfit text-lg font-bold text-white tracking-tight">Contact Messages</h3>
      </div>

      {messages.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center border border-accent/15 bg-surface/30">
          <p className="text-textSecondary">No messages logged yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`glass-card rounded-2xl p-5 border transition-all ${
                msg.read
                  ? 'border-accent/5 bg-surface/10 opacity-70'
                  : 'border-accent/25 bg-surface/40'
              }`}
            >
              {/* Header info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-accent/5 pb-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="font-outfit text-sm font-bold text-white">{msg.name}</h5>
                    <span className="text-[10px] text-textSecondary">&lt;{msg.email}&gt;</span>
                  </div>
                  <p className="text-xs font-semibold text-accent mt-0.5">{msg.subject}</p>
                </div>

                <div className="text-right">
                  <span className="text-[9px] text-textSecondary font-medium">{msg.date}</span>
                </div>
              </div>

              {/* Message body */}
              <p className="text-xs text-textSecondary leading-relaxed whitespace-pre-wrap">
                {msg.message}
              </p>

              {/* Actions */}
              <div className="mt-4 flex items-center justify-end gap-3 border-t border-accent/5 pt-3">
                {!msg.read && (
                  <button
                    onClick={() => onMarkRead(msg.id)}
                    className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-accent hover:text-white"
                    title="Mark as Read"
                  >
                    <MailOpen className="h-3.5 w-3.5" /> Read
                  </button>
                )}
                
                <button
                  onClick={() => handleReplyClick(msg)}
                  className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-accent hover:text-white"
                  title="Reply via Email"
                >
                  <Reply className="h-3.5 w-3.5" /> Reply
                </button>

                <button
                  onClick={() => onDelete(msg.id)}
                  className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-red-400 hover:text-red-300"
                  title="Delete message"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
