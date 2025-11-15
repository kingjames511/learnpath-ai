export function extractTopics(title: string): string[] {
  const lowerTitle = title.toLowerCase()
  const topics: string[] = []
  
  // Main programming languages/frameworks
  const mainTech: { [key: string]: RegExp } = {
    'JavaScript': /\b(javascript|js|ecmascript)\b/i,
    'TypeScript': /\b(typescript|ts)\b/i,
    'Python': /\b(python|py)\b/i,
    'Java': /\b(java)\b(?!script)/i,
    'C#': /\b(c#|csharp|c sharp)\b/i,
    'C++': /\b(c\+\+|cpp)\b/i,
    'PHP': /\b(php)\b/i,
    'Ruby': /\b(ruby)\b/i,
    'Go': /\b(golang|go programming)\b/i,
    'Rust': /\b(rust)\b/i,
    'Swift': /\b(swift)\b/i,
    'Kotlin': /\b(kotlin)\b/i,
    
    'React': /\b(react|reactjs)\b/i,
    'Vue': /\b(vue|vuejs)\b/i,
    'Angular': /\b(angular)\b/i,
    'Node.js': /\b(node|nodejs|node\.js)\b/i,
    'Next.js': /\b(next|nextjs|next\.js)\b/i,
    'Django': /\b(django)\b/i,
    'Flask': /\b(flask)\b/i,
    'Express': /\b(express|expressjs)\b/i,
    'MongoDB': /\b(mongodb|mongo)\b/i,
    'PostgreSQL': /\b(postgresql|postgres)\b/i,
    'MySQL': /\b(mysql)\b/i,
    'Firebase': /\b(firebase)\b/i,
    'Docker': /\b(docker)\b/i,
    'Kubernetes': /\b(kubernetes|k8s)\b/i,
  }
  
  // Check main technologies
  for (const [topic, regex] of Object.entries(mainTech)) {
    if (regex.test(lowerTitle)) {
      topics.push(topic)
    }
  }
  
  // Web technologies
  if (/\b(html|html5)\b/i.test(lowerTitle)) topics.push('HTML')
  if (/\b(css|css3|sass|scss|tailwind|bootstrap)\b/i.test(lowerTitle)) topics.push('CSS')
  
  // Categories
  if (/\b(web dev|web development|website)\b/i.test(lowerTitle)) topics.push('Web Development')
  if (/\b(frontend|front-end|front end)\b/i.test(lowerTitle)) topics.push('Frontend')
  if (/\b(backend|back-end|back end|server)\b/i.test(lowerTitle)) topics.push('Backend')
  if (/\b(full stack|fullstack|full-stack)\b/i.test(lowerTitle)) topics.push('Full Stack')
  if (/\b(mobile|android|ios|react native)\b/i.test(lowerTitle)) topics.push('Mobile Development')
  if (/\b(machine learning|ml|ai|artificial intelligence)\b/i.test(lowerTitle)) topics.push('Machine Learning')
  if (/\b(data science|data analysis|analytics)\b/i.test(lowerTitle)) topics.push('Data Science')
  if (/\b(game dev|game development|unity|unreal)\b/i.test(lowerTitle)) topics.push('Game Development')
  if (/\b(api|rest|restful|graphql)\b/i.test(lowerTitle)) topics.push('API')
  if (/\b(database|sql)\b/i.test(lowerTitle)) topics.push('Database')
  
  // Default fallback
  if (topics.length === 0) {
    if (/\b(programming|coding|developer|software)\b/i.test(lowerTitle)) {
      topics.push('Programming')
    } else {
      topics.push('Tutorial')
    }
  }
  
  // Remove duplicates and limit to 8 topics
  return [...new Set(topics)].slice(0, 8)
}