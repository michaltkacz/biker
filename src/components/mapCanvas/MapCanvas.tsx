import React from 'react';

import { useResizeDetector } from 'react-resize-detector';

import './mapCanvas.less';

type MapCanvasProps = {
  render: (height: number) => React.ReactNode;
};

const MapCanvas: React.FC<MapCanvasProps> = ({ render }) => {
  const { height, ref } = useResizeDetector<HTMLDivElement>();

  return (
    <div className='map-canvas' ref={ref}>
      {height && render(height)}
    </div>
  );
};

export default MapCanvas;
