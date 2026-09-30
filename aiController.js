async function gemini(prompt) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing in .env");
  }

  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || "Gemini API request failed");
  }

  return data.candidates?.[0]?.content?.parts?.map(p => p.text).join("") || "";
}

exports.generateBlog = async (req, res, next) => {
  try {
    const { topic, tone = "professional", audience = "general" } = req.body;
    if (!topic) return res.status(400).json({ success: false, message: "Topic is required" });

    const prompt = `Create a high-quality structured blog post about "${topic}".
Tone: ${tone}. Audience: ${audience}.
Return a title, introduction, clear headings, useful body content and conclusion.
Do not include markdown code.`;

    const content = await gemini(prompt);
    res.json({ success: true, topic, content });
  } catch (err) { next(err); }
};

exports.summarize = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ success: false, message: "Text is required" });

    const summary = await gemini(
      `Summarize the following blog content in 5 concise bullet points and then give a 2-sentence abstract:\n\n${text}`
    );

    res.json({ success: true, summary });
  } catch (err) { next(err); }
};
