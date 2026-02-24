import axios from "axios";

const API = "http://localhost:5000/api";

export const sendMessageAPI = (sessionId, message) => {
  return axios.post(`${API}/chat`, { sessionId, message });
};

export const fetchConversationAPI = (sessionId) => {
  return axios.get(`${API}/conversations/${sessionId}`);
};