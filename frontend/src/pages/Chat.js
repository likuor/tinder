import { List } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000"); 
const Chat = () => {
  const [room, setRoom] = useState("")
  const [list, setList] =useState([])
  const [join, setJoin] =useState(false)
  const messageRef = useRef()
  const handleSend = (e) => {
e.preventDefault();
    socket.emit("send_msg",{msg : messageRef.current.value})
  }
  const handleJoin = () => {
    if (join === false) {
      socket.emit("join_room", 1)
    } else {
      socket.on("disconnect");
    }
    setJoin(!join)
  }
  useEffect(() => {
    socket.on("recived_msg", (data) => {
      console.log("data",data);
      // setMessage([...message, data.msg]);
      setList([...list, data.msg])
    });
    socket.on("joined_room", (roomId) => {
      console.log(roomId);
      setRoom(roomId)
    })

  },[])
  return (
		<section>
      {join && <form onSubmit={handleSend}>
        <input type='text' placeholder='chat' ref={messageRef} />
        <button>send</button>
      </form>}
      <button onClick={handleJoin}>{join ? "leave" : "Join"}</button>
			<p> room {room}</p>
			{list.map((value, index) => {
				return <p key={index}>{value}</p>;
			})}
		</section>
	);
};

export default Chat;
