export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });
  try {
    const { category } = req.body;
    const valid = ['Fitness', 'Money', 'Confidence', 'Mindset'];
    if (!category || !valid.includes(category)) return res.status(400).json({ error: 'Invalid category' });
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514', max_tokens: 256,
        system: 'Respond ONLY with JSON: {"challenge":"text"}. 1-2 sentences, specific, doable in one day.',
        messages: [{ role: 'user', content: `Give me a unique ${category} challenge for today.` }]
      })
    });
    const data = await r.json();
    const parsed = JSON.parse(data.content.map(b => b.text || '').join('').replace(/```json|```/g, '').trim());
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ challenge: parsed.challenge });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
