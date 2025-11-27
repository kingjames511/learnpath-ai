import { useState } from 'react'
import { getEmbedding } from '../utlis/getEmbedding'

export function TestEmbedding() {
  const [text, setText] = useState('Hello world')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleTest = async () => {
    try {
      setLoading(true)
      setError(null)
      setResult(null)

      console.log('🚀 Testing embedding function...')
      const embedding = await getEmbedding(text)
      
      setResult({
        success: true,
        dimensions: embedding.length,
        preview: embedding.slice(0, 5), // First 5 values
        embedding: embedding
      })
      
      console.log('✅ Success! Got embedding with', embedding.length, 'dimensions')
    } catch (err: any) {
      console.error('❌ Error:', err)
      setError(err.message || 'Failed to get embedding')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Test Hugging Face Embedding Function</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          Enter text to get embedding:
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
          placeholder="Enter any text..."
        />
      </div>

      <button
        onClick={handleTest}
        disabled={loading || !text}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: loading ? '#ccc' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '20px'
        }}
      >
        {loading ? '⏳ Testing...' : '🧪 Test Function'}
      </button>

      {error && (
        <div style={{
          padding: '15px',
          backgroundColor: '#ffebee',
          border: '1px solid #f44336',
          borderRadius: '4px',
          color: '#c62828',
          marginTop: '20px'
        }}>
          <strong>❌ Error:</strong> {error}
        </div>
      )}

      {result && (
        <div style={{
          padding: '15px',
          backgroundColor: '#e8f5e9',
          border: '1px solid #4CAF50',
          borderRadius: '4px',
          marginTop: '20px'
        }}>
          <h3 style={{ marginTop: 0 }}>✅ Success!</h3>
          <p><strong>Dimensions:</strong> {result.dimensions}</p>
          <p><strong>Preview (first 5 values):</strong></p>
          <pre style={{
            backgroundColor: '#f5f5f5',
            padding: '10px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
            {JSON.stringify(result.preview, null, 2)}
          </pre>
          <details>
            <summary style={{ cursor: 'pointer', marginTop: '10px' }}>
              Show full embedding vector
            </summary>
            <pre style={{
              backgroundColor: '#f5f5f5',
              padding: '10px',
              borderRadius: '4px',
              overflow: 'auto',
              maxHeight: '300px'
            }}>
              {JSON.stringify(result.embedding, null, 2)}
            </pre>
          </details>
        </div>
      )}

      <div style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <strong>💡 About this test:</strong>
        <p>This component calls your deployed Supabase Edge Function <code>get-embedding</code> which uses your Hugging Face API key to generate text embeddings.</p>
        <p>Open the browser console (F12) to see detailed logs.</p>
      </div>
    </div>
  )
}
