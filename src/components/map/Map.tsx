import React, { useEffect } from 'react';
import L from 'leaflet';

import {
  LayersControl,
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  ZoomControl,
  ScaleControl,
  Polyline,
} from 'react-leaflet';

import { defaultPosition } from '../../hooks/useGeolocation';

import positionMarker from '../../assets/map/position1.png';

import 'leaflet/dist/leaflet.css';
import './map.less';
import { Track } from '../../database/schema';

type TrackPolylineProps = {
  track?: Track;
};

type PositionMarkerProps = {
  position: GeolocationPosition | null;
};

type MapViewUpdaterProps = {
  position: GeolocationPosition | null;
  followPosition: boolean;
  panToPosition: boolean;
};

type MapAutoResizerProps = {
  height: number;
};

export type MapProps = {
  height: number;
  position: GeolocationPosition | null;
  followPosition: boolean;
  panToPosition: boolean;
  track?: Track;
};

const Map: React.FC<MapProps> = ({
  height,
  position,
  followPosition,
  panToPosition,
  track,
}) => {
  return (
    <MapContainer
      zoom={12}
      minZoom={2}
      maxZoom={18}
      center={[
        defaultPosition.coords.latitude,
        defaultPosition.coords.longitude,
      ]}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TrackPolyline track={track} />
      <PositionMarker position={position} />
      <MapAutoResizer height={height} />
      <MapViewUpdater
        position={position}
        followPosition={followPosition}
        panToPosition={panToPosition}
      />
      <ZoomControl position='bottomright' />
      <ScaleControl position='bottomleft' />
      <LayersControl position='topright'>
        <LayersControl.BaseLayer checked name='OpenStreetMap.Mapnik'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name='OpenStreetMap.BlackAndWhite'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>
      </LayersControl>
    </MapContainer>
  );
};

const TrackPolyline: React.FC<TrackPolylineProps> = ({ track }) => {
  if (!track) {
    return null;
  }

  return (
    <>
      {track.map((segment, index) => (
        <Polyline
          positions={segment.map((point) => [point.lat, point.lon])}
          pathOptions={{ color: 'purple' }}
          key={`track-polyline-${index}`}
        />
      ))}
    </>
  );
};

// const makeIcon = (
//   width: number,
//   height: number,
//   heading: number | null
// ): L.DivIcon => {
//   return L.divIcon({
//     iconSize: [width, height],
//     className: 'current-position-marker',
//     html: heading
//       ? `<img
//     style="transform: rotate(calc(${heading}deg - 180deg));";
//     width="${width}"
//     height="${height}"
//     src=${positionMarkerHeading}>`
//       : `<img
//     width="${width}"
//     height="${height}"
//     src=${positionMarker}>`,
//   });
// };
const iconSize: number = 24;
const icon = L.divIcon({
  iconSize: [iconSize, iconSize],
  className: 'current-position-marker',
  html: `<img
    width="${iconSize}"
    height="${iconSize}"
    src=${positionMarker}>`,
});

const PositionMarker: React.FC<PositionMarkerProps> = ({ position }) => {
  if (!position) {
    return null;
  }

  return (
    <Marker
      position={[position.coords.latitude, position.coords.longitude]}
      icon={icon}
    />
  );
};

const MapViewUpdater: React.FC<MapViewUpdaterProps> = ({
  position,
  followPosition,
  panToPosition,
}) => {
  const map = useMap();

  useEffect(() => {
    if (!position || (!followPosition && !panToPosition)) {
      return;
    }

    const { latitude, longitude } = position.coords;
    map.panTo([latitude, longitude]);
  }, [map, position, followPosition, panToPosition]);

  return null;
};

const MapAutoResizer: React.FC<MapAutoResizerProps> = ({ height }) => {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
  }, [map, height]);

  return null;
};

export default Map;
