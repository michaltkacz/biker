import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
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

import 'leaflet/dist/leaflet.css';
import './map.less';
import { Track } from '../../database/schema';

export type GeoPoint = {
  lat: number;
  lon: number;
};

type TrackPolylineProps = {
  track?: Track;
};

type PositionMarkerProps = {
  position: GeoPoint | null;
};

type MapViewUpdaterProps = {
  position: GeoPoint | null;
  followPosition: boolean;
  panToPosition: boolean;
};

type MapAutoResizerProps = {
  height: number;
};

export type MapProps = {
  height: number;
  position: GeoPoint | null;
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
      <ScaleControl position='topleft' />
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
      {track.segments.map((segment) => (
        <Polyline
          positions={segment.map((point) => [point.lat, point.lon])}
          pathOptions={{ color: 'purple' }}
          key={uuidv4()}
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
const iconSize: number = 20;
const icon = L.divIcon({
  iconSize: [iconSize, iconSize],
  className: 'position-marker',
  html: `<div
     width="${iconSize}"
    height="${iconSize}"
  ></div>`,
});

const PositionMarker: React.FC<PositionMarkerProps> = ({ position }) => {
  if (!position) {
    return null;
  }

  return <Marker position={[position.lat, position.lon]} icon={icon} />;
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

    map.panTo([position.lat, position.lon]);
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
