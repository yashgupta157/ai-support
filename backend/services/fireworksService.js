import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function askFireworks(prompt) {
  try {
    const response = await client.chat.completions.create({
      model: "tencent/hy3:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return response.choices[0].message.content;

  } catch (err) {
    console.error("OpenRouter Error:", err);
    throw err;
  }
}