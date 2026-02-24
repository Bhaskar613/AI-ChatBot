require("dotenv").config();
const db = require("../db");
const fs = require("fs");
const path = require("path");

// Load docs once
const docsPath = path.join(__dirname, "../../docs.json");
const docs = JSON.parse(fs.readFileSync(docsPath, "utf-8"));

exports.chat = (req, res) => {
  const { sessionId, message } = req.body;

  if (!sessionId || !message) {
    return res.status(400).json({ error: "sessionId and message required" });
  }

  // Create session if not exists
  db.run(`INSERT OR IGNORE INTO sessions (id) VALUES (?)`, [sessionId]);

  // Fetch last 10 messages (5 pairs)
  db.all(
    `SELECT role, content FROM messages
     WHERE session_id = ?
     ORDER BY created_at DESC
     LIMIT 10`,
    [sessionId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "DB error" });

      const history = rows.reverse();

      // 🔎 Simple Document Matching Logic
      let reply = null;

      const lowerMessage = message.toLowerCase();

      for (let doc of docs) {
        if (
          lowerMessage.includes(doc.title.toLowerCase()) ||
          lowerMessage.includes("password") && doc.title.toLowerCase().includes("password") ||
          lowerMessage.includes("refund") && doc.title.toLowerCase().includes("refund")
        ) {
          reply = doc.content;
          break;
        }
      }

      if (!reply) {
        reply = "Sorry, I don’t have information about that.";
      }

      // Save user message
      db.run(
        `INSERT INTO messages (session_id, role, content) VALUES (?, ?, ?)`,
        [sessionId, "user", message]
      );

      // Save assistant reply
      db.run(
        `INSERT INTO messages (session_id, role, content) VALUES (?, ?, ?)`,
        [sessionId, "assistant", reply]
      );

      // Update session timestamp
      db.run(
        `UPDATE sessions SET updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        [sessionId]
      );

      res.json({ reply });
    }
  );
};

exports.getConversation = (req, res) => {
  db.all(
    `SELECT role, content, created_at
     FROM messages
     WHERE session_id = ?
     ORDER BY created_at ASC`,
    [req.params.sessionId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "DB error" });
      res.json(rows);
    }
  );
};

exports.getSessions = (req, res) => {
  db.all(
    `SELECT id, updated_at FROM sessions ORDER BY updated_at DESC`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "DB error" });
      res.json(rows);
    }
  );
};