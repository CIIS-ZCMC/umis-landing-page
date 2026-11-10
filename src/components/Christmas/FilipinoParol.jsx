import { useMemo } from "react";
import parolImg from "../../assets/christmas/parol.png";
import "./christmas.css";

const FilipinoParol = () => {
  // Sparkle particle offsets and animation delays
  const sparkles = useMemo(
    () => [
      { id: 1, top: "28%", left: "-14px", delay: "0s", size: "13px" },
      { id: 2, top: "45%", right: "-16px", delay: "1.2s", size: "16px" },
      { id: 3, top: "62%", left: "-12px", delay: "2.4s", size: "11px" },
      { id: 4, top: "78%", right: "-14px", delay: "0.8s", size: "14px" },
      { id: 5, top: "15%", right: "-10px", delay: "1.8s", size: "14px" },
    ],
    []
  );

  return (
    <div
      className="filipino-parol-anchor"
      style={{
        position: "fixed",
        top: 0,
        zIndex: 996,
        pointerEvents: "none",
        maxWidth: "160px",
      }}
      aria-hidden="true"
    >
      {/* Top suspension wire dropping from screen top / ceiling */}
      <div className="filipino-parol-cord" />

      {/* Swinging pendulum assembly */}
      <div className="filipino-parol-swing">
        {/* Ambient warm light halo behind the lantern */}
        <div className="filipino-parol-aura" />

        {/* Traditional Capiz Parol star & tails */}
        <img
          src={parolImg}
          alt="Traditional Filipino Christmas Parol Lantern"
          className="filipino-parol-image"
          width="140"
          decoding="async"
          style={{
            width: "100%",
            maxWidth: "140px",
            height: "auto",
            display: "block",
          }}
        />

        {/* Sparkling golden star motes floating around the Parol */}
        {sparkles.map((s) => (
          <span
            key={s.id}
            className="parol-sparkle"
            style={{
              top: s.top,
              left: s.left,
              right: s.right,
              animationDelay: s.delay,
              fontSize: s.size,
            }}
          >
            ✦
          </span>
        ))}
      </div>
    </div>
  );
};

export default FilipinoParol;
