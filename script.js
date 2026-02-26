const chat = document.getElementById("chat");
const input = document.getElementById("message");

let messages = [
  { role: "system", content: "너는 반말 쓰는 친근한 AI다." }
];

async function sendMessage() {

  const text = input.value;
  if (!text) return;

  addBubble(text, "user");

  messages.push({ role: "user", content: text });
  input.value = "";

  const res = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages })
  });

  const data = await res.json();
  const reply = data.choices[0].message.content;

  addBubble(reply, "ai");

  messages.push({ role: "assistant", content: reply });

  chat.scrollTop = chat.scrollHeight;
}

function addBubble(text, type) {
  const div = document.createElement("div");
  div.className = "bubble " + type;
  div.innerText = text;
  chat.appendChild(div);
}
