import React, { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { useSelector } from "react-redux";
import axios from "axios";
const NotificationCard = () => {


    const notify_list = useSelector((state) => {
        console.log(state.followSuggestion.notify_list)
        return state.followSuggestion.notify_list;
        
    });


    return (
        <div className="NotificationCard card-container">
            <h2>Notification</h2>
            <div className="coverBox">



                { notify_list.map((user, id) => {
                    return (
                        <div className="follower follow-container">
                            <div>

                                <div className="follower-username">
                                    <span >{user.content}</span>
                                </div>
                            </div>

                           
                        </div>
                    );
                })}
                 <button className="button request-button reject" onClick={() => {
                            }}>Clear</button>
            </div>
        </div>
    );


};

export default NotificationCard;
