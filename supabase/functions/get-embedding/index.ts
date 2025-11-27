import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { HfInference } from "npm:@huggingface/inference@latest"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: any) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get the API key from environment variable
    const HF_API_KEY = Deno.env.get('HUGGINGFACE_API_TOKEN')

    if (!HF_API_KEY) {
      throw new Error('Hugging Face API token not configured')
    }

    // Initialize the Hugging Face client
    const hf = new HfInference(HF_API_KEY)

    // Parse request body
    const { text, model } = await req.json()

    if (!text) {
      throw new Error('Text is required')
    }

    console.log('Calling Hugging Face API...')

    // Use featureExtraction method
    const embedding = await hf.featureExtraction({
      model: model || 'sentence-transformers/all-MiniLM-L6-v2',
      inputs: text
    })

    console.log('📦 Response type:', typeof embedding)
    console.log(`✅ Got embedding with ${embedding.length} dimensions`)

    return new Response(
      JSON.stringify({
        success: true,
        embedding: embedding,
        dimensions: embedding.length
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      },
    )
  } catch (error: any) {
    console.error('Error:', error.message)

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400
      },
    )
  }
})