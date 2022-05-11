import React from 'react';
import DiaryList from '../components/Diary/DiaryList';
import DiaryStore from '../components/Diary/DiaryStore';
import styled from 'styled-components';
import Navbar from '../components/common/Navbar';
import LoginMessage from '../components/common/LoginMessage';
import { useSelector } from 'react-redux';

const Box = styled.div`
  display: flex;
  justify-content: center;
  border: 10px solid red;
  height: 100vw;
  /* overflow: auto; */
`;

function Diary() {
  const isLogin = useSelector(state => state.isLoggedIn);

  return isLogin ? (
    <>
      <Navbar />
      <Box>
        <DiaryStore />
      </Box>
    </>
  ) : (
    <>
      <Navbar />
      <LoginMessage />
    </>
  );
}

export default Diary;
