import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "./App.css";
import ChatPreview from "./components/ChatPreview";
import Header from "./components/Header";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import { selectName } from "./features/userSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  const userName = useSelector(selectName);

  return (
    <div className="App">
      {userName ? (
        <>
          <Header />
          <Main>
            <Sidebar />
            <ChatPreview />
          </Main>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

const Main = styled.main`
  display: flex;
  height: calc(100vh - 71px);
  position: relative;
`;

export default App;
