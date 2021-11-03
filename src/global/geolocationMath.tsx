export const toRad = (value: number) => {
  return (value * Math.PI) / 180;
};

export const geoDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  var R = 6371 * 1000; // Radius of the earth in km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
};

export const geoSpeed1 = (deltaDistance: number, deltaTime: number): number => {
  return (deltaDistance / deltaTime) * 1000;
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
  );
};

export const geoMove = (
  lat1: number,
  lon1: number,
  time1: number,
  lat2: number,
  lon2: number,
  time2: number,
  ele1: number | null,
  ele2: number | null
): {
  distance: number;
  speed: number;
  dTime: number;
  dElevation: number | null;
} => {
  const distance = geoDistance(lat1, lon1, lat2, lon2);
  const dTime = deltaTime(time1, time2);
  const speed = geoSpeed1(distance, dTime);
  const dElevation = deltaElevation(ele1, ele2);

  return { distance, speed, dTime, dElevation };
};

export const deltaElevation = (
  ele1: number | null,
  ele2: number | null
): number | null => {
  if (!ele1 || !ele2) {
    return null;
  }
  return ele1 - ele2;
};

export const deltaTime = (time1: number, time2: number) => {
  return Math.abs(time2 - time1);
};
