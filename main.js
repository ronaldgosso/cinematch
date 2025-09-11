// main.js

const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const themeToggle = document.getElementById("theme-toggle");

// Add a chat message to the chat box
function addMessage(sender, text) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `d-flex mb-3 ${sender === "user" ? "justify-content-end" : "justify-content-start"}`;

  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${sender}`;
  bubble.innerHTML = text;

  msgDiv.appendChild(bubble);
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Handle chat submission
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  addMessage("user", message);
  userInput.value = "";

  addMessage("bot", "<i>Generating...</i>");

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: message })
    });
    const data = await res.json();

    chatBox.lastChild.remove(); // Remove loading
    addMessage("bot", data.response);
  } catch (err) {
    chatBox.lastChild.remove();
    addMessage("bot", "⚠️ Error generating response.");
    console.error(err);
  }
});

// Theme toggle
themeToggle.addEventListener("change", () => {
  if(themeToggle.checked){
    document.body.classList.remove("bg-dark", "text-light");
    document.body.classList.add("bg-light", "text-dark");
  } else {
    document.body.classList.remove("bg-light", "text-dark");
    document.body.classList.add("bg-dark", "text-light");
  }
});
