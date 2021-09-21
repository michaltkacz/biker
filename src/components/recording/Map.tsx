import React, { useState } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  ZoomControl,
} from 'react-leaflet';

import useGeolocation from './../../hooks/useGeolocation';

const Map: React.FC = () => {
  const [zoom] = useState<number>(10);
  const { currentLocation, defaultLocation } = useGeolocation();

  return (
    <MapContainer
      // zoom={zoom}
      minZoom={1}
      maxZoom={15}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <ZoomControl position='topright' />
      <CenterMap center={currentLocation || defaultLocation} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

const CenterMap: React.FC<{
  center: GeolocationPosition;
  zoom: number;
}> = ({ center, zoom }) => {
  const map = useMap();
  map.setView([center.coords.latitude, center.coords.longitude], zoom);
  return null;
};

export default Map;
