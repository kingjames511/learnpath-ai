import { supabase } from "../lib/supabase";
import type { UserProfile, Course } from "../types/types";
import { getEmbedding } from "../../scripts/generate-embedding";
// rules based fittering
export async function filterCoursesByRule(
  profile: UserProfile
): Promise<Course[]> {
  let query = supabase.from("courses").select("*");

  //matching user interest value
  if (profile.skill_level === "Beginner") {
    query = query.in("difficulty", ["Beginner"]);
  } else if (profile.skill_level === "Intermediate") {
    query = query.in("difficulty", ["Beginner", "Intermediate"]);
  } else if (profile.skill_level === "Advanced") {
    query = query.in("difficulty", ["Intermediate", "Advanced"]);
  } else {
    query = query.in("difficulty", ["Advanced", "Expert"]);
  }

  const maxDuration = profile.weekly_hours * 4;
  query = query.lte("duration_hours", maxDuration);

  if (profile?.interests?.length > 0) {
    query = query.overlaps("topics", profile.interests);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return data || [];
}

export function scoreCoursesForUser(
  courses: Course[],
  profile: UserProfile
): Array<Course & { score: number }> {
  return courses
    .map((course) => {
      let score = 0;

      const topicMatches = course.topics.filter((topic) =>
        profile.interests.some(
          (interest) =>
            topic.toLowerCase().includes(interest.toLowerCase()) ||
            interest.toLowerCase().includes(topic.toLowerCase())
        )
      ).length;
      score += Math.min(topicMatches * 10, 30);

      // Score 2: Skill Level Match (25 points)
      if (course.difficulty === profile.skill_level) {
        score += 25;
      } else if (
        (profile.skill_level === "Beginner" &&
          course.difficulty === "Intermediate") ||
        (profile.skill_level === "Intermediate" &&
          course.difficulty === "Advanced")
      ) {
        score += 15;
      }

      const idealDuration = profile.weekly_hours * 2; // 2 weeks worth
      const durationDiff = Math.abs(course.duration_hours - idealDuration);
      if (durationDiff < 5) {
        score += 20;
      } else if (durationDiff < 10) {
        score += 10;
      }

      // Score 4: Rating Boost (15 points max)
      score += course.rating * 3;

      // Score 5: Free courses get bonus (10 points)
      if (course.is_free) {
        score += 10;
      }

      return { ...course, score };
    })
    .sort((a, b) => b.score - a.score); // Sort by score descending
}

export async function getSemanticRecommendations(
  queryText: string,
  limit: number = 20
): Promise<Course[]> {
  const embeddingText = await getEmbedding(queryText);

  const { data, error } = await supabase.rpc("match_courses", {
    query_embedding: embeddingText,
    match_threshold: 0.7,
    match_count: limit,
  });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function getPersonalizeRecomendation(
  userId: string,
  limit: number = 20
): Promise<Course[]> {
  const { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (profileError) {
    console.error("❌ Database error:", profileError);
    throw new Error(`Failed to fetch profile: ${profileError.message}`);
  }

  // Handle missing profile
  if (!profile) {
    console.warn("⚠️ No profile found for user:", userId);
    throw new Error(
      "User profile not found. Please complete onboarding first."
    );
  }

  console.log("✅ Profile loaded:", profile);

  const filteredCourses = await filterCoursesByRule(profile);

  const scoredCourses = await scoreCoursesForUser(filteredCourses, profile);

  const interestQuerry = profile?.interests?.join(" ");

  const semanticMatches = await getSemanticRecommendations(interestQuerry, 10);

  const topScored = scoredCourses.slice(0, Math.floor(limit * 0.7));
  const topSemantic = semanticMatches.slice(0, Math.ceil(limit * 0.3));

  const combined = [...topScored];
  topSemantic.forEach((semCourse) => {
    if (!combined.find((c) => c.id === semCourse.id)) {
      combined.push({ ...semCourse, score: 50 });
    }
  });
  return combined.slice(0, limit);
}
export async function searchCourses(
  searchQuery: string,
  filters?: {
    difficulty?: string;
    platform?: string;
    topics?: string[];
    maxDuration?: number;
  }
): Promise<Course[]> {
  // Use semantic search for the query
  const semanticResults = await getSemanticRecommendations(searchQuery, 50);

  // Apply additional filters if provided
  let filtered = semanticResults;

  if (filters?.difficulty) {
    filtered = filtered.filter((c) => c.difficulty === filters.difficulty);
  }

  if (filters?.platform) {
    filtered = filtered.filter((c) => c.platform === filters.platform);
  }

  if (filters?.topics && filters.topics.length > 0) {
    filtered = filtered.filter((c) =>
      c.topics.some((t) => filters.topics?.includes(t))
    );
  }

  if (filters?.maxDuration !== undefined) {
    filtered = filtered.filter((c) => c.duration_hours <= filters.maxDuration);
  }

  return filtered;
}
