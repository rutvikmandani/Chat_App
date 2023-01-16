import { doc, onSnapshot } from "firebase/firestore";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  const getTime = (time) => {
    const isTodayDate = moment().isSame(time * 1000, "day");
    const yesterdayDate = moment().diff(moment(time * 1000), "days") === 1;

    if (isTodayDate) return "Today";
    if (yesterdayDate) return "Yesterday";
    return moment(moment(time * 1000)).format("LT");
  };
  
  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userChatWrapper"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <div className="userChat">
              <img src={chat[1].userInfo.photoURL} alt="" />
              <div className="userChatInfo">
                <span>{chat[1].userInfo.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
              </div>
            </div>
            <p className="messageTimeColor">{getTime(chat[1].date.seconds)}</p>
          </div>
        ))}
    </div>
  );
};

export default Chats;
