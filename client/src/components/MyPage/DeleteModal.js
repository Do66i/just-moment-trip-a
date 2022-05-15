import React from 'react';
import styled from 'styled-components';
import CustomButton from './CustomButton';

const Container = styled.div`
  text-align: center;
  font-size: 50px;
  color: black;
  font-family: SsurroundFont;

  > h2 {
    color: rgb(89, 72, 135);
  }
  > .warning {
    color: red;
    font-size: 30px;
    margin: 30px;
  }
`;

function DeleteModal({ userDeleteHandler }) {
  return (
    <Container>
      <h2>🚨회원 탈퇴🚨</h2>
      <div className="warning">진행하시면 회원정보 및</div>
      <div className="warning">작성하신 모든 글이 삭제됩니다</div>
      <div className="warning">다시 되돌리실수 없습니다</div>
      <CustomButton
        handler={userDeleteHandler}
        name={'진행'}
        color={'red'}
        font={'SsurroundFont'}
      />
    </Container>
  );
}

export default DeleteModal;
