import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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
    const HF_TOKEN = Deno.env.get('HUGGINGFACE_API_TOKEN')
    
    if (!HF_TOKEN) {
      throw new Error('Hugging Face API token not configured')
    }

    const { model, inputs, parameters } = await req.json()
    
    if (!model || !inputs) {
      throw new Error('Model and inputs are required')
    }

    // Build request body
    const requestBody: any = { inputs }
    if (parameters) {
      requestBody.parameters = parameters
    }

    const response = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Hugging Face API error: ${errorText}`)
    }

    const result = await response.json()

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      },
    )
  } catch (error :any) {
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