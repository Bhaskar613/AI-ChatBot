import React, { useEffect, useRef } from "react";
import Message from "./Message";

const ChatWindow = ({ messages, loading }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto p-5 bg-gray-50 rounded-xl shadow-inner">
      {messages.map((msg, index) => (
        <Message
          key={index}
          role={msg.role}
          content={msg.content}
          time={
            msg.created_at
              ? new Date(msg.created_at).toLocaleTimeString()
              : ""
          }
        />
      ))}

      {loading && (
        <div className="flex items-center gap-2 text-gray-500 text-sm animate-pulse">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
          Assistant typing...
        </div>
      )}

      <div ref={bottomRef}></div>
    </div>
  );
};

export default ChatWindow;