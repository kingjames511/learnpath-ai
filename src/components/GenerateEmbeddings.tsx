import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { getEmbedding } from '../utlis/getEmbedding';

export function GenerateEmbeddings() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [progress, setProgress] = useState(0);

  const generateAllEmbeddings = async () => {
    setLoading(true);
    setStatus('Fetching courses...');
    setProgress(0);

    try {
      // 1. Fetch all courses
      const { data: courses, error } = await supabase
        .from('courses')
        .select('id, title, description, topics');

      if (error) throw error;
      if (!courses || courses.length === 0) {
        setStatus('No courses found.');
        return;
      }

      setStatus(`Found ${courses.length} courses. Generating embeddings...`);

      // 2. Loop through and update each course
      for (let i = 0; i < courses.length; i++) {
        const course = courses[i];
        const textToEmbed = `${course.title} ${course.description} ${course.topics.join(' ')}`;
        
        try {
          const embedding = await getEmbedding(textToEmbed);
          
          const { error: updateError } = await supabase
            .from('courses')
            .update({ embedding })
            .eq('id', course.id);

          if (updateError) {
            console.error(`Failed to update course ${course.title}:`, updateError);
          }
        } catch (err) {
          console.error(`Failed to generate embedding for ${course.title}:`, err);
        }

        setProgress(Math.round(((i + 1) / courses.length) * 100));
      }

      setStatus('✅ All embeddings generated and updated!');
    } catch (err: any) {
      console.error('Error:', err);
      setStatus(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Generate Course Embeddings</h2>
      <p className="mb-6 text-gray-600">
        This will generate AI embeddings for all courses in your database to enable semantic search.
      </p>

      <div className="space-y-4">
        <button
          onClick={generateAllEmbeddings}
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {loading ? 'Processing...' : 'Start Generation'}
        </button>

        {loading && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-purple-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {status && (
          <div className={`p-4 rounded-lg ${status.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
}
