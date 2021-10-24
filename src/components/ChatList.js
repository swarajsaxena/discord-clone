import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectChannelId, setChannelInfo } from "../features/appSlice";
import db from "../firebase";

const ChatList = (props) => {
  const dispatch = useDispatch();
  return (
    <Container>
      <Chat
        className="chat"
        onClick={() => {
          const sidebar = document.querySelector(".sidebar");

          if (sidebar.classList.contains(".sidebar-open")) {
            sidebar.style = `width: 0 !important; min-width: 0 !important;`;
            sidebar.classList.remove(".sidebar-open");
          } else {
            sidebar.style = `width: 100% !important; min-width: 100% !important;`;
            sidebar.classList.add(".sidebar-open");
          }
          dispatch(
            setChannelInfo({
              channelId: props.id,
              channelName: props.name,
            })
          );
        }}
      >
        <div className="img-container">
          <img className="chat-img" src="/images/avatar.png" alt="" srcset="" />
        </div>
        <div className="chat-des">
          <div className="chat-name">{props.name}</div>
        </div>
      </Chat>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

const Chat = styled.div`
  display: flex;
  gap: 1rem;
  cursor: pointer;
  padding: 1rem;
  border-radius: 0.2rem;
  /* margin-bottom: 1rem; */

  &:hover {
    background: linear-gradient(
      90deg,
      hsla(20, 100%, 100%, 0.1),
      hsla(20, 100%, 100%, 0.01)
    );

    .chat-name {
      font-size: 1.1rem;
      color: hsla(252, 100%, 100%, 1);
    }
  }

  .img-container {
    .chat-img {
      width: 45px;
      border-radius: 0.2rem;
    }
  }

  .chat-des {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* border: 1px solid; */

    .chat-name {
      font-size: 1.5rem;
      color: hsla(252, 100%, 100%, 0.7);
    }
  }

  @media (max-width: 600px) {
    display: flex;
    gap: 1rem;
    cursor: pointer;
    padding: 0.25rem 1.5rem;
    border-radius: 0.2rem;
  }
`;

export default ChatList;
