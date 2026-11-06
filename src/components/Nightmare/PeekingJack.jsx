import { useState } from "react";
import "./nightmare.css";

const PeekingJack = () => {
  const [showSpeech, setShowSpeech] = useState(true);
  const [bounce, setBounce] = useState(false);

  const handleJackClick = () => {
    setBounce(true);
    setShowSpeech(true);
    setTimeout(() => setBounce(false), 800);
  };

  return (
    <div className="peeking-jack-wrapper" aria-label="Jack Skellington Greeting">
      {/* Speech Bubble Greeting */}
      {showSpeech ? (
        <div className="jack-speech-bubble" role="status">
          <div className="jack-speech-header">
            <h5 className="jack-speech-title">
              <span>💀</span> What&apos;s this? What&apos;s this?!
            </h5>
            <button
              type="button"
              className="jack-close-btn"
              onClick={() => setShowSpeech(false)}
              title="Close greeting"
              aria-label="Close Jack Skellington greeting"
            >
              ✕
            </button>
          </div>
          <p className="jack-speech-text">
            Delightfully spooky &amp; festive greetings from <strong>Zamboanga City Medical Center</strong>! May your holiday be filled with health, wonder &amp; joy! 🎄
          </p>
        </div>
      ) : (
        <button
          type="button"
          className="jack-minimized-pill"
          onClick={() => setShowSpeech(true)}
          title="Open Jack Skellington greeting"
          aria-label="Open Jack Skellington greeting"
        >
          <span>💀</span> What&apos;s This?! 🎄
        </button>
      )}

      {/* Jack Skellington SVG Character */}
      <button
        type="button"
        className={`jack-character-btn ${bounce ? "jack-bounce" : ""}`}
        onClick={handleJackClick}
        title="Sandy Claws Jack! (Click to interact)"
        aria-label="Jack Skellington in Sandy Claws hat"
      >
        <svg
          className="jack-svg"
          viewBox="0 0 100 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sandy Claws Red Santa Hat Body */}
          <path
            d="M 22 42 C 20 18, 52 8, 70 14 C 80 18, 86 28, 92 34 C 95 37, 96 44, 91 48 C 84 43, 80 34, 72 32 C 58 30, 32 34, 22 42 Z"
            fill="#dc2626"
          />
          {/* Hat Pom-pom */}
          <circle cx="92" cy="46" r="6" fill="#f8fafc" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))" />

          {/* Jack's Round Bone-White Skull */}
          <circle cx="50" cy="54" r="26" fill="#f8fafc" />
          {/* Subtle Skull Shading */}
          <circle cx="50" cy="54" r="26" fill="#cbd5e1" opacity="0.25" />

          {/* White Fur Brim of Santa Hat */}
          <rect
            x="22"
            y="35"
            width="56"
            height="11"
            rx="5.5"
            fill="#ffffff"
            filter="drop-shadow(0 2px 3px rgba(0,0,0,0.25))"
          />

          {/* Large Expressive Hollow Eyes */}
          {/* Left Eye */}
          <ellipse cx="40" cy="52" rx="6.5" ry="8.5" fill="#09090b" transform="rotate(-6 40 52)" />
          {/* Right Eye */}
          <ellipse cx="60" cy="52" rx="6.5" ry="8.5" fill="#09090b" transform="rotate(6 60 52)" />

          {/* Slit Nostrils */}
          <line x1="48.5" y1="58" x2="48" y2="61.5" stroke="#09090b" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="51.5" y1="58" x2="52" y2="61.5" stroke="#09090b" strokeWidth="1.6" strokeLinecap="round" />

          {/* Iconic Stitched Grin */}
          <path
            d="M 30 67 Q 50 78 70 67"
            stroke="#09090b"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Cross Stitches */}
          <line x1="34" y1="65" x2="33" y2="70" stroke="#09090b" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="39" y1="67" x2="38" y2="72" stroke="#09090b" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="44" y1="69" x2="44" y2="74" stroke="#09090b" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="50" y1="70" x2="50" y2="75" stroke="#09090b" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="56" y1="69" x2="56" y2="74" stroke="#09090b" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="61" y1="67" x2="62" y2="72" stroke="#09090b" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="66" y1="65" x2="67" y2="70" stroke="#09090b" strokeWidth="1.8" strokeLinecap="round" />

          {/* Jack's Iconic Bat Bowtie */}
          {/* Bat Head Center */}
          <circle cx="50" cy="82" r="3.5" fill="#18181b" />
          {/* Bat Ears */}
          <polygon points="48,79 47,75 50,78" fill="#18181b" />
          <polygon points="52,79 53,75 50,78" fill="#18181b" />
          {/* Left Wing */}
          <path
            d="M 47 82 Q 35 77 22 81 Q 30 87 38 85 Q 44 89 47 84 Z"
            fill="#18181b"
          />
          {/* Right Wing */}
          <path
            d="M 53 82 Q 65 77 78 81 Q 70 87 62 85 Q 56 89 53 84 Z"
            fill="#18181b"
          />
        </svg>
      </button>
    </div>
  );
};

export default PeekingJack;
