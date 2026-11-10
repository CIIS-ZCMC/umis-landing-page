import { useMemo } from "react";
import "./christmas.css";

const BULB_COLORS = ["red", "gold", "green", "blue", "cyan", "pink"];

const ChristmasLights = () => {
  // Generate 28 bulbs along the top wire (on mobile, only 12 are displayed via CSS for GPU efficiency)
  const bulbs = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      color: BULB_COLORS[i % BULB_COLORS.length],
      mobileHidden: i >= 12,
    }));
  }, []);

  return (
    <div className="christmas-lights-container" aria-hidden="true">
      <div className="christmas-lights-wire" />
      {bulbs.map((bulb) => (
        <div
          key={bulb.id}
          className={`christmas-bulb-unit ${bulb.mobileHidden ? "desktop-only-bulb" : ""}`}
        >
          <div className="christmas-bulb-socket" />
          <div className={`christmas-bulb ${bulb.color}`} />
        </div>
      ))}
    </div>
  );
};

export default ChristmasLights;
