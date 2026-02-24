import axios from "axios";

const API = "https://ai-chatbot-backend-pss2.onrender.com";

export const sendMessageAPI = (sessionId, message) => {
  return axios.post(`${API}/chat`, { sessionId, message });
};

export const fetchConversationAPI = (sessionId) => {
  return axios.get(`${API}/conversations/${sessionId}`);
};