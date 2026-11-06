import "./nightmare.css";

const BULB_COLORS = ["color-green", "color-purple", "color-orange", "color-ice"];
const BULB_COUNT = 24;

const NightmareGarland = () => {
  return (
    <div className="nightmare-header-overlay" aria-hidden="true">
      {/* Gothic Tim Burton Spiral Curl (Left) */}
      <svg
        className="nightmare-curl-left"
        viewBox="0 0 100 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0 10 Q 40 5 60 25 Q 75 40 68 52 Q 58 58 48 50 Q 42 40 48 30 Q 56 24 64 30"
          stroke="#a855f7"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M 0 2 Q 25 8 45 18"
          stroke="#4ade80"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>

      {/* Gothic Tim Burton Spiral Curl (Right) */}
      <svg
        className="nightmare-curl-right"
        viewBox="0 0 100 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0 10 Q 40 5 60 25 Q 75 40 68 52 Q 58 58 48 50 Q 42 40 48 30 Q 56 24 64 30"
          stroke="#4ade80"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M 0 2 Q 25 8 45 18"
          stroke="#a855f7"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>

      {/* Garland Wire with Alternating Eerie Bulbs */}
      <div className="nightmare-lights-wire">
        {Array.from({ length: BULB_COUNT }).map((_, index) => {
          const colorClass = BULB_COLORS[index % BULB_COLORS.length];
          return (
            <div key={index} className="nightmare-bulb-unit">
              <div className="nightmare-bulb-socket" />
              <div
                className={`nightmare-bulb ${colorClass}`}
                style={{
                  animationDelay: `${(index % 4) * 0.45}s`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NightmareGarland;
