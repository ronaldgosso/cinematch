// main.js
import { sendMessage } from "./server/api/calls.js";

const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const themeToggle = document.getElementById("theme-toggle");
const sendBtn = document.getElementById("send-btn");
const spinner = document.getElementById("loading-spinner");
const banner = document.getElementById("banner");
const year = document.getElementById("year");

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

// Simulated streaming (replace this with your real API stream-List)
async function streamBotResponse(chunks,chunkSize=5,delay=100) {
  const bubble = addMessageFromBot();
  let words = chunks.trim().split(/\s+/); // split clean by spaces
  let index = 0;
  let currentBuffer = "";

    function addNextWord(){
      if (index < words.length) {

        // Add next few words
        let chunk = words.slice(index, index + chunkSize).join(" ");
        index += chunkSize;
    
        currentBuffer += " " + chunk;
    
        // Convert accumulated text to markdown
        bubble.innerHTML = marked.parse(currentBuffer);
    
        // Scroll down like chat
        chatBox.scrollTop = chatBox.scrollHeight;

        setTimeout(addNextWord, delay);
        
      }
    }
    addNextWord();
}

// Handle chat submission
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = userInput.value.trim();
  if (!message) return;

  //hides banner
  banner.style.display = "none";
  year.textContent = new Date().getFullYear();

  // Add user bubble
  addMessageFromUser(message);

  // Clear input
  userInput.value = "";
  userInput.style.height = "auto";
  userInput.classList.remove("expanded");

  // Switch send button to loading
  sendBtn.classList.add("loading");
  userInput.disabled = true;

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
    if(!data.online){
      //force loading transformers
    }
    chatBox.lastChild.remove();
    await streamBotResponse(data.data,5,200); // simulate streaming by splitting into words

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
