import { saveAs } from 'file-saver';
import { buildGPX, BaseBuilder } from 'gpx-builder';
import { Point } from 'gpx-builder/dist/builder/BaseBuilder/models';
import { Track } from '../database/schema';

export const buildGpx = (track: Track) => {
  const gpxData = new BaseBuilder();

  track.segments.forEach((segment) => {
    const points = segment.map(
      (point) =>
        new Point(point.lat, point.lon, {
          ele: point.ele || undefined,
          time: new Date(point.time),
        })
    );
    gpxData.setSegmentPoints(points);
  });

  return buildGPX(gpxData.toObject());
};

export const buildGpxAndSaveFile = (track: Track, fileName: string) => {
  const gpx = buildGpx(track);
  var blob = new Blob([gpx], {
    type: 'application/gpx+xml;charset=utf-8',
  });
  saveAs(blob, fileName + '.gpx');
};
