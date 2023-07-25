import React from "react";
import { User } from "../shared/types";

type Props = {
  user: User;
  viewThreadsFeed: boolean;
  setViewThreadsFeed: (value: boolean) => void;
};

const Header = ({user, viewThreadsFeed, setViewThreadsFeed}: Props) => {
  return (
    <header>
      <div className="info-container">
        <div className="user-info-container">
          <h1>{user.username}</h1>
          <p>
            {user.handle} <span className="threads-info">threads.net</span>
          </p>
        </div>
        <div className="img-container">
          <img src={user.img} alt="profile avatar" />
        </div>
      </div>
      <p>{user.bio}</p>
      <div className="sub-info-container">
        <p className="sub-text">
          {user.followers.length} followers • <a href={user.link}>{user.link.replace('https://', "")}</a>
        </p>
      </div>
      <button
        className="primary"
        onClick={() => navigator.clipboard.writeText("I am a URL")}
      >
        Share Profile
      </button>
      <div className="button-container">
        <button className={viewThreadsFeed ? "current" : ""} onClick={() => setViewThreadsFeed(true)}>Threads</button>
        <button className={!viewThreadsFeed ? "current" : ""} onClick={() => setViewThreadsFeed(false)}>Replies</button>
      </div>
    </header>
  );
};

export default Header;
