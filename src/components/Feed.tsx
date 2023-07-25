import React from "react";
import { ThreadType, User } from "../shared/types";
import Thread from "./Thread";

type Props = {
  user: User;
  threads: Array<ThreadType>;
  setOpenPopUp: (value: boolean) => void;
  getThreads: () => void;
  setInteractingThread: (value: ThreadType) => void;
};

const Feed = ({ user, threads, setOpenPopUp, getThreads, setInteractingThread}: Props) => {
  return (
    <div className="feed">
      {threads.map((thread: ThreadType) => (
        <Thread
          key={thread.id}
          user={user}
          thread={thread}
          setOpenPopUp={setOpenPopUp}
          getThreads={getThreads}
          setInteractingThread={setInteractingThread}
        />
      ))}
    </div>
  );
};

export default Feed;
