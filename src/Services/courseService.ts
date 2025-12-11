import { supabase } from "../lib/supabase";
import type { UserCourse } from "../types/types";

export const getUserEnrolledCourses = async (userId: string): Promise<UserCourse[]> => {
    const { data, error } = await supabase
        .from("user_courses")
        .select(`
          *,
          course:courses!user_courses_course_id_fkey (*)
        `)
        .eq("user_id", userId);

    if (error) {
        console.error("Error fetching enrolled courses:", error);
        throw error;
    }

    return data || [];
};

export const enrollUserInCourse = async (userId: string, courseId: string) => {
    // Check if already enrolled
    const { data: existing } = await supabase
        .from("user_courses")
        .select("id")
        .eq("user_id", userId)
        .eq("course_id", courseId)
        .single();

    if (existing) return; // Already enrolled

    const { data, error } = await supabase
        .from("user_courses")
        .insert([
            {
                user_id: userId,
                course_id: courseId,
                progress: 0,
                status: 'in_progress'
            }
        ])
        .select();

    if (error) throw error;
    return data;
};

export const updateCourseProgress = async (userId: string, courseId: string, progress: number) => {
    const { data, error } = await supabase
        .from("user_courses")
        .update({
            progress,
            status: progress >= 100 ? 'completed' : 'in_progress'
        })
        .eq("user_id", userId)
        .eq("course_id", courseId)
        .select();

    if (error) throw error;
    return data;
};
