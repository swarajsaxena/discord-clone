import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectEmail } from "../features/userSlice";
import "./Message.css";

function Message(props) {
  return (
    <Container
      className={useSelector(selectEmail) == props.email ? "right_align" : ""}
    >
      <div className="img-container">
        <img className="avatar" src={props.photo} alt="" srcset="" />
      </div>
      <div className="chat_info">
        <div className="name">{props.name}</div>
        <div className="chat_message">
          <div className="text">
            <p>
              {props.msg}
              <br />
              <br />
            </p>
          </div>
          <div className="chat_time_stamp">
            {new Date(props.timeStamp?.toDate())
              .toUTCString()
              .substring(17, 22)}
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;

  gap: 1rem;
  margin: 1rem 0;
  align-items: flex-start;

  .img-container {
    margin-top: 1.6rem;
    border-radius: 50%;
    border: 3px solid #7056da;
    height: 36px;
    overflow: hidden;

    box-shadow: 0 0 10px hsla(256, 50%, 60%, 1);

    .avatar {
      width: 30px;
    }
  }

  .chat_info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;

    .name {
      color: rgba(159, 135, 255, 0.5);
      transform: scale(0.9);
      transform-origin: bottom left;
    }

    .chat_message {
      background: hsla(256, 50%, 60%, 0.1);
      box-shadow: 0 4px 15px hsla(256, 50%, 70%, 0);
      border: 2px solid #5d43a2;
      min-width: 100px;
      max-width: 500px;
      padding: 1rem;
      border-radius: 0.5rem;
      position: relative;
      display: flex;

      p {
        flex: 1;
        width: 100%;
        /* border: 1px solid; */
        transform: scale(1);
        letter-spacing: 2px;
        color: hsla(256, 50%, 90%, 0.9);
        transform-origin: left top;
        line-height: 1.5;
        /* margin-bottom: 0.6rem; */
      }

      .chat_time_stamp {
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 0.5rem;
        transform: scale(0.7);
        transform-origin: bottom right;
        opacity: 0.5;
      }
    }
  }

  @media (max-width: 600px) {
    & {
      gap: 1rem;
      margin: 0.5rem 0;
      align-items: flex-start;

      /* transform: scale(0.8); */
      .img-container {
        display: none;
        margin-top: 1.6rem;
        border-radius: 50%;
        border: 3px solid #7056da;
        height: 36px;
        overflow: hidden;

        box-shadow: 0 0 10px hsla(256, 50%, 60%, 1);

        .avatar {
          width: 30px;
        }
      }

      .chat_info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.4rem;

        .name {
          color: rgba(159, 135, 255, 0.5);
          transform: scale(0.9);
          transform-origin: bottom left;
        }

        .chat_message {
          background: hsla(256, 50%, 60%, 0.1);
          box-shadow: 0 4px 15px hsla(256, 50%, 70%, 0);
          border: 2px solid #5d43a2;
          min-width: 100px;
          max-width: 300px;
          padding: 0.5rem;
          border-radius: 0.5rem;
          position: relative;

          p {
            letter-spacing: 2px;
            color: hsla(256, 50%, 90%, 0.9);
            transform-origin: left top;
            line-height: 1.2;
            font-size: 300;
            /* margin-bottom: 0.6rem; */
          }

          .chat_time_stamp {
            position: absolute;
            bottom: 0;
            right: 0;
            margin: 0.5rem;
            transform: scale(0.7);
            transform-origin: bottom right;
            opacity: 0.5;
          }
        }
      }
    }
  }
`;

export default Message;
