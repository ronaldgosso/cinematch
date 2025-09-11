export async function sendMessage(message) {
  try {
    const response = await fetch(`http://localhost:5000/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    console.log("API response data:", data);
    return data;
  } catch (err) {
    console.error("API call failed", err);
    return "⚠️ Error generating response.";
  }
}
