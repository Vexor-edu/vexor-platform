// 📁 pages/api/chatbot.js

export default async function handler(req, res) {
  const { prompt } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API Key غير متوفر' });
  }

  try {
    const completion = await fetch('https://api.openai.com/v1/chat/completions',  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 200,
      }),
    });

    const data = await completion.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    res.status(200).json({ reply: data.choices[0].message.content });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'حدث خطأ في المعالجة' });
  }
}