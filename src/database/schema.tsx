export enum ActivityTypes {
  Track = 'track',
  Route = 'route',
}

export enum ActivitySportTypes {
  Touring = 'touring',
  MTB = 'mtb',
  EnduroMTB = 'enduroMtb',
  DownhillMTB = 'downhillMtb',
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
  Workout = 'workout',
  Race = 'race',
  Bikepacking = 'bikepacking',
}

export enum GenderTypes {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum RatingTypes {
  Terrible = 'terrible',
  VeryPoor = 'very_poor',
  Poor = 'poor',
  Fair = 'fair',
  Good = 'good',
  VeryGood = 'very_good',
  Excelent = 'excelent',
}

export type ActivityShape = {
  isLoop: boolean;
  from?: string;
  to?: string;
};

export type TrackPoint = {
  lat: number;
  lon: number;
  time: number;
  ele: number | null;
  speed: number | null;
};

export type TrackSegment = {
  points: Array<TrackPoint>;
};

export type Track = {
  segments: Array<TrackSegment>;
  timestamp: number | null;
};

// !template:
// const tp:TrackPoint = {
//   lat: 0,
//   lon: 0,
//   ele: 0,
//   time: 0,
// }

// const ts: TrackSegment = {
//   trackPoints: [tp],
// }

// const t: Track = {
//   segments: [ts]
// }

// t.segments[0].trackPoints[0]

export type ActivityStatistics = {
  totalDistance: number | null;
  totalDuration: number | null;
  inMotionDuration: number | null;
  maxSpeed: number | null;
  averageSpeed: number | null;
  elevationUp: number | null;
  elevationDown: number | null;
};

export type Activity = {
  activityId: string;
  creatorId: string;
  name: string;
  createdAt: number;
  lastModifiedAt: number;
  type: ActivityTypes;
  sport: ActivitySportTypes;
  category: ActivityCategoryTypes;
  shape: ActivityShape;
  statistics: ActivityStatistics;
  rating?: number;
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
  age?: number;
  weight?: number;
  height?: number;
  country?: string;
  city?: string;
  description?: string;
};

export type User = {
  userId: string;
  profile: UserProfile | null;
  statistics: UserStatistics | null;
  activities: { [activityId: string]: Activity } | null;
  tracks: { [activityId: string]: Track } | null;
};

type DatabaseSchema = {
  users: { [userId: string]: User } | null;
};

export default DatabaseSchema;
