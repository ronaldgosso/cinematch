import express from "express";
import dotenv from "dotenv";
import { InferenceClient } from "@huggingface/inference";

dotenv.config();

const app = express();
app.use(express.json());

// CORS for frontend
import cors from "cors";
app.use(cors());

const hf = new InferenceClient(process.env.HF_API_KEY);
const modelID = "openai/gpt-oss-20b";

// Fallback model: small local model (optional, if transformers.js in Node)
async function localGenerate(prompt) {
  // For now, we simulate a fallback
  return `Fallback response for: "${prompt}" 🙏`;
}

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "No message provided" });

  try {
    let result = [];
    // Hugging Face Inference API call
    for await (const chunk of hf.chatCompletionStream({
      model: modelID,
      messages: [{ role: "user", content: message }],
      max_tokens: 512,
    })) {
      if(chunk.choices[0]!==undefined){
        result.push(chunk.choices[0].delta.content);
      }
    }    
    res.json({result} );
  } catch (err) {
    console.error("HF API failed, using fallback", err);
    const fallbackReply = await localGenerate(message);
    res.json({ reply: fallbackReply });
  }
});

const PORT = process.env.PORT || 5000;
try {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  process.on("uncaughtException", (err) => {
    console.error("An uncaught exception occurred:", err);
    process.exit(1);
  });
} catch (error) {
  console.log(error);
}
