import "./halloween.css";

const SpiderwebHeader = () => {
  return (
    <div className="halloween-header-overlay" aria-hidden="true">
      {/* Top Left Corner Spiderweb */}
      <svg
        className="halloween-web-left"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 0 0 L 100 0 M 0 0 L 70 70 M 0 0 L 0 100" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
        <path d="M 0 30 Q 30 30 30 0" stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none" />
        <path d="M 0 60 Q 60 60 60 0" stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none" />
        <path d="M 0 90 Q 90 90 90 0" stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none" />
      </svg>

      {/* Top Right Corner Spiderweb */}
      <svg
        className="halloween-web-right"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 0 0 L 100 0 M 0 0 L 70 70 M 0 0 L 0 100" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
        <path d="M 0 30 Q 30 30 30 0" stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none" />
        <path d="M 0 60 Q 60 60 60 0" stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none" />
        <path d="M 0 90 Q 90 90 90 0" stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none" />
      </svg>

      {/* Dangling Spider 1 */}
      <div className="halloween-spider-thread pos-1">
        <div className="halloween-spider-line" />
        <svg
          className="halloween-spider-body"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Spider Legs */}
          <path d="M 7 10 L 2 6 M 7 12 L 1 12 M 7 14 L 2 18" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 17 10 L 22 6 M 17 12 L 23 12 M 17 14 L 22 18" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round" />
          {/* Spider Body */}
          <circle cx="12" cy="13" r="5" fill="#18181b" />
          <circle cx="12" cy="7" r="3.5" fill="#27272a" />
          {/* Eyes */}
          <circle cx="10.5" cy="6.5" r="0.8" fill="#f97316" />
          <circle cx="13.5" cy="6.5" r="0.8" fill="#f97316" />
        </svg>
      </div>

      {/* Dangling Spider 2 */}
      <div className="halloween-spider-thread pos-2">
        <div className="halloween-spider-line" />
        <svg
          className="halloween-spider-body"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 7 10 L 2 6 M 7 12 L 1 12 M 7 14 L 2 18" stroke="#a855f7" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 17 10 L 22 6 M 17 12 L 23 12 M 17 14 L 22 18" stroke="#a855f7" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="12" cy="13" r="5" fill="#18181b" />
          <circle cx="12" cy="7" r="3.5" fill="#27272a" />
          <circle cx="10.5" cy="6.5" r="0.8" fill="#a855f7" />
          <circle cx="13.5" cy="6.5" r="0.8" fill="#a855f7" />
        </svg>
      </div>
    </div>
  );
};

export default SpiderwebHeader;
