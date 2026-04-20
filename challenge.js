export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Basic rate limiting via a simple check on origin
  const origin = req.headers.origin || '';
  const allowed = process.env.ALLOWED_ORIGIN || '';
  if (allowed && origin !== allowed) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { category } = req.body;
    if (!category || typeof category !== 'string') {
      return res.status(400).json({ error: 'Invalid request: category required' });
    }

    // Whitelist categories so users can't inject arbitrary prompts
    const validCategories = ['Fitness', 'Money', 'Confidence', 'Mindset'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 256,
        system: 'You generate short, actionable daily challenges. Respond ONLY with a JSON object, no markdown, no extra text. Format: {"challenge":"the challenge text"}. The challenge must be 1-2 sentences, specific, doable in one day, and motivating.',
        messages: [
          { role: 'user', content: `Give me a unique ${category} challenge for today. Make it specific and fresh.` }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Anthropic error:', err);
      return res.status(502).json({ error: 'Upstream API error' });
    }

    const data = await response.json();
    const text = data.content.map(b => b.text || '').join('');
    const parsed = JSON.parse(text.replace(/```json|```/g, '').trim());

    // Set CORS header so the browser app can call this
    res.setHeader('Access-Control-Allow-Origin', allowed || '*');
    return res.status(200).json({ challenge: parsed.challenge });

  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
