import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Kein Prompt übergeben." });

  const response = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "Du bist ein Social-Media-Bio-Generator." },
      { role: "user", content: `Schreibe 3 kreative Social-Media-Bios für: ${prompt}` },
    ],
    model: "gpt-4",
  });

  const text = response.choices[0].message.content || "";
  const bios = text.split("\n").filter((line) => line.trim()).map((b) => b.replace(/^\d+\.\s*/, ""));
  res.json({ bios });
}