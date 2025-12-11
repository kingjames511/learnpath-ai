export interface UserProfile {
  interests: string[]
  skill_level: string,
  learning_goal: string
  weekly_hours: number;
  learning_style: string[]
}

export interface Course {
  id: string
  title: string,
  topics: string[],
  description: string
  interests: string[]
  skill_level: string,
  learning_goal: string
  weekly_hours: number;
  learning_style: string[]
}

export interface Course {
  id: string
  title: string,
  topics: string[],
  description: string
  platform: string
  url: string
  thumbnail_url: string
  difficulty: string
  duration_hours: number
  rating: number
  is_free: boolean

}

export interface UserCourse {
  id: string;
  user_id: string;
  course_id: string;
  progress: number;
  last_accessed: string;
  is_completed: boolean;
  course?: Course; // For joined data
}