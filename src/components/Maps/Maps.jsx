import React, { useRef, useState, useEffect } from 'react';

const Maps = () => {
  const mapsDiv = useRef(null);
  const [scale, setScale] = useState(1); // Track the current scale state

  // Handle zoom functionality via mouse wheel
  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault(); // Prevent the default scroll behavior

      if (mapsDiv.current) {
        setScale(prevScale => {
          const newScale = event.deltaY < 0 ? prevScale * 1.1 : prevScale * 0.9;
          return Math.min(Math.max(newScale, 0.5), 3); // Optional: Limit scale to a reasonable range
        });
      }
    };

    // Add event listener to the maps div
    const divElement = mapsDiv.current;
    divElement.addEventListener('wheel', handleWheel);

    // Cleanup on component unmount
    return () => {
      divElement.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    
    <div
      className="maps"
      ref={mapsDiv}
      style={{ transform: `scale(${scale})` }} // Apply the scale to the element
    >
      {/* Your content here */}
    </div>
  );
};

export default Maps;
