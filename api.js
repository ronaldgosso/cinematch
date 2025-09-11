import express from "express";
import dotenv from "dotenv";
import { HfInference } from "@huggingface/inference";

dotenv.config();

const app = express();
app.use(express.json());

// CORS for frontend
import cors from "cors";
app.use(cors());

const hf = new HfInference(process.env.HF_API_KEY);

// Fallback model: small local model (optional, if transformers.js in Node)
async function localGenerate(prompt) {
  // For now, we simulate a fallback
  return `Fallback response for: "${prompt}" 🙏`;
}

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "No message provided" });

  try {
    // Hugging Face Inference API call
    const response = await hf.textGeneration({
      model: "gpt2", // change to your preferred HF model
      inputs: message,
      parameters: { max_new_tokens: 100 }
    });

    let reply = response?.[0]?.generated_text || "";

    // Remove original prompt from generated text
    if (reply.startsWith(message)) reply = reply.slice(message.length).trim();

    res.json({ reply });
  } catch (err) {
    console.error("HF API failed, using fallback", err);
    const fallbackReply = await localGenerate(message);
    res.json({ reply: fallbackReply });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
