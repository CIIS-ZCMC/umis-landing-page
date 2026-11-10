import { useState } from "react";
import "./christmas.css";

const PeekingSanta = () => {
  // On mobile phones, start with speech bubble collapsed so it doesn't clutter the native app view
  const [showSpeech, setShowSpeech] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth > 768 : true
  );
  const [bounce, setBounce] = useState(false);

  const handleSantaClick = () => {
    setBounce(true);
    setShowSpeech((prev) => !prev);
    setTimeout(() => setBounce(false), 800);
  };

  return (
    <div className="peeking-santa-wrapper" aria-label="Festive Santa Claus Greeting">
      {/* Speech Bubble Greeting */}
      {showSpeech && (
        <div className="santa-speech-bubble" role="status">
          <div className="santa-speech-header">
            <h5 className="santa-speech-title">
              <span>🎅</span> Maligayang Pasko!
            </h5>
            <button
              type="button"
              className="santa-close-btn"
              onClick={() => setShowSpeech(false)}
              title="Close greeting"
              aria-label="Close Santa greeting"
            >
              ✕
            </button>
          </div>
          <p className="santa-speech-text">
            Warmest holiday wishes from <strong>Zamboanga City Medical Center</strong>! May your season be filled with joy and health. ✨
          </p>
        </div>
      )}

      {/* Santa Peeking Character (Vector SVG) */}
      <button
        type="button"
        className={`santa-character-btn ${bounce ? "santa-bounce" : ""}`}
        onClick={handleSantaClick}
        title="Merry Christmas! (Tap to toggle greeting)"
        aria-label="Santa Claus waving"
      >
        <svg
          className="santa-svg"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Peeking Hands / Mittens */}
          <ellipse cx="22" cy="74" rx="10" ry="8" fill="#b91c1c" />
          <ellipse cx="22" cy="74" rx="10" ry="4" fill="#ffffff" />
          <ellipse cx="78" cy="74" rx="10" ry="8" fill="#b91c1c" />
          <ellipse cx="78" cy="74" rx="10" ry="4" fill="#ffffff" />

          {/* Santa Face Base */}
          <circle cx="50" cy="50" r="26" fill="#fed7aa" />

          {/* Rosy Cheeks */}
          <circle cx="38" cy="52" r="5" fill="#fca5a5" opacity="0.8" />
          <circle cx="62" cy="52" r="5" fill="#fca5a5" opacity="0.8" />

          {/* Cheerful Eyes */}
          <ellipse cx="42" cy="45" rx="2.5" ry="3.5" fill="#1f2937" />
          <circle cx="43" cy="44" r="1" fill="#ffffff" />
          <ellipse cx="58" cy="45" rx="2.5" ry="3.5" fill="#1f2937" />
          <circle cx="59" cy="44" r="1" fill="#ffffff" />

          {/* Cute Button Nose */}
          <ellipse cx="50" cy="50" rx="4" ry="3" fill="#f87171" />

          {/* Big Fluffy Beard */}
          <path
            d="M 28 50 C 24 64, 30 84, 50 88 C 70 84, 76 64, 72 50 C 66 58, 58 60, 50 56 C 42 60, 34 58, 28 50 Z"
            fill="#ffffff"
          />

          {/* Mustache */}
          <path
            d="M 50 52 C 45 48, 36 50, 34 54 C 42 58, 48 54, 50 52 Z"
            fill="#f3f4f6"
          />
          <path
            d="M 50 52 C 55 48, 64 50, 66 54 C 58 58, 52 54, 50 52 Z"
            fill="#f3f4f6"
          />

          {/* Red Santa Hat */}
          <path
            d="M 26 38 C 26 20, 56 12, 68 18 C 76 22, 78 30, 84 32 C 86 34, 88 40, 84 44 C 76 40, 72 32, 66 32 C 54 32, 34 34, 26 38 Z"
            fill="#dc2626"
          />

          {/* White Fluffy Hat Trim */}
          <rect
            x="24"
            y="32"
            width="52"
            height="11"
            rx="5.5"
            fill="#ffffff"
          />

          {/* Hat Pom-pom */}
          <circle cx="86" cy="42" r="6" fill="#ffffff" />
        </svg>
      </button>
    </div>
  );
};

export default PeekingSanta;
