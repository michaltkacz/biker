import React, { useEffect, useState } from 'react';
import { Collapse, Typography } from 'antd';
import { AreaChartOutlined } from '@ant-design/icons';

import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  AreaSeries,
  Crosshair,
  AreaSeriesPoint,
  DiscreteColorLegend,
} from 'react-vis';
import 'react-vis/dist/style.css';

import './activityCharts.less';

import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

import { Track } from '../../database/schema';

import { geoMove } from '../../global/geolocationMath';

export type ActivityChartsProps = {
  track: Track;
};

const ActivityCharts: React.FC<ActivityChartsProps> = ({ track }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [parsing, setParsing] = useState<boolean>(true);

  const [speedData, setSpeedData] = useState<Array<AreaSeriesPoint>>([]);
  const [distanceData, setDistanceData] = useState<Array<AreaSeriesPoint>>([]);
  const [elevationData, setElevationData] = useState<Array<AreaSeriesPoint>>(
    []
  );
  const [maxSpeed, setMaxSpeed] = useState<number>(0);
  const [maxDistance, setMaxDistance] = useState<number>(0);
  const [maxElevation, setMaxElevation] = useState<number>(0);

  const [speedCrosshair, setSpeedCrosshair] = useState<AreaSeriesPoint | null>(
    null
  );
  const [distanceCrosshair, setDistanceCrosshair] =
    useState<AreaSeriesPoint | null>(null);
  const [elevationCrosshair, setElevationCrosshair] =
    useState<AreaSeriesPoint | null>(null);

  const parseData = async () => {
    const flatTrack = track.segments.flat();

    if (flatTrack.length === 0) {
      return;
    }

    let newSpeedData: Array<AreaSeriesPoint> = [];
    let newDistanceData: Array<AreaSeriesPoint> = [];
    let newElevationData: Array<AreaSeriesPoint> = [];

    let newMaxSpeed: number = 0;
    let newMaxDistance: number = 0;
    let newMaxElevation: number = 0;

    let newDistance: number = 0;
    let newSpeed: number = 0;

    flatTrack.forEach((point, index) => {
      const newElevation = Math.round(point.ele || 0);

      if (index !== 0) {
        const prevPoint = flatTrack[index - 1];
        const { distance, speed } = geoMove(
          point.lat,
          point.lon,
          point.time,
          prevPoint.lat,
          prevPoint.lon,
          prevPoint.time
        );

        newDistance += distance / 1000;
        newSpeed = speed * 3.6;
      }

      newMaxSpeed = Math.max(newSpeed, newMaxSpeed);
      newMaxDistance = Math.max(newDistance, newMaxDistance);
      newMaxElevation = Math.max(newElevation, newMaxElevation);

      newDistanceData.push({ x: point.time, y: newDistance });
      newSpeedData.push({ x: point.time, y: newSpeed });
      newElevationData.push({
        x: point.time,
        y: newElevation,
      });
    });

    setDistanceData(newDistanceData);
    setSpeedData(newSpeedData);
    setElevationData(newElevationData);
    setMaxSpeed(newMaxSpeed);
    setMaxDistance(newMaxDistance);
    setMaxElevation(newMaxElevation);
  };

  useEffect(() => {
    if (!expanded) {
      return;
    }

    parseData().then(() => setParsing(false));
  }, [track, expanded]);

  return (
    <Collapse
      className='activity-charts'
      onChange={() => setExpanded(!expanded)}
      destroyInactivePanel
    >
      <Collapse.Panel
        className='activity-charts-header'
        header={
          <Typography.Title className='activity-charts-header-title' level={5}>
            Charts <AreaChartOutlined />
          </Typography.Title>
        }
        key='charts'
      >
        {parsing ? (
          <LoadingSpinner />
        ) : (
          <>
            <FlexibleWidthXYPlot
              height={300}
              xType='time-utc'
              yDomain={[0, maxSpeed * 1.1]}
              onMouseLeave={() => setSpeedCrosshair(null)}
            >
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis
                title='Time'
                tickFormat={(value) => {
                  return new Date(value).toLocaleTimeString().substr(0, 5);
                }}
              />
              <YAxis
                title='Speed [km/h]'
                tickFormat={(value) => {
                  return value;
                }}
              />
              <AreaSeries
                fill='#13c2c299'
                stroke='#13c2c2aa'
                data={speedData}
                onNearestX={(value) => setSpeedCrosshair(value)}
                curve='curveStepBefore'
              />
              {speedCrosshair && (
                <Crosshair values={[speedCrosshair]}>
                  <div className='chart-crosshair'>
                    <div>
                      Time:{' '}
                      {new Date(speedCrosshair.x)
                        .toLocaleTimeString()
                        .substr(0, 5)}
                    </div>
                    <div>Speed: {speedCrosshair.y.toFixed(2)}km/h</div>
                  </div>
                </Crosshair>
              )}
            </FlexibleWidthXYPlot>
            <FlexibleWidthXYPlot
              height={300}
              xType='time-utc'
              yDomain={[0, maxDistance * 1.1]}
              onMouseLeave={() => setDistanceCrosshair(null)}
            >
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis
                title='Time'
                tickFormat={(value) => {
                  return new Date(value).toLocaleTimeString().substr(0, 5);
                }}
              />
              <YAxis
                title='Distance [km]'
                tickFormat={(value) => {
                  return value;
                }}
              />
              <AreaSeries
                fill='#1890ff99'
                stroke='#1890ffaa'
                data={distanceData}
                onNearestX={(value) => setDistanceCrosshair(value)}
              />
              {distanceCrosshair && (
                <Crosshair values={[distanceCrosshair]}>
                  <div className='chart-crosshair'>
                    <div>
                      Time:{' '}
                      {new Date(distanceCrosshair.x)
                        .toLocaleTimeString()
                        .substr(0, 5)}
                    </div>
                    <div>Distance: {distanceCrosshair.y.toFixed(2)}km</div>
                  </div>
                </Crosshair>
              )}
            </FlexibleWidthXYPlot>
            <FlexibleWidthXYPlot
              height={300}
              xType='time-utc'
              yDomain={[0, maxElevation * 1.1]}
              onMouseLeave={() => setElevationCrosshair(null)}
            >
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis
                title='Time'
                tickFormat={(value) => {
                  return new Date(value).toLocaleTimeString().substr(0, 5);
                }}
              />
              <YAxis
                title='Elevation [m]'
                tickFormat={(value) => {
                  return value;
                }}
              />
              <AreaSeries
                fill='#2f54eb99'
                stroke='#2f54ebaa'
                data={elevationData}
                onNearestX={(value) => setElevationCrosshair(value)}
              />
              {elevationCrosshair && (
                <Crosshair values={[elevationCrosshair]}>
                  <div className='chart-crosshair'>
                    <div>
                      Time:{' '}
                      {new Date(elevationCrosshair.x)
                        .toLocaleTimeString()
                        .substr(0, 5)}
                    </div>
                    <div>Elevation: {elevationCrosshair.y}m</div>
                  </div>
                </Crosshair>
              )}
            </FlexibleWidthXYPlot>
          </>
        )}
      </Collapse.Panel>
    </Collapse>
  );
};

export default ActivityCharts;
