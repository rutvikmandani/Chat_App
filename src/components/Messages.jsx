import { doc, onSnapshot } from "firebase/firestore";
import { groupBy } from "lodash";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      if (doc.exists()) {
        const newMessage = doc.data().messages.map((a) => ({
          ...a,
          date: moment(new Date(a.date.seconds * 1000)).format("L"),
          time: moment(new Date(a.date.seconds * 1000)).format("LT"),
        }));
        const dateGroup = Object.entries(groupBy(newMessage, "date"));
        console.log("doc.data().messages", dateGroup);
        setMessages(dateGroup);
      }
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  const getDate = (date) => {
    const isTodayDate = moment().isSame(date, "day");
    const yesterdayDate = moment().diff(moment(date), "days") === 1;

    if (isTodayDate) return "Today";
    if (yesterdayDate) return "Yesterday";
    return date;
  }

  return (
    <div className="messages">
      {messages.map((m) => (
        <>
          <div className="dateMessages">{getDate(m[0])}</div>
          {m[1].map((a) => (
            <Message message={a} key={a.id} />
          ))}
        </>
      ))}
    </div>
  );
};

export default Messages;
