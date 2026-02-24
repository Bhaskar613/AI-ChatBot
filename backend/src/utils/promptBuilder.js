const fs = require("fs");

function buildPrompt(history, userMessage) {
  const docs = JSON.parse(fs.readFileSync("./docs.json", "utf-8"));

  const docsText = docs
    .map(d => `${d.title}: ${d.content}`)
    .join("\n");

  const historyText = history
    .map(m => `${m.role.toUpperCase()}: ${m.content}`)
    .join("\n");

  return `
You are a support assistant.

Answer ONLY from the documentation below.
If not found, reply exactly:
"Sorry, I don’t have information about that."

DOCUMENTATION:
${docsText}

CHAT HISTORY:
${historyText}

USER QUESTION:
${userMessage}
`;
}

module.exports = buildPrompt;