import React from "react";
import "./RequestsCard.css";
import { Button } from "../Button/Button";
import { useSelector } from "react-redux";
const RequestsCard = () => {
  const recommended_Users = useSelector((state) => {
    return state.followSuggestion.user_suggestion;
  });
//   const recommended_Users = useSelector((state) => {
//     return state.followSuggestion.requested_user;
//   });
  return (
    <div className="RequestsCard card-container">
      <h2>Recommendations for You...</h2>
      <div className="coverBox">
      
         
         
      {recommended_Users.map((recommended, id) => {
        return (
          <div className="follower follow-container">
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
            <div className="">
            <Button className="button request-button accept" text="Accept" />
            <Button className="button request-button reject" text="Request" />
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );

 
};

export default RequestsCard;
