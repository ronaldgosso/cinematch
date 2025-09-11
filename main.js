// main.js

const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const themeToggle = document.getElementById("theme-toggle");
const sendBtn = document.getElementById("send-btn");
const sendText = document.getElementById("send-text");
const spinner = document.getElementById("loading-spinner");


// Auto-expand textarea on input
userInput.addEventListener("input", () => {
  userInput.style.height = "auto";
  userInput.style.height = userInput.scrollHeight + "px";
});

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

    // Disable input + show loading spinner
  userInput.disabled = true;
  sendText.classList.add("d-none");
  spinner.classList.remove("d-none");


  const message = userInput.value.trim();
  if (!message) return;

  addMessage("user", message);
  userInput.value = "";

  addMessage("bot", "<i>Generating...</i>");

//   try {
//     const res = await fetch("/api/generate", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ prompt: message })
//     });
//     const data = await res.json();

//     chatBox.lastChild.remove(); // Remove loading
//     addMessage("bot", data.response);
//   } catch (err) {
//     chatBox.lastChild.remove();
//     addMessage("bot", "⚠️ Error generating response.");
//     console.error(err);
//   }

    // Simulate bot reply (replace with API call later)
    setTimeout(() => {
      addMessage("This is a bot response 🙏", "bot");

      // Reset button + input
      userInput.value = "";
      userInput.style.height = "auto";
      userInput.disabled = false;
      sendText.classList.remove("d-none");
      spinner.classList.add("d-none");
    }, 1500);

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
