import { Modal, useMantineTheme } from "@mantine/core";
import { Button } from "../Button/Button";
import React, { useState, useEffect } from "react";
import axios from "axios";
import './ProfileModal.css'

function ProfileModal({ modalOpened, setModalOpened, old_data }) {
  const theme = useMantineTheme();
  const [firstName, setFirstName] = useState(old_data.firstName);
  const [lastName, setLastName] = useState(old_data.lastName);
  const [phNo, setPhNo] = useState(old_data.phNo);
  const [dateOfBirth, setDateOfBirth] = useState(old_data.dateOfBirth);



  useEffect(() => {
    if (modalOpened) {
      setFirstName(old_data.firstName);
      setLastName(old_data.lastName);
      setPhNo(old_data.phNo);
      setDateOfBirth(old_data.dateOfBirth);
    }
  }, [modalOpened, old_data]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();


  };

  return (

    <div className="editmodel">
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        size="55%"
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      >
        <form className="infoForm" onSubmit={handleFormSubmit}>
          <h3>Your info</h3>
          <div>
            <input
              type="text"
              className="infoInput"
              value={old_data.userName}
              readOnly 
            />
          </div>

          <div>
            <input
              type="text"
              className="infoInput"
              name="FirstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              type="text"
              className="infoInput"
              name="LastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <input
              type="number"
              className="infoInput"
              name="worksAT"
              value={phNo}
              onChange={(e) => setPhNo(e.target.value)}
            />
          </div>

          <div>
            <input
              type="date"
              className="infoInput"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>

          <div>
            Profile Image
            <input type="file" name="profileImg" className="infoInput" />
          </div>

          <Button className="button infoButton" text="Update" type="submit" />
        </form>
      </Modal>
    </div>
  );
}

export default ProfileModal;