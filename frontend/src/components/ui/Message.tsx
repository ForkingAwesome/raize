export type Message = {
  message: string;
  self: boolean;
};

interface MessageProps {
  messages: Array<Message>;
}

const Messages = ({ messages }: MessageProps) => {
  return (
    <div className="flex flex-col gap-2 h-64 overflow-y-auto">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${msg.self ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-xs p-2 border border-black bg-white text-sm ${
              msg.self
                ? "rounded-tl-md rounded-tr-md rounded-bl-md"
                : "rounded-tl-md rounded-tr-md rounded-br-md"
            }`}
          >
            {msg.message}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
