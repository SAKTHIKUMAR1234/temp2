import React, { useState, useEffect } from "react";
import "./chats.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Modal, useMantineTheme } from "@mantine/core";
import axios from "axios";

const Chats = ({ chatpop, setChatPopup }) => {
  const theme = useMantineTheme();

  const userId = JSON.parse(sessionStorage.getItem('userId'))

  const [chats, setChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setSearchResults([]);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      try {
        const response = await axios.get(`http://192.168.1.197:8080/api/v1/userdetails/searchUser/${searchQuery}`,{
          headers:{
            "Authorization":"Bearer "+JSON.parse(sessionStorage.getItem("AuthHead")).Authorization
          }
        }
        );
        setSearchResults(response.data.body);
      } catch (error) {
        console.error("Error searching for users:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`http://192.168.1.197:8080/api/v1/message/getChatList/${userId}`,{
          headers:{
            "Authorization":"Bearer "+JSON.parse(sessionStorage.getItem("AuthHead")).Authorization
          }
        });
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);

  useEffect(() => {
    let intervalId;

    const data = {
      "user1": userId,
      "user2": selectedUser
    }
    const fetchMessages = async () => {
      if (selectedUser) {
        try {
          const response = await axios.get(
            `https://api.example.com/messages/${selectedUser.id}`
          );
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    const startPolling = () => {
      fetchMessages();
      intervalId = setInterval(() => {
        fetchMessages();
      }, 5000);
    };

    const stopPolling = () => {
      clearInterval(intervalId);
    };

    if (selectedUser) {
      startPolling();
    } else {
      stopPolling();
    }

    return stopPolling;
  }, [selectedUser]);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: "me" }]);
      setNewMessage("");
    }
  };

  return (
    <>
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        withCloseButton={false}
        overlayOpacity={0.55}
        overlayBlur={3}
        padding="0%"
        opened={chatpop}
      >
        <div className="FollowersCard1">
          <div className="heading"></div>
          <div className="chat-box">
            <div id="container">
              <aside>
                <header>
                  <div className="back-btn">
                    <IoMdArrowRoundBack
                      size={30}
                      color="white"
                      onClick={setChatPopup}
                    ></IoMdArrowRoundBack>
                  </div>
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value) }}
                  />
                  <button className="button" onClick={handleSearch}>Search</button>
                </header>
                <ul>
                  {!searchQuery ? (
                    chats.map((user) => (
                      <li key={user.user2.userId} onClick={() => handleUserClick(user.user2.userId)}>
                        <img
                          src={user.userProfile}
                          className="profile-image"
                          alt=""
                        />
                        <div>
                          <h2>{user.user2.userName}</h2>
                        </div>
                      </li>
                    ))
                  ) : (
                    searchResults.map((user) => (
                      <li key={user.userId} onClick={() => handleUserClick(user.userId)}>
                        <img
                          src={user.profileImage}
                          className="profile-image"
                          alt=""
                        />
                        <div>
                          <h2>{user.userName}</h2>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </aside>
              <main>
                {selectedUser ? (
                  <header>
                    {/* Render the user's information here */}
                  </header>
                ) : (
                  <p className="chatbox">Select a user to start a chat.</p>
                )}
                <ul id="chat">
                  {selectedUser &&
                    messages.map((message, index) => (
                      <li key={index} className={message.sender}>
                        <div className="entete">
                          <span className="status green"></span>
                          <h2>{message.sender}</h2>
                        </div>
                        <div className="triangle"></div>
                        <div className="message">{message.text}</div>
                      </li>
                    ))}
                </ul>
                {selectedUser && (
                  <footer>
                    <textarea
                      placeholder="Type your message"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="chatbox"
                    />
                    <button className="button send-button" onClick={sendMessage}>
                      Send
                    </button>
                  </footer>
                )}
              </main>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Chats;
