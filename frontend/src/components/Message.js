import React from "react";

const Message = ({ role, content, time }) => {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl shadow-md text-sm ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        <div>{content}</div>
        {time && (
          <div className="text-[10px] mt-1 opacity-70 text-right">
            {time}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;