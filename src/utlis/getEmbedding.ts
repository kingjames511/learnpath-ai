import { HfInference } from '@huggingface/inference'

const HF_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_TOKEN

export async function getEmbedding(text: string, model: string = 'sentence-transformers/all-MiniLM-L6-v2') {
  try {
    if (!HF_API_KEY) {
      throw new Error('Hugging Face API token not configured. Please add VITE_HUGGINGFACE_API_TOKEN to your .env file')
    }

    console.log('🚀 Calling Hugging Face API directly...')

    // Initialize HF client
    const hf = new HfInference(HF_API_KEY)

    // Call the feature extraction API
    const embedding = await hf.featureExtraction({
      model: model,
      inputs: text
    })

    console.log('📦 Response type:', typeof embedding)
    console.log(`✅ Got embedding with ${Array.isArray(embedding) ? embedding.length : 'unknown'} dimensions`)

    return embedding

  } catch (error: any) {
    console.error('❌ Error calling Hugging Face API:', error.message)
    throw error
  }
}

// Batch embeddings with rate limiting
export async function getBatchEmbeddings(texts: string[], delayMs: number = 100) {
  const embeddings = []

  for (const text of texts) {
    const embedding = await getEmbedding(text)
    embeddings.push(embedding)

    // Add delay to avoid rate limits
    if (delayMs > 0) {
      await new Promise(resolve => setTimeout(resolve, delayMs))
    }
  }

  return embeddings
}