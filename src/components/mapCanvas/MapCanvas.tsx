import React, { useState } from 'react';

import { MapContainer, TileLayer, useMap, ZoomControl } from 'react-leaflet';

import useGeolocation from '../../hooks/useGeolocation';

import 'leaflet/dist/leaflet.css';
import './mapCanvas.less';

interface CenterMapProps {
  center: GeolocationPosition;
  zoom: number;
}

const MapCanvas: React.FC = () => {
  const [zoom] = useState<number>(10);
  const { lastPosition, defaultPosition } = useGeolocation();

  return (
    <MapContainer
      // className='map-canvas'
      zoom={zoom}
      minZoom={1}
      maxZoom={15}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <ZoomControl position='topright' />
      <CenterMap center={lastPosition || defaultPosition} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
    </MapContainer>
  );
};

const CenterMap: React.FC<CenterMapProps> = ({ center, zoom }) => {
  const map = useMap();
  map.setView([center.coords.latitude, center.coords.longitude], zoom);
  return null;
};

export default MapCanvas;
