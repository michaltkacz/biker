export const validateValue = (value: number | null): number | string => {
  if (value === null) return '-';
  return value;
};

export const formatDistanceValue = (value: number | null): number | string => {
  const validatedValue = validateValue(value);
  if (typeof validatedValue === 'string') {
    return validatedValue;
  }
  return validatedValue / 1000; // m -> km
};

export const formatSpeedValue = (value: number | null): number | string => {
  const validatedValue = validateValue(value);
  if (typeof validatedValue === 'string') {
    return validatedValue;
  }
  return validatedValue * 3.6; // m/s -> km/h
};

export const formatAverageSpeedValue = (
  distance: number | null,
  time: number | null
): number | string => {
  const validatedDistance = validateValue(distance); //m
  const validatedTime = validateValue(time); //ms
  if (
    typeof validatedDistance === 'string' ||
    typeof validatedTime === 'string'
  ) {
    return validatedDistance;
  }

  if (validatedTime === 0) {
    return '-';
  }

  return (validatedDistance / validatedTime) * 3600; // km/h
};

export const formatDurationValue = (value: number | null): string => {
  const validatedValue = validateValue(value);
  if (typeof validatedValue === 'string') {
    return validatedValue;
  }
  return validatedValue > 60000
    ? new Date(validatedValue).toISOString().substr(11, 5)
    : new Date(validatedValue).toISOString().substr(11, 8);
};

export const formatDateValue = (value: number | null): string => {
  const validatedValue = validateValue(value);
  if (typeof validatedValue === 'string') {
    return validatedValue;
  }
  return new Date(validatedValue).toDateString();
};
