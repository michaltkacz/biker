export const toRad = (value: number) => {
  return (value * Math.PI) / 180;
};

export const geoDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371 * 1000; // Radius of the earth in m
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // m
};

export const geoSpeed1 = (deltaDistance: number, deltaTime: number): number => {
  return (deltaDistance / deltaTime) * 1000; // m/ms * 1000 == m/s
};

export const geoSpeed2 = (
  lat1: number,
  lon1: number,
  time1: number,
  lat2: number,
  lon2: number,
  time2: number
): number => {
  return geoSpeed1(
    geoDistance(lat1, lon1, lat2, lon2),
    deltaTime(time1, time2)
  ); // m/s
};

export const geoMove = (
  lat1: number,
  lon1: number,
  time1: number,
  lat2: number,
  lon2: number,
  time2: number,
  ele1?: number | null,
  ele2?: number | null
): {
  distance: number;
  speed: number;
  time: number;
  dElevation: number | undefined;
} => {
  const distance = geoDistance(lat1, lon1, lat2, lon2); // m
  const time = deltaTime(time1, time2); // ms
  const speed = geoSpeed1(distance, time); // m/s
  const dElevation = deltaElevation(ele1, ele2); // m

  return { distance, speed, time, dElevation };
};

export const deltaElevation = (
  ele1?: number | null,
  ele2?: number | null
): number | undefined => {
  if (!ele1 || !ele2) {
    return undefined;
  }
  return ele1 - ele2; //m
};

export const deltaTime = (time1: number, time2: number) => {
  return Math.abs(time2 - time1); //ms
};
