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
function addMessageFromUser(text) {
  const msgDiv = document.createElement("div");
  msgDiv.className = "d-flex mb-3 justify-content-end";

  const bubble = document.createElement("div");
  bubble.className = `chat-bubble user`;
  bubble.innerHTML = text;

  msgDiv.appendChild(bubble);
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function addMessageFromBot() {
  const msgDiv = document.createElement("div");
  msgDiv.className = "d-flex mb-3 justify-content-start";

  const bubble = document.createElement("div");
  bubble.className = "chat-bubble bot";
  bubble.innerHTML = ""; // start empty

  msgDiv.appendChild(bubble);
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  return bubble; // return bubble so we can keep updating it
}

// // Token cleaner → returns plain text (1)
function cleanTokens(tokens) {
  let text = tokens.join("");

  // spacing rules
  text = text.replace(/\s+([.,!?;:])/g, "$1"); // remove space before punctuation
  text = text.replace(/([.,!?;:])([^\s])/g, "$1 $2"); // add space after punctuation
  text = text.replace(/\s+/g, " "); // collapse spaces

  return text.trim();
}

// // Convert into words (2)
function tokensToWords(tokens) {
  const sentence = cleanTokens(tokens);
  return sentence;
}

let version = 1;

// Simulated streaming (replace this with your real API stream-List)
async function streamBotResponse(chunks) {
  const bubble = addMessageFromBot();
  let tokens = [];
  let words;
  // let word = "";

  for (let i = 0; i < chunks.length; i++) {
    await new Promise((r) => setTimeout(r, 100));
    // word += chunks[i];
    // Check if word ends with a space or punctuation
    // if (/\s|[.,!?;:]/.test(chunks[i])) {
    //   outputElement.textContent += buffer;
    //   word = "";
    // }

    //collect raw token
    tokens.push(chunks[i]);
    //rebuild words
    words = tokensToWords(tokens);
    
    bubble.innerHTML = marked.parse(words); // append chunk
    chatBox.scrollTop = chatBox.scrollHeight; // keep scrolling
    await new Promise((r) => setTimeout(r, 100));
  }
  console.log(`File Version:- ${version}`);

}

// Handle chat submission
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = userInput.value.trim();
  if (!message) return;

  // Add user bubble
  addMessageFromUser(message);

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
    await streamBotResponse(data.result); // simulate streaming by splitting into words

    // Reset UI state
    userInput.disabled = false;
    sendBtn.classList.remove("loading");
  } catch (err) {
    chatBox.lastChild.remove();
    streamBotResponse(["⚠️", "Error", "generating", "response"]);
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
