export type ActivityUpdate = {
  name: boolean;
  sport: boolean;
  category: boolean;
  shape: boolean;
  rating: boolean;
  tags: boolean;
};

export type EnumTypes =
  | ActivitySportTypes
  | ActivityCategoryTypes
  | GenderTypes
  | RatingTypes;

export enum ActivitySportTypes {
  Touring = 'touring',
  MTB = 'mtb',
  Enduro = 'enduro',
  Downhill = 'downhill',
  Gravel = 'gravel',
  Road = 'road',
  BMX = 'bmx',
  Tandem = 'tandem',
  Cyclocross = 'cyclocross',
  Track = 'track',
  Speedway = 'speedway',
  Other = 'other',
}

export enum ActivityCategoryTypes {
  Commute = 'commute',
  Casual = 'casual',
  Workout = 'training',
  Race = 'race',
  Bikepacking = 'bikepacking',
  Other = 'other',
}

export enum GenderTypes {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum RatingTypes {
  Terrible = 'terrible',
  Poor = 'poor',
  Fair = 'fair',
  Good = 'good',
  Excelent = 'excellent',
}

export type ActivityShape = {
  isLoop: boolean;
  from: string;
  to: string;
};

export type TrackPoint = {
  lat: number;
  lon: number;
  time: number;
  ele?: number | null;
};

export type TrackSegment = Array<TrackPoint>;

export type Track = {
  activityId: string;
  segments: Array<TrackSegment>;
};

export type ActivityStatistics = {
  totalDistance?: number;
  totalDuration?: number;
  inMotionDuration?: number;
  maxSpeed?: number;
  elevationUp?: number;
  elevationDown?: number;
  minElevation?: number;
  maxElevation?: number;
};

export type Activity = {
  activityId: string;
  creatorId: string;
  name: string;
  createdAt: number;
  lastModifiedAt: number;
  startTime: number;
  endTime: number;
  sport: ActivitySportTypes;
  category: ActivityCategoryTypes;
  shape: ActivityShape;
  statistics: ActivityStatistics;
  rating?: RatingTypes;
  tags?: Array<string>;
};

export type UserStatistics = {
  minDistance?: number;
  maxDistance?: number;
  totalDistance?: number;
  // averageDistance?: number;

  minElevation?: number;
  maxElevation?: number;
  totalElevationUp?: number;
  totalElevationDown?: number;
  // averageElevation?: number;

  longestUphill?: number;
  longestDownhill?: number;

  maxSpeed?: number;
  // averageSpeed?: number;
  // averageSpeedInMotion?: number;

  totalDuration?: number;
  minDuration?: number;
  maxDuration?: number;
  // averageDuration?: number;

  inMotionDuration?: number;
  minInMotionDuration?: number;
  maxInMotionDuration?: number;
  // averageInMotionDuration?: number;

  firstActivityAt?: number;
  lastActivityAt?: number;

  ratingStatistics?: {
    [key in RatingTypes]?: number;
  };
  sportStatistics?: {
    [key in ActivitySportTypes]?: number;
  };
  categoryStatistics?: {
    [key in ActivityCategoryTypes]?: number;
  };
};

export type UserProfile = {
  gender?: GenderTypes;
  birthday?: string;
  weight?: number;
  height?: number;
  country?: string;
  city?: string;
  description?: string;
};

export type User = {
  userId: string;
  profile?: UserProfile;
  activities?: { [activityId: string]: Activity };
  tracks?: { [trackId: string]: Track };
};

type DatabaseSchema = {
  users?: { [userId: string]: User };
};

export default DatabaseSchema;
