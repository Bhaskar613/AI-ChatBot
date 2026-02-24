import { v4 as uuidv4 } from "uuid";

export const getOrCreateSession = () => {
  let sessionId = localStorage.getItem("sessionId");

  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem("sessionId", sessionId);
  }

  return sessionId;
};

export const createNewSession = () => {
  const newSession = uuidv4();
  localStorage.setItem("sessionId", newSession);
  return newSession;
};