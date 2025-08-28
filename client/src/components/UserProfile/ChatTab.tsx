import { useState } from "react";
import { useContent } from "@/contexts/ContentContext";

export default function ChatTab() {
  const { currentUser, messages, sendMessage } = useContent();
  const [chatInput, setChatInput] = useState("");

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    sendMessage(chatInput);
    setChatInput("");
  };

  return (
    <div className="flex flex-col space-y-3">
      <div className="max-h-[300px] overflow-y-auto border rounded-lg p-3 space-y-2 bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-sm text-center">No messages yet</p>
        ) : (
          messages.map((msg: any, idx: number) => (
            <div
              key={idx}
              className={`p-2 rounded-lg ${
                msg.from === currentUser?.email
                  ? "bg-blue-100 text-blue-800 self-end"
                  : "bg-gray-100 text-gray-800 self-start"
              } max-w-xs`}
            >
              <p className="text-sm">{msg.text}</p>
              <span className="text-xs text-gray-400">{new Date(msg.date).toLocaleTimeString()}</span>
            </div>
          ))
        )}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
}
