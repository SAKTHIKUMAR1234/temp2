import React, { useState } from "react";
import "./FollowersCard.css";
import { Button } from "../Button/Button";
import { useSelector } from "react-redux";
const FollowersCard = () => {
  const recommended_Users = useSelector((state) => {
    return state.followSuggestion.user_suggestion;
  });

  const currentUser =JSON.parse(sessionStorage.getItem("userId"))
  const [isDisabled,setDisabled] = useState(true)


  const makeFollowRequest=(currentUserId,targetUserId)=>{
    console.log(currentUserId,targetUserId)
  }

  return (
    <div className="FollowersCard card-container">
      <h2>Recommendations for You...</h2>
      <div className="coverBox">
      
         
         
      {recommended_Users.map((recommended, id) => {
        return (
          <div className="follower follow-container" id={recommended.userId}>
            <div>
              <img
                src={"http://192.168.1.197:8080/"+(recommended.userProfile ? recommended.userProfile:"user.png")}
                alt="alt-text"
                className="profile-image"
              />
              <div className="follower-username">
                <span >@ {recommended.userName}</span>
              </div>
            </div>
            <Button className="button follow-button" text="Follow" onClick={makeFollowRequest(currentUser,recommended.userId)} disabled={isDisabled}/>
          </div>
        );
      })}
    </div>
    </div>
  );

 
};

export default FollowersCard;
