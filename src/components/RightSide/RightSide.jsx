import React, { useState } from "react";
import "./RightSide.css";

import { GrEdit } from "react-icons/gr";
import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModal/ShareModal";
import Chats from "../chats/Chats";
import { GrSettingsOption, GrChat, GrNotification } from "react-icons/gr";
import { useSelector } from "react-redux";
import { Button } from "../Button/Button";
import SettingsModal from "../SettingsModal.jsx/SettingsModal";
import RequestsCard from "../RequestsCard/RequestsCard";
import NotificationCard from "../NotificationCard/NotificationCard";

const RightSide = () => {
  const user_data = useSelector((state) => {
    return state.userDetails.user_data;
  });

  let flag = false;
  if (user_data.accountType === "Private") {
    flag = true;
  }

  const [modalOpened, setModalOpened] = useState(false);
  const [chatpop, setChatPopup] = useState(false);
  const chatpopUp = () => {
    console.log("object");

    console.log(chatpop);
    setChatPopup(!chatpop);
  };
  const closeChats = () => {
    setChatPopup(false);
  };
  const [settingPop, setSetting] = useState(false);
  const openModal=()=>{
    setModalOpened(true);
  }
  const setPopup = (e) => {
    e.preventDefault();
    setSetting(!settingPop);
  };
  const closeSetting = () => {
    setSetting(false);
  };

  let clickedEdit = false;

  return (
    <div className="RightSide card-container">
      <div className="navIcons ">
        <Button
          text="Chats"
          className="option-button button"
          onClick={chatpopUp}
          icon={<GrChat size={25} />}
        />
        <Button
          text="Notification"
          className="option-button button"
          icon={<GrNotification size={25} />}
        />
        <Button
          text="Settings"
          className="button option-button"
          onClick={openModal}
          icon={<GrSettingsOption size={25} />}
        />
 <SettingsModal
            old_data={user_data}
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
          />
        {settingPop ? (
          <div className="mainsetting">
            <div className="settingpopup">
              <div className="settinghead">
                <h2>Settings</h2>
                <h1 className="closeSetting" onClick={{closeSetting}}>
                  X
                </h1>
              </div>
              <div className=" radio-group">
                <input
                  type="radio"
                  id="check"
                  name="check"
                  value="Private"
                  checked={flag}
                />
                <label for="check">Private</label>
                <input
                  type="radio"
                  id="check"
                  name="check"
                  value="Public"
                  checked={!flag}
                />
                <label for="check">Public</label>
                `<Button
                  icon={<GrEdit />}
                  size={20}
                  className={"button"}
                  onClick={() => {
                    clickedEdit = false;
                  }}
                />`
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        
      </div>
      {chatpop ? (
          <div className="mainchats">
            <div className="chatpopup">
              <Chats chatpop={chatpop} setChatPopup={chatpopUp} />

              <div></div>
            </div>
          </div>
        ) : (
          ""
        )}
      <RequestsCard />
      <div></div>
<NotificationCard />
      <Button
        text="Share"
        className="button r-button"
        onClick={() => setModalOpened(true)}
      />

      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
