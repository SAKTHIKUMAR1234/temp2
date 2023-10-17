import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./PostShare.css";
import { BsUpload } from "react-icons/bs";
import { Button } from "../Button/Button";
import { useSelector } from "react-redux";
import { showList } from "../../Reducers/interestListsSlice";
import { createPost } from "../../Reducers/postsSlice";

const PostShare = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showList());
  }, []);

  const user_data = useSelector((state) => {
    return state.userDetails.user_data;
  });

  const lists = useSelector((state) => {
    return state.list_interest.lists;
  });

  const [textValue, setTextValue] = useState('');
 

  const handleTextChange = (e) => {
    const value = e.target.value;
    setTextValue(value);
   

  };
  const [selectedImage, setSelectedImage] = useState(null);

  const onUploadFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(file);
      formData.set("file",file);
    }
  };

  const [schedule, setSchedule] = useState(getCurrentDateTime);
  function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const [clickedButtons, setClickedButtons] = useState([]);

  const handleButtonClick = (e, buttonId) => {
    e.preventDefault();
    if (clickedButtons.includes(buttonId)) {
      setClickedButtons(clickedButtons.filter((id) => id !== buttonId));
    } else {
      setClickedButtons([...clickedButtons, buttonId]);
    }
  };
  const [formData, setFormData] = useState(new FormData());
  





  function onPost(e) {
   e.preventDefault();
  const data_string = clickedButtons.join(",");
    formData.set("userId",user_data.userId);
    formData.set("interests",data_string);
    formData.set("scheduledTime",schedule.replace('T'," "));
    formData.set("description",textValue);
    dispatch(createPost(formData));
  }
  return (
    <div className="PostShare modal-container">
      <form action="">
        <h1>Share a Post</h1>
        <div className="description-input ">
          <img
            src={"http://192.168.1.197:8080/" + user_data.userProfile}
            className="profile-image"
            width="10px"
            alt=""
          />
          <textarea
            type="text"
            placeholder="Write Something You wish to post..."
             value={textValue}
            onChange={(e)=>{handleTextChange(e)}}
          />
        </div>
        <label htmlFor="postFile">
          <div
            className="post-option"
            onClick={(e) => document.getElementById("file-input").click()}
          >
            <h3 className="profileImage">Upload image/video to Post </h3>
            <BsUpload size={25} />
          </div>
        </label>
        <input
          type="file"
          name="postFile"
          className="postFile"
          id="file-input"
          accept="image/*,video/*"
          onChange={(e) => onUploadFile(e)}
          required
        />
        {selectedImage && (
          <div className="previewImage">
            <img src={selectedImage} alt="wrong format" />
          </div>
        )}

        <div className="tag-option">
          <h1 className="tag-head">Tags :</h1>

          <div className="tag-box">
            <div className="taginput-Buttons">
              {lists.map((tags, index) => {
                return (
                  <>
                    <Button
                      className="option-button tag-btn"
                      id={tags[1]}
                      key={index}
                      name={tags}
                      value={tags[1]}
                      text={tags[1]}
                      style={{
                        backgroundColor: clickedButtons.includes(index)
                          ? "var(--theme_color)"
                          : "white",
                        color: clickedButtons.includes(index)
                          ? "white"
                          : "var(--theme_color)",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleButtonClick(e, tags[1]);
                      }}
                    />
                  </>
                );
              })}
            </div>
          </div>
        </div>

        <div className="schedulepost">
          <h3>Schedule to Post :</h3>
          <input
            type="datetime-local"
            min={getCurrentDateTime()}
            onChange={(e) => {
              setSchedule(e.target.value);
              console.log(schedule);
            }}
          />
        </div>
        <div className="center">
          <Button
            className="post-Button button "
            text="Post"
            onClick={(e)=>{onPost(e)}}
          />
        </div>
      </form>
    </div>
  );
};

export default PostShare;