import { supabase } from "../src/Services/supabase";
const HF_API_KEY = ''


async function getEmbedding(text: string) {
  try {
    console.log('Calling Hugging Face API...')

    const response = await fetch(
      'https://router.huggingface.co/hf-inference/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: text,
          options: { wait_for_model: true }
        })
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('HF API Error:', errorText)
      return
    }

    const result = await response.json()
    console.log('📦 Response type:', typeof result)
    console.log('📦 Response preview:', JSON.stringify(result).substring(0, 100) + '...')

    if (Array.isArray(result)) {
      if (Array.isArray(result[0])) {
        console.log(`✅ Got embedding with ${result[0].length} dimensions`)
        return result[0]
      } else {
        console.log(`✅ Got embedding with ${result.length} dimensions`)
        return result
      }
    } else {
      throw new Error(`Unexpected response format: ${JSON.stringify(result)}`)
    }
  } catch (error: any) {
    console.error('Error:', error.message)
  }
}


async function generateEmbeddings() {
  console.log('🤖 Starting embedding generation...\n')
  
  try {
    // Test API key first
    console.log('🔑 Testing Hugging Face API key...')
    try {
      await getEmbedding('test')
      console.log('✅ API key is valid!\n')
    } catch (error: any) {
      console.log('❌ API key test failed:', error.message)
      console.error('\n⚠️  Please check your Hugging Face API key!\n')
      return
    }
    
    // Get courses without embeddings
    console.log('📚 Fetching courses from database...')
    const { data: courses, error } = await supabase
      .from('courses')
      .select('*')
      .is('embedding', null)
    
    if (error) {
     console.log('❌ Database error:', error)
      throw error
    }
    
    if (!courses || courses.length === 0) {
      console.log(' All courses already have embeddings!')
      return
    }
    
    console.log(`📊 Found ${courses.length} courses without embeddings\n`)
    console.log('─'.repeat(60))
    
    let successCount = 0
    let failCount = 0
    
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i]
      
      console.log(`\n[${i + 1}/${courses.length}] ${course.title}`)
      console.log(`   Platform: ${course.platform}`)
      console.log(`   Difficulty: ${course.difficulty}`)
      
      try {
        // Combine title and description
        const text = `${course.title}. ${course.description || ''}`
        console.log(`   Text length: ${text.length} characters`)
        
        // Get embedding
        const embedding = await getEmbedding(text)
        
        // Update in database
        console.log('   💾 Saving to database...')
        const { error: updateError } = await supabase
          .from('courses')
          .update({ embedding })
          .eq('id', course.id)
        
        if (updateError) {
          console.log(`   ❌ Database update failed:`, updateError.message)
          failCount++
        } else {
          console.log(`   ✅ Successfully embedded and saved!`)
          successCount++
        }
        
        // Rate limiting
        if (i < courses.length - 1) {
          console.log('   ⏳ Waiting 2 seconds...')
          await new Promise(resolve => setTimeout(resolve, 2000))
        }
        
      } catch (error: any) {
        console.error(`   ❌ Failed:`, error.message)
        failCount++
        

        console.log('   ⏭️  Skipping to next course...')
      }
    }
    
    console.log('\n' + '═'.repeat(60))
    console.log('🎉 Embedding generation complete!')
    console.log(`✅ Success: ${successCount}`)
    console.log(`❌ Failed: ${failCount}`)
    console.log('═'.repeat(60))
    
  } catch (error: any) {
    console.error('\n❌ Fatal error:', error.message)
 
  }
}

generateEmbeddings()
