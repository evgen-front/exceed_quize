import { FC, useEffect, useRef, useState } from "react";
import io from "socket.io-client";

// const socket = io('http://localhost:8080');

export const ChatPage = () => {
  const connectSocket = () => {
    io("http://localhost:8080");
  };
  return (
    <div>
      <button onClick={connectSocket}>Connect</button>
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
