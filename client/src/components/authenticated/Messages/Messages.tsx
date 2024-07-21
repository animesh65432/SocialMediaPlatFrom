import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  Avatar,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import useGetallfriend from "../../../hooks/useGetallfriend";
import useSentThemessage from "../../../hooks/useSentThemessage";
import { io } from "socket.io-client";
import { backendurl } from "../../../utils";

type Data = {
  Id: number;
  message: string;
};

const Messages: React.FC = () => {
  const friends = useSelector((state: RootState) => state.Friend.fiends);
  const token = useSelector((state: RootState) => state.user.idtoken);
  const [selectedFriend, setSelectedFriend] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const { getfriends } = useGetallfriend();
  const [loading, sentthemessage] = useSentThemessage();
  const [sent, setsent] = useState<boolean>(false);
  const [messages, setMessages] = useState<any[]>([]); // Adjust type as needed
  const handleSendMessage = async (data: Data) => {
    if (message.trim() === "") return;
    try {
      await sentthemessage(data);
      setMessage("");
      setsent((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getfriends();
    console.log("clicke the useeefect")
    const socket = io(backendurl, { withCredentials: true });

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.emit("Getmessage", token);

    socket.on("messages", (newMessages) => {
      console.log(newMessages);
      setMessages(newMessages);
    });

    return () => {
      socket.disconnect();
    };
  },[sent]);

  const handleSelectFriend = (friendId: number) => {
    setSelectedFriend(friendId);
  };

  console.log(messages )

  if (friends.length === 0) {
    return <div>bye</div>;
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/3 border-r border-gray-300 p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Friends</h2>
        <List>
          {friends.map((friend) => (
            <ListItem
              button
              key={friend.Id}
              onClick={() => handleSelectFriend(friend.Id)}
              className={`flex items-center ${
                selectedFriend === friend.Id ? "bg-gray-200" : ""
              }`}
            >
              <Avatar
                src={friend.PhotoUrl}
                alt={friend.Name}
                className="mr-4"
              />
              <ListItemText primary={friend.Name} />
            </ListItem>
          ))}
        </List>
      </div>

      <div className="w-2/3 p-4 flex flex-col">
        {selectedFriend ? (
          <>
            <div className="flex-1 overflow-y-auto p-4 border border-gray-300 rounded-lg bg-gray-50">
              <div>
                <div className="text-center text-gray-500">
                  Conversation with {selectedFriend}
                </div>
                {/* Display messages here */}
                <div>
                  {messages.map((msg, index) => (
                    <div key={index}>{msg.message}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <IconButton
                color="primary"
                onClick={() =>
                  handleSendMessage({ Id: selectedFriend || 0, message })
                }
                className="ml-2"
              >
                <SendIcon />
              </IconButton>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">
            Select a friend to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
