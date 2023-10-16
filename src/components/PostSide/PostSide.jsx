import React from "react";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";
import ProfileCard from "../ProfileCard/ProfileCard";

import "./PostSide.css";
const PostSide = () => {
  return (
    <div className="PostSide card-container ">
      <ProfileCard />
      <PostShare />
      <Posts />
    </div>
  );
};

export default PostSide;
