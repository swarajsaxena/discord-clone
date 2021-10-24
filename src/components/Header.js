import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import React, { useEffect } from "react";
import { auth, provider } from "../firebase";
import {
  login,
  logout,
  selectEmail,
  selectId,
  selectName,
  selectPhoto,
} from "../features/userSlice";

function Header() {
  const userName = useSelector(selectName);
  const userPhoto = useSelector(selectPhoto);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, [userName]);

  const signOut = () => {
    if (!userName) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((err) => alert(err.message));
    } else {
      auth
        .signOut()
        .then(() => {
          dispatch(logout());
        })
        .catch((err) => alert(err.message));
    }
  };

  const setUser = (user) => {
    dispatch(
      login({
        id: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  return (
    <TopBar>
      <div className="logo">
        <img src="/images/lightning.png" />
        <div className="app_name">Lightning</div>
      </div>
      <p onClick={signOut}>Sign Out</p>
      <div className="user">
        <div className="username">{userName}</div>
        <img src={userPhoto} alt="" className="user-img" />
      </div>
    </TopBar>
  );
}

const TopBar = styled.nav`
  border-bottom: 1px solid rgba(159, 135, 255, 0.25);
  display: flex;
  padding: 0 1rem;
  justify-content: space-between;
  align-items: center;
  height: 68px;

  .logo {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.5rem;
    color: #7056da;
    letter-spacing: 1px;
    font-weight: 500;

    img {
      height: 30px;
    }
  }

  p {
    cursor: pointer;
    color: hsla(252, 100%, 87%, 0.25);
    letter-spacing: 1.5px;
    transition: all 100ms ease-out;
  }

  p:hover {
    color: hsla(252, 100%, 87%, 1);
  }

  .user {
    display: flex;
    gap: 1rem;
    align-items: center;
    color: hsla(252, 100%, 87%, 0.25);
    letter-spacing: 1.5px;

    .user-img {
      width: 40px;
      height: 40px;
      background-color: #6f55d8;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  .user:hover {
    color: hsla(252, 100%, 95%, 0.5);
  }

  @media (max-width: 600px) {
    & {
      .app_name,
      .username {
        display: none;
      }
    }
  }
`;

export default Header;
