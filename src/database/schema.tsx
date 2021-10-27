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

export type ActivityShape = {
  isLoop: boolean;
  from?: string;
  to?: string;
};

export type Coordinates = {
  lat: number;
  lon: number;
  ele?: number;
  time: number;
};

export type Activity = {
  activityId: string;
  creatorId: string;
  name: string;
  createdAt: number;
  lastModifiedAt: number;
  distance: number;
  totalDuration: number;
  inMotionDuration: number;
  type: ActivityTypes;
  sport: ActivitySportTypes;
  category: ActivityCategoryTypes;
  shape: ActivityShape;
  maxSpeed?: number;
  averageSpeed?: number;
  elevationUp?: number;
  elevationDown?: number;
  rating?: number;
  tags?: Array<string>;
};

export type UserStatistics = {
  maxSpeed?: number;
  totalDistance?: number;
  totalElevationUp?: number;
  totalElevationDown?: number;
  totalDuration?: number;
  totalInMotionDuration?: number;
  averageRating?: number;
  firstActivityAt?: number;
  lastActivityAt?: number;
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
};

type DatabaseSchema = {
  users: { [userId: string]: User } | null;
  tracks: { [activityId: string]: Array<Coordinates> } | null;
};

export default DatabaseSchema;
