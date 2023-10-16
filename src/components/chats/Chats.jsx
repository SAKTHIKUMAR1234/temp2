import React, { useState } from "react";
import "./chats.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Followers } from "../../Data/FollowersData";
import { Modal, useMantineTheme } from "@mantine/core";
import { useSelector } from "react-redux";
import { Button } from "../Button/Button";

const Chats = ({chatpop,setChatPopup}) => {
  const theme = useMantineTheme();

  const recommended_Users = useSelector((state) => {
    return state.followSuggestion.user_suggestion;
  });

  const [sendingMessage,setSendMessage]=useState('')

  const sendMessage = (e)=>{
    setSendMessage(e.target.value)
  }

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
       
        opened={chatpop} // Use the prop here to control the modal visibility
      >
        <div className="FollowersCard1">
          <div className="heading"></div>
          <div className="chat-box">
            <div className="chat-left">
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
                    <input type="text" placeholder="search" />
                  </header>
                  <ul>
                    {recommended_Users.map((friends, id) => {
                      return (
                        <>
                          <li>
                            <img
                            src={"http://192.168.1.197:8080/"+(friends.userProfile ? friends.userProfile:"user.png")}  className="profile-image"
                              alt=""
                            />
                            <div>
                              <h2>{friends.userName}</h2>
                             
                            </div>
                          </li>
                        </>
                      );
                    })}
                  </ul>
                </aside>
                <main>
                  <header>
                    <img
                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg"
                      alt=""
                    />
                    <div>
                      <div className="arr">
                        <i class="fa-solid fa-arrow-left"></i>
                      </div>
                      <h2>Chat with Vincent Porter</h2>
                      <h3>already 1902 messages</h3>
                    </div>
                    <img
                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_star.png"
                      alt=""
                    />
                  </header>
                  <ul id="chat">
                    <li class="you">
                      <div class="entete">
                        <span class="status green"></span>
                        <h2>Vincent</h2>
                        <h3>10:12AM, Today</h3>
                      </div>
                      <div class="triangle"></div>
                      <div class="message">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit. Aenean commodo ligula eget dolor.""
                      </div>
                    </li>
                    <li class="me">
                      <div class="entete">
                        <h3>10:12AM, Today</h3>
                        <h2>Vincent</h2>
                        <span class="status blue"></span>
                      </div>
                      <div class="triangle"></div>
                      <div class="message">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit. Aenean commodo ligula eget dolor.
                        <div value={sendingMessage} onChange={sendMessage}>{sendingMessage}</div>
                      </div>
                    </li>
                  </ul>
                  <footer>
                    <textarea placeholder="Type your message"></textarea>
                   
                    <Button text="Send" className="button send-button" onChange={sendMessage}/>
                  </footer>
                </main>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Chats;
