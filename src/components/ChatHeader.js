import React from "react";
import styled from "styled-components";

const ChatHeader = (props) => {
  const expand = () => {
    const sidebar = document.querySelector(".sidebar");

    if (sidebar.classList.contains(".sidebar-open")) {
      sidebar.style = `width: 0 !important; min-width: 0 !important;`;
      sidebar.classList.remove(".sidebar-open");
    } else {
      sidebar.style = `width: 100% !important; min-width: 100% !important;`;
      sidebar.classList.add(".sidebar-open");
    }
  };

  return (
    <Container>
      <div onClick={expand} className="title-section">
        <img src="/images/icons/back.png" alt="" srcset="" />
        <div className="chat-title">{props.channelName}</div>
      </div>
      <div className="settings">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 8%;
  /* padding: 2rem; */
  height: 70px;
  padding: 0 1.5rem;

  border-bottom: 1px solid rgba(159, 135, 255, 0.25);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title-section {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    gap: 1rem;
  }

  .chat-title {
    font-size: 2rem;
    letter-spacing: 2px;
    font-weight: 500;
    color: hsla(254, 80%, 90%, 0.9);
  }

  .settings {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    .dot {
      background-color: hsla(20, 40%, 100%, 0.5);
      width: 5px;
      height: 5px;
      border-radius: 50%;
    }
  }

  @media (max-width: 600px) {
    height: 5%;
    /* padding: 2rem; */
    height: 70px;
    padding: 0 1rem;

    border-bottom: 1px solid rgba(159, 135, 255, 0.25);
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border: 1px solid; */

    .title-section {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      gap: 0.7rem;

      img {
        width: 10px;
      }
      .chat-title {
        font-size: 1.2rem;
        letter-spacing: 2px;
        font-weight: 400;
        color: hsla(254, 80%, 90%, 0.9);
      }
    }

    .settings {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;

      .dot {
        background-color: hsla(20, 40%, 100%, 0.5);
        width: 4px;
        height: 4px;
        border-radius: 50%;
      }
    }
  }
`;

export default ChatHeader;
