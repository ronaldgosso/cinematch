export async function sendMessage(message) {
  try {
    const response = await fetch(`https://christian-response-ai.onrender.com/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    console.log("API response data:", data.result);
    return data;
  } catch (err) {
    console.error("API call failed", err);
    return "⚠️ Error generating response.";
  }
}
