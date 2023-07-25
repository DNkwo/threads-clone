import { useState, useEffect } from "react";
import Feed from "./components/Feed";
import Header from "./components/Header";
import Nav from "./components/Nav";
import PopUp from "./components/PopUp";
import { ThreadType, User } from "./shared/types";
import WriteIcon from "./components/WriteIcon";

function App() {
  const [user, setUser] = useState<User>();
  const [threads, setThreads] = useState<ThreadType[]>([]);
  const [viewThreadsFeed, setViewThreadsFeed] = useState<boolean>(true);
  const [filteredThreads, setFilteredThreads] = useState<ThreadType[]>([]);
  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const [interactingThread, setInteractingThread] = useState<ThreadType>();
  const [popUpThreads, setPopUpThreads] = useState<ThreadType[]>([]);

  const userID = "1eac1f77-5694-4bf7-b90d-9fa67c678b03";

  const getUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users?user_uuid=${userID}`
      );
      const data = await response.json();
      setUser(data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const getReplies = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/threads?reply_to=${interactingThread?.id}`
      )
      const data = await response.json();
      setPopUpThreads(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getThreads();
  }, []);

  useEffect(() => {
    getThreadsFeed();
  }, [user, threads, viewThreadsFeed]);

  useEffect(() => {
    getReplies();
  }, [interactingThread]);

  const getThreads = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/threads?thread_from=${userID}`
      );
      const data = await response.json();
      setThreads(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getThreadsFeed = () => {
    if (viewThreadsFeed) {
      const standAloneThreads = threads?.filter(
        (thread) => thread.reply_to === null
      );
      setFilteredThreads(standAloneThreads);
    }
    if (!viewThreadsFeed) {
      const replyThreads = threads?.filter(
        (thread) => thread.reply_to !== null
      );
      setFilteredThreads(replyThreads);
    }
  };

  return (
    <>
      {user && (
        <div className="app">
          <Nav url={user.instagram_url} />
          <Header
            user={user}
            viewThreadsFeed={viewThreadsFeed}
            setViewThreadsFeed={setViewThreadsFeed}
          />
          <Feed
            user={user}
            threads={filteredThreads}
            setOpenPopUp={setOpenPopUp}
            getThreads={getThreads}
            setInteractingThread={setInteractingThread}
          />
          {openPopUp && <PopUp user={user} setOpenPopUp={setOpenPopUp} popUpThreads={popUpThreads}/>}
          <div onClick={() => setOpenPopUp(true)}>
            <WriteIcon />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
