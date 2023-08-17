import "./App.css";
import { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("https://chat-aap-backend.onrender.com");

function App() {
  const [username, setUsername] = useState();
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const RANDOM_ID_LENGTH = 8;

  const generateRandomId = () => {
    const STR =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let ID = "";
    for (let i = 0; i < RANDOM_ID_LENGTH; i++) {
      ID += STR.charAt(Math.floor(Math.random() * STR.length));
    }
    navigator.clipboard.writeText(ID);
    setRoom(ID);
    alert("ID copied to clipboard!!");
  };

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", { room, username });
      setShowChat(true);
    }
  };

  const handleValueChange = (setValue) => (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="App">
      {!showChat && (
        <div className="joinChatContainer">
          <h3>Join a chat</h3>
          <input
            type="text"
            placeholder="Name...."
            onChange={handleValueChange(setUsername)}
          />
          <input
            type="text"
            placeholder="Add room id or generate"
            value={room}
            onChange={handleValueChange(setRoom)}
          />
          <button onClick={generateRandomId}>Generate Random ID</button>
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      )}
      {showChat && <Chat socket={socket} username={username} room={room} />}
    </div>
  );
}

export default App;
