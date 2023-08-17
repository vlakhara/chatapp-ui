import React, { useEffect, useRef, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState();
  const [messageList, setMessageList] = useState([]);
  const messsageRef = useRef();

  useEffect(() => {
    socket.on("message_received", (messageData) => {
      setMessageList((prevMessages) => [...prevMessages, messageData]);
    });
  }, [socket]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        message: currentMessage,
        author: username,
        room,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((prevMessages) => [...prevMessages, messageData]);
      messsageRef.current.value = "";
    }
  };
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageData) => (
            <div
              className="message"
              id={username === messageData.author ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{messageData.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageData.time}</p>
                  <p id="author">{messageData.author}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          className="text"
          ref={messsageRef}
          placeholder="Hey...."
          onChange={(event) => setCurrentMessage(event.target.value)}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
