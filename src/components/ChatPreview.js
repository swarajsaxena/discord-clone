import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectChannelId, selectChannelName } from "../features/appSlice";
import {
  selectEmail,
  selectId,
  selectName,
  selectPhoto,
} from "../features/userSlice";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import db from "../firebase";
import firebase from "firebase";

function ChatsPreview() {
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);

  const userId = useSelector(selectId);
  const userName = useSelector(selectName);
  const userEmail = useSelector(selectEmail);
  const userPhoto = useSelector(selectPhoto);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timeStamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [channelId]);

  const afterSubmission = (event) => {
    event.preventDefault();
    db.collection("channels").doc(channelId).collection("messages").add({
      message: input,
      userName: userName,
      userPhoto: userPhoto,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      userEmail: userEmail,
    });
    setInput("");
  };

  console.log(messages);

  return (
    <Container>
      <ChatHeader channelName={channelName} />

      <div className="chat_messages">
        {!channelId ? (
          <div className="please">Please Select a Chat😊💜</div>
        ) : (
          messages.map((message) => (
            <Message
              email={message.userEmail}
              name={message.userName}
              msg={message.message}
              photo={message.userPhoto}
              timeStamp={message.timeStamp}
            />
          ))
        )}
      </div>

      <form onSubmit={afterSubmission} action="" className="input-form">
        <textarea
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
          disabled={!channelId}
          type="text"
          className="input-field"
          placeholder="Type your message.."
        />

        <button disabled={!channelId} type="submit" className="submit-button">
          <img src="/images/icons/send.svg" alt="" srcset="" />
        </button>
      </form>
    </Container>
  );
}

let Container = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  /* align-items: flex-end; */
  flex: 0.8;

  .chat_messages {
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-start;
    overflow-y: scroll;
    padding: 0 1.5rem;
    height: 100%;

    .please {
      /* border: 1px solid; */
      height: 100%;
      display: grid;
      place-items: center;
      color: hsla(254, 80%, 90%, 0.3);
      font-size: 1.5rem;
    }
  }

  .input-form {
    min-height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    gap: 1.5rem;
    /* border: 1px solid; */
    border-top: 1px solid rgba(159, 135, 255, 0.25);

    textarea {
      background: none;
      border: none;
      outline: none;
      height: 90%;
      max-height: max-content;
      border: 2.5px solid rgba(159, 135, 255, 0.5);
      padding: 0.8rem;
      width: 100%;
      border-radius: 0.5rem;
      color: hsla(254, 80%, 90%, 0.9);
      display: flex;
      align-items: flex-end;
    }

    textarea::placeholder {
      color: hsla(254, 80%, 90%, 0.5);
      letter-spacing: 1px;
    }

    button {
      cursor: pointer;
      background: none;
      border: none;
      outline: none;

      img {
        height: 25px;
      }
    }
  }

  @media (max-width: 600px) {
    & {
      flex: 1;

      .chat_messages {
        padding: 0 1.5rem;
        height: 100%;

        .please {
          /* border: 1px solid; */
          height: 100%;
          display: grid;
          place-items: center;
          color: hsla(254, 80%, 90%, 0.3);
          font-size: 1.5rem;
        }
      }

      .input-form {
        padding: 1rem;
        gap: 1rem;
      }
    }
  }
`;

console.log(Container);

export default ChatsPreview;
