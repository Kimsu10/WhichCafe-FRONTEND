import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const MapContainer = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  const mapStyles = {
    width: '100%',
    height: '400px',
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        error => {
          console.error('Error getting user location:', error);
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  if (loadError) return <div>위치 권한 동의 안할 시 이미지 띄우기</div>;

  return (
    isLoaded && (
      <GoogleMap mapContainerStyle={mapStyles} center={center} zoom={15}>
        <Marker position={center} />
      </GoogleMap>
    )
  );
};

export default MapContainer;
