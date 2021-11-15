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

export type Track = Array<TrackSegment>;

export type ActivityStatistics = {
  totalDistance?: number;
  totalDuration?: number;
  inMotionDuration?: number;
  maxSpeed?: number;
  elevationUp?: number;
  elevationDown?: number;
};

export type Activity = {
  activityId: string;
  creatorId: string;
  name: string;
  createdAt: number;
  lastModifiedAt: number;
  startTime: number;
  endTime: number;
  track: Track;
  sport: ActivitySportTypes;
  category: ActivityCategoryTypes;
  shape: ActivityShape;
  statistics: ActivityStatistics;
  rating?: RatingTypes;
  tags?: Array<string>;
};

export type UserStatistics = {
  minDistance?: number;
  minElevation?: number;
  minDuration?: number;
  maxSpeed?: number;
  maxDistance?: number;
  maxElevation?: number;
  maxDuration?: number;
  totalDistance?: number;
  totalElevationUp?: number;
  totalElevationDown?: number;
  totalDuration?: number;
  totalInMotionDuration?: number;
  // averageSpeed?: number; //! can be calcualted just in time
  // averageDistance?: number;
  // averageElevation?: number;
  // averageDuration?: number;
  // averageInMotionDuration?: number;
  longestUphill?: number;
  longestDownhill?: number;
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
  birthday?: Date;
  weight?: number;
  height?: number;
  country?: string;
  city?: string;
  description?: string;
};

export type User = {
  userId: string;
  profile?: UserProfile;
  statistics?: UserStatistics;
  activities?: { [activityId: string]: Activity };
};

type DatabaseSchema = {
  users?: { [userId: string]: User };
};

export default DatabaseSchema;
