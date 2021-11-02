import React, { useEffect, useState } from 'react';

import { UploadOutlined } from '@ant-design/icons';

import './fileImporter.less';
import GpxParser from 'gpxparser';
import { Track, TrackPoint, TrackSegment } from '../../database/schema';

const FileImporter = () => {
  const [files, setFiles] = useState<Array<File>>([]);
  const [tracks, setTracks] = useState<Array<Track>>([]);

  const parseGpxToTrack = async (file: File) => {};

  useEffect(() => {
    files.forEach((file) => {
      file.text().then((gpx) => {
        const gpxParser = new GpxParser();
        gpxParser.parse(gpx);

        const newTrack: Track = gpxParser.tracks.map((parsedTrackSegment) => {
          const newTrackSegment: TrackSegment = parsedTrackSegment.points.map(
            (parsedTrackPoint) => {
              const newTrackPoint: TrackPoint = {
                lat: parsedTrackPoint.lat,
                lon: parsedTrackPoint.lon,
                ele: parsedTrackPoint.ele,
                time: parsedTrackPoint.time.getTime(),
              };
              return newTrackPoint;
            }
          );
          return newTrackSegment;
        });

        setTracks([...tracks, newTrack]);
      });
    });
  }, [files]);

  useEffect(() => {
    console.log(tracks);
  }, [tracks]);

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className='file-importer'>
      <label role='button' className='file-import-button ant-btn button'>
        <input
          type='file'
          accept='.gpx'
          multiple
          onChange={handleSelectFiles}
        />
        <UploadOutlined /> Import GPX
      </label>
    </div>
  );
};

export default FileImporter;
