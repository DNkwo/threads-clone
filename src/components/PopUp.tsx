import React from "react";
import PopUpThread from "./PopUpThread";
import ThreadInput from "./ThreadInput";
import { ThreadType, User } from "../shared/types";
import { motion } from "framer-motion";

type Props = {
  user: User;
  popUpThreads: ThreadType[];
  setOpenPopUp: (value: boolean) => void;
};

const PopUp = ({ user, setOpenPopUp, popUpThreads }: Props) => {
  return (
    <motion.div
      className="popup"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <p
        onClick={() => {
          setOpenPopUp(false);
        }}
      >
        X
      </p>
      {popUpThreads?.map((thread) => (
        <PopUpThread key={thread.id} popUpThread={thread} />
      ))}
      <ThreadInput />
    </motion.div>
  );
};

export default PopUp;
