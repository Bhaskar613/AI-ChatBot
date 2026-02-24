
const express = require("express");
const router = express.Router();
const {
  chat,
  getConversation,
  getSessions,
} = require("../controllers/chatController");

router.post("/chat", chat);
router.get("/conversations/:sessionId", getConversation);
router.get("/sessions", getSessions);

module.exports = router;