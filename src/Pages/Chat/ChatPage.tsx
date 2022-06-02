import { SocketAddress } from "net";
import { FC, useEffect, useRef, useState } from "react";
import io from "socket.io-client";

let socket: any = null;

export const ChatPage = () => {
  const [activeSession, setActiveSession] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  // const [userName, setUserName] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  socket &&
    socket.on("chat_message", (data: string) => {
      setMessages([...messages, data]);
    });

  const connect = () => {
    socket = io("ws://localhost:8000/chat");

    //@ts-ignore
    socket.on("connect", () => {
      setActiveSession(socket.id);
      alert("Подключение установлено");
    });
  };

  const sendMessage = () => {
    socket.emit("chat_message", inputValue);
    setInputValue("");
  };

  return (
    <div>
      {activeSession ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={sendMessage}>Send message</button>
          </div>
          <div>
            {messages.map((item) => (
              <div
                style={{
                  padding: "5px",
                  border: "1px solid #000",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  width: "100%",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          /> */}
          <button onClick={connect}>Connect</button>
        </div>
      )}
    </div>
  );
};

// export interface ChatMessage {
//   message?: string;
//   event: string;
//   id: string;
// }

// const socket = new WebSocket("ws://localhost:8000/");

// export const ChatPage = () => {
//   return (
//     <div>
//       <Chat />
//     </div>
//   );
// };

// const Chat: FC = () => {
//   // const [connection, setConnection] = useState<boolean>(false);
//   const [messageList, setMessageList] = useState<ChatMessage[]>([]);

//   const connect = () => {
//     console.log("connect");
//     socket.onopen = () => {
//       // setConnection(true);
//       const message = {
//         event: "connection",
//         id: Date.now(),
//       };

//       socket.send(JSON.stringify(message));
//       console.log("websocket open");
//     };

//     socket.onclose = () => {
//       console.log("websocket close");
//     };

//     socket.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       setMessageList((prev) => [...prev, message]);
//       console.log("websocket message");
//     };

//     socket.onerror = () => {
//       console.log("websocket error");
//     };
//   };

//   return (
//     <div style={{ padding: "10px" }}>
//       <Messages messageList={messageList} />
//       <AddMessageForm connect={connect} />
//     </div>
//   );
// };

// const Messages: FC<{ messageList: ChatMessage[] }> = ({ messageList }) => {
//   return (
//     <div style={{ minHeight: "200px", overflowY: "auto" }}>
//       {messageList.length ? (
//         messageList.map((m, i) => <Message key={i} message={m} />)
//       ) : (
//         <p>Переписка пуста</p>
//       )}
//     </div>
//   );
// };

// const Message: FC<{ message: ChatMessage }> = ({ message }) => {
//   return (
//     <div style={{ padding: "10px" }}>
//       {message.message}
//       <hr />
//     </div>
//   );
// };

// const AddMessageForm: FC<{ connect: () => void }> = ({ connect }) => {
//   const [textareaValue, setTextareaValue] = useState<string>("");

//   return (
//     <div>
//       <textarea
//         value={textareaValue}
//         onChange={(e) => setTextareaValue(e.target.value)}
//       ></textarea>
//       <div>
//         <button onClick={connect}>Send message</button>
//       </div>
//     </div>
//   );
// };
