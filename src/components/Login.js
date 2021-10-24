import styled from "styled-components";
import { useEffect } from "react";
import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  logout,
  selectEmail,
  selectId,
  selectName,
  selectPhoto,
} from "../features/userSlice";

function Login() {
  const dispatch = useDispatch();
  const userName = useSelector(selectName);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, [userName]);

  const signIn = () => {
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
    <Container>
      <div className="login">
        <img className="logo" src="/images/lightning.png" alt="" srcset="" />

        <div onClick={signIn} className="login_button">
          {" "}
          <img src="./images/icons/google.png" alt="" srcset="" />
          <p>Login</p>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  /* border: 1px solid; */
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .login {
    margin: 2rem;
    max-width: 400px;
    background: linear-gradient(hsl(262, 100%, 100%), hsl(262, 100%, 80%));
    padding: 2rem;
    border-radius: 0.8rem;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex-direction: column;

    color: #7056da;
    /* font-weight: 500; */
    /* font-size: 4rem; */

    .logo {
      width: 40px;
      /* height: 100px; */
    }

    .login_button {
      cursor: pointer;
      display: flex;
      gap: 1rem;
      align-items: center;
      box-shadow: 0 4px 10px hsl(262, 100%, 10%, 0.5);
      transition: all 150ms ease-in;

      background: #12052c;
      padding: 0.7rem;
      border-radius: 0.4rem;
      color: white;
      letter-spacing: 1.5px;
      font-size: 1.5rem;
      justify-content: center;
      width: 100%;
      border: 2px solid transparent;

      img {
        width: 20px;
        height: 20px;
      }
    }

    .login_button:hover {
      box-shadow: 0 4px 15px hsl(262, 100%, 10%, 0.7);
      border: 2px solid #fbf8ff;
    }
  }
`;

export default Login;
