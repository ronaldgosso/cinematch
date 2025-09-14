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
const modelID = "Qwen/Qwen3-Next-80B-A3B-Instruct";
// "openai/gpt-oss-20b";
const provider = "novita";
const christianGuardrail = `
You are a Christian assistant.
Only answer according to Christian faith, teachings of the Bible, and God-centered principles.
If a user asks for something outside Christianity, respond kindly but redirect back to Christian perspectives.
Do not produce content that contradicts Biblical principles.
`;

app.get("/", (req, res) => {
  res.json({ message: "Server is up & running 🚀" });
});

// console.log(chatCompletion.choices[0].message);

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ data:[],
    online:false,
    error: "No message provided" });

    let result;
    const code = res.status;
  try { 
// Hugging Face Inference API call
const chatCompletion = await hf.chatCompletion({
  provider: provider,
  model: modelID,
  max_tokens: 512,
  messages: [
    { role: "system", content: christianGuardrail },
      {
          role: "user",
          content: message,
      }  
  ],
});

  result = chatCompletion.choices[0].message.content|| "";
      res.json({ data: result ,online:true,error:""});    
  } catch (err) {
    if(code === 200){
       //force fallback
       res.json({ data: result ,online:false,error:"Quota exceeded / HF Did not respond"});
    }else{
      console.error("HF API failed, using fallback:", err);
      res.json({ data: result, online:false,error: err });
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
