import axios from "axios";

const BASE_URL = "https://ai-chatbot-backend-pss2.onrender.com/api";

export const sendMessageAPI = (sessionId, message) => {
  return axios.post(`${BASE_URL}/chat`, { sessionId, message });
};

export const fetchConversationAPI = (sessionId) => {
  return axios.get(`${BASE_URL}/conversations/${sessionId}`);
};