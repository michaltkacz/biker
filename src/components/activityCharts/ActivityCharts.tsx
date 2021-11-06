import React, { useEffect, useState } from 'react';
import { Collapse, Spin, Typography } from 'antd';

import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  AreaSeries,
  Crosshair,
  AreaSeriesPoint,
} from 'react-vis';
import 'react-vis/dist/style.css';

import './activityCharts.less';

import { Track } from '../../database/schema';

import { geoMove } from '../../global/geolocationMath';

export type ActivityChartsProps = {
  track: Track;
};

const ActivityCharts: React.FC<ActivityChartsProps> = ({ track }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [distanceData, setDistanceData] = useState<Array<AreaSeriesPoint>>([]);
  const [speedData, setSpeedData] = useState<Array<AreaSeriesPoint>>([]);
  const [elevationData, setElevationData] = useState<Array<AreaSeriesPoint>>(
    []
  );
  const [gainElevationData, setGainElevationData] = useState<
    Array<AreaSeriesPoint>
  >([]);
  const [maxElevation, setMaxElevation] = useState<number>(0);
  const [maxSpeed, setMaxSpeed] = useState<number>(0);
  const [crosshair, setCrosshair] = useState<AreaSeriesPoint | null>(null);

  const parseData = async () => {
    const flatTrack = track.flat();

    if (flatTrack.length === 0) {
      return;
    }

    let newSpeedData: Array<AreaSeriesPoint> = [];
    let newDistanceData: Array<AreaSeriesPoint> = [];
    let newElevationData: Array<AreaSeriesPoint> = [];
    let newGainElevationData: Array<AreaSeriesPoint> = [];
    let newMaxElevation: number = 0;

    let newDistance: number = 0;
    let newGainElevation: number = 0;
    let newSpeed: number = 0;

    flatTrack.forEach((point, index) => {
      const newElevation = Math.round(point.ele || 0);

      newMaxElevation = Math.max(newElevation, newMaxElevation);
      newElevationData.push({
        x: point.time,
        y: newElevation,
      });

      if (index === 0) {
        newDistanceData.push({ x: point.time, y: 0 });
        newSpeedData.push({ x: point.time, y: 0 });
        newGainElevationData.push({ x: point.time, y: 0 });
        return;
      }
      const prevPoint = flatTrack[index - 1];
      const { distance, speed, dElevation } = geoMove(
        point.lat,
        point.lon,
        point.time,
        prevPoint.lat,
        prevPoint.lon,
        prevPoint.time,
        point.ele,
        prevPoint.ele
      );

      if (newDistance > 0.001) {
        newSpeed = Math.round(speed * 3.6);
      } else {
        newSpeed = 0;
      }

      newDistance += Math.round(distance * 100) / 100;
      newGainElevation += dElevation || 0;

      newDistanceData.push({ x: point.time, y: newDistance });
      newSpeedData.push({ x: point.time, y: newSpeed });
      newGainElevationData.push({ x: point.time, y: newGainElevation });
    });

    // console.log(newGainElevationData);
    // console.log(newElevationData);
    // console.log(newSpeedData);
    // console.log(newDistanceData);

    setDistanceData(newDistanceData);
    setSpeedData(newSpeedData);
    setElevationData(newElevationData);
    setGainElevationData(newGainElevationData);
    setMaxElevation(newMaxElevation);
  };

  useEffect(() => {
    parseData().then(() => setLoading(false));
    // let totalDistance: number = 0;
    // const newDistanceData = flatTrack.map((point, index) => {
    //   if (index !== 0) {
    //     const prevPoint = flatTrack[index - 1];
    //     totalDistance +=
    //       geoDistance(point.lat, point.lon, prevPoint.lat, prevPoint.lon) /
    //       1000;
    //   }
    //   return {
    //     time: point.time,
    //     distance: totalDistance,
    //   };
    // });
    // console.log(newDistanceData);
    // setDistanceData(newDistanceData);
  }, [track]);

  if (loading) {
    return (
      <div className='loading-container'>
        <Spin tip='Loading...' />
      </div>
    );
  }

  return (
    <Collapse className='activity-charts'>
      <Collapse.Panel
        className='activity-charts-header'
        header={
          <Typography.Title className='activity-charts-header-title' level={5}>
            Charts
          </Typography.Title>
        }
        key='charts'
      >
        <FlexibleWidthXYPlot
          height={300}
          xType='time-utc'
          onMouseLeave={() => setCrosshair(null)}
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
            fill='#bdb2ffaa'
            stroke='#bdb2ff'
            data={speedData}
            onNearestX={(value) => setCrosshair(value)}
            curve='curveStepBefore'
          />
          {crosshair && (
            <Crosshair values={[crosshair]}>
              <div className='crosshair'>
                <div>
                  Time:{' '}
                  {new Date(crosshair.x).toLocaleTimeString().substr(0, 5)}
                </div>
                <div>Elevation: {crosshair.y}m</div>
              </div>
            </Crosshair>
          )}
        </FlexibleWidthXYPlot>
        <FlexibleWidthXYPlot
          height={300}
          xType='time-utc'
          yDomain={[0, maxElevation * 1.5]}
          onMouseLeave={() => setCrosshair(null)}
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
            fill='#bdb2ffaa'
            stroke='#bdb2ff'
            data={elevationData}
            onNearestX={(value) => setCrosshair(value)}
          />
          {crosshair && (
            <Crosshair values={[crosshair]}>
              <div className='crosshair'>
                <div>
                  Time:{' '}
                  {new Date(crosshair.x).toLocaleTimeString().substr(0, 5)}
                </div>
                <div>Elevation: {crosshair.y}m</div>
              </div>
            </Crosshair>
          )}
        </FlexibleWidthXYPlot>
      </Collapse.Panel>
    </Collapse>
  );
};

// export type ChartContainerProps = {
//   width: number;
//   height: number;
// };

// export const ChartContainer: React.FC<ChartContainerProps> = ({
//   width,
//   height,
//   children,
// }) => {
//   return (
//     <div style={{ width, height }} className='chart-container'>
//       {children}
//     </div>
//   );
// };

export default ActivityCharts;
