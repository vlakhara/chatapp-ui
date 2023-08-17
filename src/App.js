import "./App.css";
import { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://192.168.1.81:3001");

function App() {
  const [username, setUsername] = useState();
  const [room, setRoom] = useState();
  const [showChat, setShowChat] = useState(false);

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
            placeholder="Hehe...."
            onChange={handleValueChange(setUsername)}
          />
          <input
            type="text"
            placeholder="Room ID...."
            onChange={handleValueChange(setRoom)}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      )}
      {showChat && <Chat socket={socket} username={username} room={room} />}
    </div>
  );
}

export default App;
