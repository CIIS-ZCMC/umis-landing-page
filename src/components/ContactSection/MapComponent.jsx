import React from 'react';

const MapComponent = () => {
  return (
    <div className="map-container">
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/68447a06231c2b75c8ea9ebfd3f507aa71982cc09edf9ecd1932be0a2432f9bc?placeholderIfAbsent=true&apiKey=052a318ec63b49ddbf4f2834ebe7790b" alt="Map of Zamboanga City Medical Center location" className="map-image" />
      <div className="map-controls">
        <div className="map-type-selector">
          <button className="map-type-button active">Map</button>
          <div className="map-type-divider"></div>
          <button className="map-type-button">Satellite</button>
        </div>
        <div className="map-navigation">
          <button className="map-nav-button zoom-in" aria-label="Zoom in">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/247989f63766d92fd32a24dd3f10545058b6edc3ed514b16bc5f02e8ac970d74?placeholderIfAbsent=true&apiKey=052a318ec63b49ddbf4f2834ebe7790b" alt="" />
          </button>
          <button className="map-nav-button zoom-out" aria-label="Zoom out">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/d2fcd5430d806e7d811305e574df0a53c2f885e7ed77250175b18de7152c49e6?placeholderIfAbsent=true&apiKey=052a318ec63b49ddbf4f2834ebe7790b" alt="" />
          </button>
          <button className="map-nav-button compass" aria-label="Reset map orientation">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/aff812f88a21a6e824b5dd471734c17d473143858ef01b0fb62b7638383b8a65?placeholderIfAbsent=true&apiKey=052a318ec63b49ddbf4f2834ebe7790b" alt="" />
          </button>
        </div>
      </div>
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/68241d3f70ff107381f53c169d136580e7823a5202c51e0b88900594490f3681?placeholderIfAbsent=true&apiKey=052a318ec63b49ddbf4f2834ebe7790b" alt="Map scale" className="map-scale" />
    </div>
  );
};

export default MapComponent;