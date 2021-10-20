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

import useGeolocation from '../../hooks/useGeolocation';

import positionMarkerHeading from '../../assets/positionMarkerHeading.png';
import positionMarker from '../../assets/positionMarker.png';

import 'leaflet/dist/leaflet.css';
import './map.less';

export enum PositionType {
  'latest',
  'lastKnown',
}

export interface Position {
  position: GeolocationPosition;
  type: PositionType;
}

interface TrackPolylineProps {
  track?: GeolocationPosition[];
}

interface PositionMarkerProps {
  position: Position | null;
}

interface MapViewUpdaterProps {
  position: Position | null;
  followPosition: boolean;
  panToPosition: boolean;
}

interface MapAutoResizerProps {
  height: number;
}

export interface MapProps {
  height: number;
  position: Position | null;
  followPosition: boolean;
  panToPosition: boolean;
  track?: GeolocationPosition[];
}

const Map: React.FC<MapProps> = ({
  height,
  position,
  followPosition,
  panToPosition,
  track,
}) => {
  const { defaultPosition } = useGeolocation();

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
    <Polyline
      positions={track.map((position) => [
        position.coords.latitude,
        position.coords.longitude,
      ])}
      pathOptions={{ color: 'purple' }}
    />
  );
};

const PositionMarker: React.FC<PositionMarkerProps> = ({ position }) => {
  if (!position) {
    return null;
  }
  const iconSize: { width: number; height: number } = {
    width: 24,
    height: 24,
  };

  const { coords } = position.position;
  const { heading } = position.position.coords;

  const icon = L.divIcon({
    iconSize: [iconSize.width, iconSize.height],
    className: 'current-position-marker',
    html: heading
      ? `<img
    style="transform: rotate(${heading}deg);";
    width="${iconSize.width}"
    height="${iconSize.height}"
    src=${positionMarkerHeading}>`
      : `<img
    width="${iconSize.width}"
    height="${iconSize.height}"
    src=${positionMarker}>`,
  });

  return <Marker position={[coords.latitude, coords.longitude]} icon={icon} />;
};

const MapViewUpdater: React.FC<MapViewUpdaterProps> = ({
  position,
  followPosition,
  panToPosition,
}) => {
  const map = useMap();

  const panMap = (position: Position): void => {
    const { latitude, longitude } = position.position.coords;
    map.panTo([latitude, longitude]);
  };

  useEffect(() => {
    if (!position || !followPosition) {
      return;
    }

    panMap(position);
  }, [position, followPosition]);

  useEffect(() => {
    if (!position || !panToPosition) {
      return;
    }

    panMap(position);
  }, [position, panToPosition]);

  return null;
};

const MapAutoResizer: React.FC<MapAutoResizerProps> = ({ height }) => {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
  }, [height]);

  return null;
};

// interface MapViewControlProps {
//   clickCallback: () => void;
// }

// const createMapViewControl = (props: L.ControlOptions & MapViewControlProps) =>
//   new (L.Control.extend({
//     onAdd: function (map: L.Map) {
//       const container = L.DomUtil.create('div', 'leaflet-touch leaflet-bar');
//       const a = L.DomUtil.create('a');
//       const img = L.DomUtil.create('img');
//       img.src = positionMarkerHeading;
//       img.alt = 'Icon of position marker';
//       img.width = 20;
//       img.height = 20;

//       a.onclick = props.clickCallback;
//       // a.onclick = (ev) => {
//       //   ev.preventDefault();
//       //   ev.stopPropagation();
//       //   map.locate({
//       //     watch: true,
//       //     setView: false,
//       //     maxZoom: 12,
//       //   });
//       //   console.log('click locate');

//       //   a.style.background = 'lightgreen';
//       // };
//       a.style.background = 'lightgreen';
//       a.href = '#';
//       a.type = 'button';
//       a.title = 'Toggle Map View';
//       a.ariaLabel = 'Toggle Map View';
//       a.setAttribute('role', 'button');
//       a.appendChild(img);

//       container.appendChild(a);

//       map.on('dragstart', () => {
//         map.stopLocate();
//         console.log('drag stop locate');
//         a.style.background = 'lightgrey';
//       });

//       return container;
//     },

//     onRemove: function (map: L.Map) {},
//   }))();

// const MapViewControl = createControlComponent(createMapViewControl);

export default Map;
