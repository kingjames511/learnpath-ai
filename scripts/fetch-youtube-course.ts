import { createClient } from "@supabase/supabase-js";
 const YOUTUBE_API_KEY = 'AIzaSyBPU6QVE1Na6vr43DY_cj67ctbtEQddFco'
 const supabaseUrl = 'https://wcrcqdmskjntifrphezu.supabase.co'
 const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjcmNxZG1za2pudGlmcnBoZXp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1MDQyNjgsImV4cCI6MjA3NzA4MDI2OH0.5gbeJpSSsbZhfWQM0bLEyw-OMYMQqsMOFRov3FF8jHw'
 const supabase = createClient(supabaseUrl ,supabaseAnonKey)

 const couserQuerries =[
  'web development tutorial',
  'javascript course',
  'react tutorial',
  'python programming',
  'machine learning course',
  'data science tutorial',
  'graphics designing',
  'Ui/UX toutorial'
]

export const fetchYoutubeCourse = async() => {  
     
     const detectDiffcult = (title : string, description : string
     ) => {
          const text = (title + '' + description).toLowerCase()

            const beginner = ["beginner", "basics", "introduction", "crash course", "for beginners"]
           const intermediate = ["intermediate", "level up", "in depth", "deep dive"]
          const advanced = ["advanced", "expert", "senior", "architecture", "system design"]


          if(beginner.some(k => text.includes(k))) return 'begginer'
          if(intermediate.some(k => text.includes(k) ))  return 'intermediate'
          if(advanced.some(k => text.includes(k))) return 'advance'

          return 'unknown'

     }
 
     for (const query of couserQuerries){
          const response = await fetch (`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${encodeURIComponent(query)}&type=video&videoDuration=long&key=${YOUTUBE_API_KEY}`)


          const data = await response.json()

          
if (!response.ok) {
  console.error("YouTube API error:", data)
  continue
}

if (!data.items || !Array.isArray(data.items)) {
  console.error("No items found:", data)
  continue
}


      const courses = data?.items.map((item : any)=> ({
     title: item.snippet.title,
     description: item.snippet.description,
     platform: 'YouTube',
     url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
     thumbnail_url: item.snippet.thumbnails.high.url,
     difficulty: detectDiffcult(item.snippet.title, item.snippet.description    ),
      is_free: true,
            published_date: item.snippet.publishedAt
          }))

     const {  error } = await supabase.from('courses').insert(courses) 
if (error) console.log('Supabase insert error:', error)    
     }

    
}
 fetchYoutubeCourse()