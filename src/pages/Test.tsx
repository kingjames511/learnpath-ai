import { useEffect, useState } from "react";
import { useAuth } from "../Services/contextApi/AuthContext";
import {
  getPersonalizeRecomendation,
  searchCourses,
} from "../Services/recomendationService";

export default function TestRecommendations() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadRecommendations();
  }, [user]);

  const loadRecommendations = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const recs = await getPersonalizeRecomendation(user.id, 20);
      setRecommendations(recs);
    } catch (error) {
      console.error("Error loading recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const results = await searchCourses(searchQuery);
      setRecommendations(results);
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🧪 Test Recommendations</h1>

        {/* Search */}
        <div className="mb-8 flex gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses..."
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Search
          </button>
          <button
            onClick={loadRecommendations}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg"
          >
            Reload Recommendations
          </button>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((course) => (
            <div key={course.id} className="bg-white p-6 rounded-lg shadow">
              <img
                src={course.thumbnail_url}
                alt={course.title}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="font-bold text-lg mb-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {course.description}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded">
                  {course.difficulty}
                </span>
                <span className="text-gray-600">{course.duration_hours}h</span>
                <span className="text-yellow-600">⭐ {course.rating}</span>
              </div>
              {course.score && (
                <div className="mt-2 text-xs text-gray-500">
                  Match Score: {course.score.toFixed(0)}
                </div>
              )}
            </div>
          ))}
        </div>

        {recommendations.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No recommendations found
          </div>
        )}
      </div>
    </div>
  );
}
