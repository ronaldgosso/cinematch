import dotenv from "dotenv";

dotenv.config();

export async function sendMessage(message) {
  try {
    const response = await fetch(`${process.env.LOCALHOST}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    return data.reply;
  } catch (err) {
    console.error("API call failed", err);
    return "⚠️ Error generating response.";
  }
}
