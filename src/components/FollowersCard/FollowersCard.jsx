import React, { useState } from "react";
import "./FollowersCard.css";
import { Button } from "../Button/Button";
import { useSelector } from "react-redux";
import axios from "axios";
const FollowersCard = () => {
  const recommended_Users = useSelector((state) => {
    return state.followSuggestion.user_suggestion;
  });

  const currentUser = JSON.parse(sessionStorage.getItem("userId"))
  const [isDisabled, setDisabled] = useState(true)


  const makeFollowRequest =async (currentUserId, targetUserId,id) => {
    const data = {
      "sender": {
        "userId": currentUserId
      },
      "receiver": {
        "userId": targetUserId
      }
    }
    try {
      const response=await axios.post('http://192.168.1.197:8080/api/v1/request/followRequest',data);
      alert("Follow Request Sent Successfully")
      console.log(response)
      window.location.reload(false);
      // recommended_Users.splice(id,1)
    } catch (error) {
      console.log(error)
    }
    

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
                  src={"http://192.168.1.197:8080/" + (recommended.userProfile ? recommended.userProfile : "user.png")}
                  alt="alt-text"
                  className="profile-image"
                />
                <div className="follower-username">
                  <span >@ {recommended.userName}</span>
                </div>
              </div>
              <button className="button follow-button" onClick={() => makeFollowRequest(currentUser, recommended.userId,id)} isDisabled={isDisabled}>Follow</button>
            </div>
          );
        })}
      </div>
    </div>
  );


};

export default FollowersCard;
