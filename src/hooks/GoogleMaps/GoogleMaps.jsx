import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const MapContainer = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const center = { lat: 38, lng: 127 };

  const mapStyles = {
    width: '100%',
    height: '400px',
  };

  if (loadError) return <div>위치 권한 동의 안할시 이미지 띄우기</div>;

  return (
    isLoaded && (
      <GoogleMap mapContainerStyle={mapStyles} center={center} zoom={10}>
        <Marker position={center} />
      </GoogleMap>
    )
  );
};

export default MapContainer;
