import React, { useState, useEffect } from "react";
import { ThreadType, User } from "../shared/types";
import moment from "moment";

type Props = {
  popUpThread: ThreadType;
};

const PopUpThread = ({ popUpThread }: Props) => {
  const timePassed = moment().startOf("day").from(popUpThread.timestamp);

  const [user, setUser] = useState<User>();

  const getUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users?user_uuid=${popUpThread.thread_from}`
      );
      const data = await response.json();
      setUser(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  })

  return (
    <article className="feed-card">
      <div className="text-container">
        <div className="img-container">
          <img src={user?.img} alt="profile avatar" />
        </div>
        <p className="sub-text">{timePassed}</p>
      </div>
      <div>
        <p>
          <strong>{user?.handle}</strong>
        </p>
        <p>{popUpThread.text}</p>
      </div>
    </article>
  );
};

export default PopUpThread;
