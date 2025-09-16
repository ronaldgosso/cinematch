import express from "express";
import dotenv from "dotenv";
import { InferenceClient } from "@huggingface/inference";
import { pipeline } from '@huggingface/transformers';
import { globalVars } from "./tools/globals.js";

dotenv.config();

const app = express();
app.use(express.json());

// CORS for frontend
import cors from "cors";
app.use(cors());

const hf = new InferenceClient(process.env.HF_API_KEY);

//collect all errors (hf+transformers)
let errors = [];
//loading transformers
let pipe;

try {
  pipe = await pipeline('text-generation', globalVars.fallBackModel);
} catch (error) {
  errors.push({ tr: error });
}


app.get("/", (req, res) => {
  res.json({ message: "Server is up & running 🚀" });
});


app.post("/chat", async (req, res) => {
  const { message } = req.body;

  let result;
  const code = res.status;
  try {
    // Hugging Face Inference API call
    const chatCompletion = await hf.chatCompletion({
      provider: globalVars.modelProvider,
      model: globalVars.modelID,
      max_tokens: 512,
      messages: [
        { role: "system", content: globalVars.christianGuardrail },
        {
          role: "user",
          content: message,
        }
      ],
    });

    result = chatCompletion.choices[0].message.content || "";
    res.json({ data: result, online: true, error: errors, pipe: pipe });
  } catch (err) {
    if (code === 200) {
      //force fallback
      errors.push({ hf: "Quota exceeded / HF Did not respond" });
      res.json({ data: result, online: false, error: errors, pipe: pipe });
    } else {
      console.error("HF API failed, using fallback:", err);
      errors.push({ hf: err });
      res.json({ data: result, online: false, error: errors, pipe: pipe });
    }
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
