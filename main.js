// main.js
import { sendMessage } from "./server/api/calls.js";

const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const themeToggle = document.getElementById("theme-toggle");
const sendBtn = document.getElementById("send-btn");
const spinner = document.getElementById("loading-spinner");

// Auto-expand textarea and adjust border radius
userInput.addEventListener("input", () => {
  userInput.style.height = "auto";
  userInput.style.height = userInput.scrollHeight + "px";

  if (userInput.scrollHeight > 40) {
    userInput.classList.add("expanded");
  } else {
    userInput.classList.remove("expanded");
  }
});

// Enter = submit, Shift+Enter = newline
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    chatForm.requestSubmit(); // correct submit trigger
  }
});

// Add a chat message to the chat box
function addMessage(sender, text) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `d-flex mb-3 ${
    sender === "user" ? "justify-content-end" : "justify-content-start"
  }`;

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

  // Add user bubble
  addMessage("user", message);

  // Clear input
  userInput.value = "";
  userInput.style.height = "auto";
  userInput.classList.remove("expanded");

  // Switch send button to loading
  sendBtn.classList.add("loading");
  userInput.disabled = true;

  // Add temporary bot typing bubble
  const typingDiv = document.createElement("div");
  typingDiv.className = "d-flex mb-3 justify-content-start";

  const typingBubble = document.createElement("div");
  typingBubble.className = "chat-bubble bot";
  typingBubble.innerHTML = `
  <div class="typing-dots">
    <span></span><span></span><span></span>
  </div>
`;

  typingDiv.appendChild(typingBubble);
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {

    const data = await sendMessage(message);
    chatBox.lastChild.remove();
    console.log(data);
    addMessage("bot", data);

    // Reset UI state
    userInput.disabled = false;
    sendBtn.classList.remove("loading");

    // Simulated bot reply
    // setTimeout(() => {
    //   chatBox.lastChild.remove(); // remove "typing..."
    //   addMessage("bot", "This is a bot response 🙏");

    //   // Reset UI state
    //   userInput.disabled = false;
    //   sendBtn.classList.remove("loading");
    // }, 1500);
  } catch (err) {
    chatBox.lastChild.remove();
    addMessage("bot", "⚠️ Error generating response.");
    console.error(err);

    userInput.disabled = false;
    sendBtn.classList.remove("loading");
  }
});

// Theme toggle
themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    document.body.classList.remove("bg-dark", "text-light");
    document.body.classList.add("bg-light", "text-dark");
  } else {
    document.body.classList.remove("bg-light", "text-dark");
    document.body.classList.add("bg-dark", "text-light");
  }
});
