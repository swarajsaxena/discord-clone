import styled from "styled-components";
import ChatList from "./ChatList";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { selectChannelId, setChannelInfo } from "../features/appSlice";
import "./Sidebar.css";

const Sidebar = (props) => {
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      )
    );
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt("Enter a New Channel Name..");
    if (channelName) {
      db.collection("channels").add({
        channelName: channelName,
      });
    }
  };

  return (
    <Container className="sidebar">
      <div className="sidebar-heading">
        <div onClick={handleAddChannel} className="add">
          <img className="back" src="/images/icons/back.png" alt="add" />
        </div>
        <div className="heading">Chats</div>
        <div onClick={handleAddChannel} className="add">
          <img src="/images/icons/add.png" alt="add" />
        </div>
      </div>
      {channels.map(({ id, channel }) => (
        <ChatList key={id} id={id} name={channel.channelName} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  border-right: 1px solid rgba(159, 135, 255, 0.25);
  padding: 1rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 0.3;
  min-width: 350px;
  width: 0;

  .sidebar-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border: 1px solid; */
    padding: 1rem;
    padding-bottom: 0;
    .add {
      position: relative;
      padding: 0.4rem;
      border: 2px solid hsla(252, 26%, 73%, 0.5);
      border-radius: 0.4rem;
      height: max-content;
      display: grid;
      place-items: center;
      cursor: pointer;
      width: 30px;
      height: 30px;
      img {
      }

      .back {
        width: 8px;
      }
    }

    .add:hover {
      border: 2px solid hsla(252, 26%, 73%, 0.8);
    }
  }

  @media (max-width: 600px) {
    & {
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      width: 0;
      min-width: 0;
      /* border: 1px solid; */
      flex: 0;
      padding: 0;
      background-color: #1b0736;
      transition: all 150ms ease-out;

      z-index: 2;

      .sidebar-heading {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        padding-bottom: 0;

        .add {
          position: relative;
          padding: 0.4rem;
          border: 2px solid hsla(252, 26%, 73%, 0.5);
          border-radius: 0.4rem;
          height: max-content;
          display: grid;
          place-items: center;
          cursor: pointer;
          width: 30px;
          height: 30px;

          .back {
            width: 8px;
          }
        }

        .add:hover {
          border: 2px solid hsla(252, 26%, 73%, 0.8);
        }
      }
    }
  }
`;

export default Sidebar;
