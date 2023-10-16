import React, { useState, useRef } from "react";
import ProfileImage from "../../img/profilepic.png";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
// import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import {IoMdArrowRoundBack} from "react-icons/io";
import { Button } from "../Button/Button";
import { BsFillTagsFill } from "react-icons/bs";
// // import TrendCard from '../TrendCard/TrendCard'
// import ShareModal from "../ShareModal/ShareModal";

const PostShare = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const [popup, setPopup] = useState(false);
  const [tagList, setTagList] = useState([]);

  const [modalOpened, setModalOpened] = useState(false);

  const handleclickopen = () => {
    setPopup(!popup);
  };
  const closepopup = () => {
    setPopup(false);
  };
  const [data, setData] = useState({
    date: "",
  });
  const { date } = data;
  const onChange = (e) => {
    setData(e.target.value);
  };
  const clickSubmit = (e) => {
    console.log(data);
  };
  const [content, setContent] = useState({
    cont: "",
  });
  const { cont } = content;
  const onChangeContent = (e) => {
    e.preventDefault();
    setContent({ ...content, [e.target.name]: [e.target.value] });
  };
  const whatHappen = (e) => {
    e.preventDefault();
    console.log(content);
  };
  const [tappopup, setTag] = useState(false);
  const tagHandlePopUp = () => {
    setTag(!tappopup);
  };
  const tapPopClose = () => {
    setTag(false);
  };

  const [inputTags, setInputTags] = useState([
    'homaker', 'development', 'coding', 'cooking', 'writing', 'investing', 'reading','gaming'
  ]);
  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setInputTags([...inputTags, value]);
    console.log(inputTags);
  };

  // const removeTag = (index) => {
  //   setInputTags(inputTags.filter((el, i) => i !== index))

  // }
  const [color, setColor] = useState("grey");

  const colorHandle = (e) => {
    if (tagList.indexOf(e) === -1) {
      document.querySelector("#" + e).classList.remove("tag-item-grey");
      document.querySelector("#" + e).classList.add("tag-item-green");
      tagList.push(e);
      console.log(e);
    } else {
      document.querySelector("#" + e).classList.remove("tag-item-green");
      document.querySelector("#" + e).classList.add("tag-item-grey");
      tagList.splice(tagList.indexOf(e), 1);
    }
  };

  const [sharePost, setSharepost] = useState(false);
  const postHandle = () => {
    setSharepost(!sharePost);
  };
  const closeSharePost = () => {
    setSharepost(false);
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };
  return (
    <div className="PostShare">
      <button className="postbutton" onClick={postHandle}>
        Share a post...!
      </button>
      <div>
        <div>
          {sharePost ? (
            <div className="MainsharePosting">
              <div className="sharePost">
                <div className="fullSharepost">
                  <div className="headingPost">
                    <div className="head-bar">
                      <h1 className="heading" onClick={closeSharePost} >
                        <IoMdArrowRoundBack></IoMdArrowRoundBack>
                      </h1>
                      <h1 className="heading">Share a Post</h1>
                    </div>
                    <div className="description-input">
                      <img src={ProfileImage} className="profileImage" width="10px" alt="" />
                      <input
                        type="text"
                        placeholder="What's happening"
                        name="cont"
                        value={cont}
                        className="whatHappening"
                        onChange={onChangeContent}
                      />
                    </div>
                  </div>
                  <div className="postOptions">
                    <div
                      className="option"
                      style={{ color: "var(--photo)" }}
                      onClick={() => imageRef.current.click()}
                    >
                      <h1 className="profileImage">Profile image :</h1>
                      <input
                        type="file"
                        name="chooseProfilepic"
                        className="postFile"
                      />
                    </div>
                    <div className="option1" style={{ color: "var(--video)" }}>
                      <div>
                          <div className="mainpopup-tag">
                            <div className="tagPop-up">
                              <div className="tag-header">
                                <h1 className="tags-h1">Tags</h1>
                              </div>
                            </div>
                            <div className="tag-inputContainer">
                                {inputTags.map((tags, index) => {
                                  return (
                                    <button
                                      className="tag-item-grey"
                                      id={tags}
                                      key={index}
                                      name={tags}
                                      value={index}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        colorHandle(tags);
                                      }}
                                      style={{ backgroundColor: color }}
                                    >
                                      <span className="text-items">{tags}</span>
                                      <span className="close">+</span>
                                    </button>
                                  );
                                })}
                              </div>
                          </div>
                          <div className="schedulepost">
                            <h1>schedulePost</h1>
                            <input type="datetime-local"/>
                          </div>
                          <button className="postingButton">post</button>
                      </div>
                    </div>
                
                
              
                    {/* <Button
                      className="submitButton"
                      onClick={whatHappen}
                      text="Submit"
                    ></Button> */}
             
                  </div>
                  {/* {image && (
                    <div className="previewImage">
                      <UilTimes onClick={() => setImage(null)} />
                      <img src={image.image} alt="" />
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default PostShare;