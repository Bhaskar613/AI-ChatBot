import React, { useState, useEffect } from "react";
import ChatWindow from "./components/ChatWindow";
import InputBox from "./components/InputBox";
import { sendMessageAPI, fetchConversationAPI } from "./services/api";
import { getOrCreateSession, createNewSession } from "./utils/session";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const session = getOrCreateSession();
    setSessionId(session);
    loadConversation(session);
  }, []);

  const loadConversation = async (session) => {
    try {
      const res = await fetchConversationAPI(session);
      setMessages(res.data);
    } catch (err) {
      console.error("Error loading conversation");
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
      created_at: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await sendMessageAPI(sessionId, input);

      const botMessage = {
        role: "assistant",
        content: res.data.reply,
        created_at: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      alert("Error sending message");
    }

    setInput("");
    setLoading(false);
  };

  const newChat = () => {
    const newSession = createNewSession();
    setSessionId(newSession);
    setMessages([]);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center">
      <div className="w-full max-w-2xl h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col p-6">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold text-gray-800">
            AI Support Assistant
          </h1>

          <button
            onClick={newChat}
            className="bg-gray-200 text-sm px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            New Chat
          </button>
        </div>

        <ChatWindow messages={messages} loading={loading} />

        <InputBox input={input} setInput={setInput} onSend={sendMessage} />
      </div>
    </div>
  );
}

export default App;