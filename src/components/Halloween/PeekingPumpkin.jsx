import { useState } from "react";
import "./halloween.css";

const PeekingPumpkin = () => {
  const [showSpeech, setShowSpeech] = useState(true);
  const [bounce, setBounce] = useState(false);

  const handlePumpkinClick = () => {
    setBounce(true);
    setShowSpeech(true);
    setTimeout(() => setBounce(false), 800);
  };

  return (
    <div className="peeking-pumpkin-wrapper" aria-label="Halloween Jack-o'-lantern Greeting">
      {/* Speech Bubble Greeting */}
      {showSpeech ? (
        <div className="pumpkin-speech-bubble" role="status">
          <div className="pumpkin-speech-header">
            <h5 className="pumpkin-speech-title">
              <span>🎃</span> Happy Halloween!
            </h5>
            <button
              type="button"
              className="pumpkin-close-btn"
              onClick={() => setShowSpeech(false)}
              title="Close greeting"
              aria-label="Close Halloween greeting"
            >
              ✕
            </button>
          </div>
          <p className="pumpkin-speech-text">
            Spooky and safe greetings from <strong>Zamboanga City Medical Center</strong>! Wishing everyone a fun & healthy season! 👻
          </p>
        </div>
      ) : (
        <button
          type="button"
          className="pumpkin-minimized-pill"
          onClick={() => setShowSpeech(true)}
          title="Open Halloween greeting"
          aria-label="Open Halloween greeting"
        >
          <span>🎃</span> Spooky ZCMC
        </button>
      )}

      {/* Jack-o'-lantern Character (Vector SVG) */}
      <button
        type="button"
        className={`pumpkin-character-btn ${bounce ? "pumpkin-bounce" : ""}`}
        onClick={handlePumpkinClick}
        title="Happy Halloween! (Click to interact)"
        aria-label="Jack-o'-lantern smiling"
      >
        <svg
          className="pumpkin-svg"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stem & Vine */}
          <path
            d="M 48 24 C 47 14, 55 10, 60 12 C 58 17, 54 20, 52 24 Z"
            fill="#15803d"
          />
          <ellipse cx="58" cy="21" rx="5" ry="2.5" fill="#22c55e" transform="rotate(22 58 21)" />

          {/* Outer Pumpkin Lobes */}
          <ellipse cx="28" cy="58" rx="18" ry="24" fill="#c2410c" />
          <ellipse cx="72" cy="58" rx="18" ry="24" fill="#c2410c" />

          {/* Middle Pumpkin Lobes */}
          <ellipse cx="36" cy="57" rx="19" ry="26" fill="#ea580c" />
          <ellipse cx="64" cy="57" rx="19" ry="26" fill="#ea580c" />

          {/* Center Pumpkin Lobe */}
          <ellipse cx="50" cy="56" rx="20" ry="27" fill="#f97316" />

          {/* Pumpkin Top Shadow */}
          <ellipse cx="50" cy="32" rx="10" ry="3" fill="#9a3412" opacity="0.4" />

          {/* Carved Glowing Eyes */}
          <polygon
            points="33,48 43,48 38,39"
            fill="#fef08a"
            stroke="#f59e0b"
            strokeWidth="0.8"
          />
          <polygon
            points="57,48 67,48 62,39"
            fill="#fef08a"
            stroke="#f59e0b"
            strokeWidth="0.8"
          />

          {/* Eye glow centers */}
          <polygon points="35,46 41,46 38,41" fill="#ffffff" />
          <polygon points="59,46 65,46 62,41" fill="#ffffff" />

          {/* Carved Glowing Nose */}
          <polygon
            points="46,55 54,55 50,49"
            fill="#fef08a"
            stroke="#f59e0b"
            strokeWidth="0.6"
          />

          {/* Carved Glowing Toothy Smile */}
          <path
            d="M 30 63 Q 50 82 70 63 Q 64 71 60 65 Q 56 73 50 65 Q 44 73 40 65 Q 36 71 30 63 Z"
            fill="#fef08a"
            stroke="#f59e0b"
            strokeWidth="0.8"
          />
          {/* Inner warm glow on mouth */}
          <path
            d="M 34 64 Q 50 78 66 64 Q 61 70 58 66 Q 54 72 50 66 Q 46 72 42 66 Q 39 70 34 64 Z"
            fill="#ffffff"
            opacity="0.85"
          />
        </svg>
      </button>
    </div>
  );
};

export default PeekingPumpkin;
