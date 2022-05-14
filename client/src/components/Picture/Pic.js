import React from 'react';
import styled from 'styled-components';
import AWS from 'aws-sdk';

const Container = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

const Upload = styled.input`
  width: 50px !important;
  height: 50px !important;
  font-size: 100px;
  text-align: right;
  min-width: 0 !important;
  outline: none;
  background: rgb(0, 0, 0);
  cursor: inherit;
  display: block !important;
  border-radius: 50% !important;
  cursor: pointer;
  position: absolute;
  margin: 0 !important;
  z-index: -1;
`;

const Label = styled.label`
  position: inherit;
  width: 50px !important;
  height: 50px !important;
  font-size: 30px;
  min-width: 0 !important;
  outline: none;
  background: rgb(255, 255, 255);
  cursor: inherit;
  display: flex !important;
  justify-content: center;
  align-items: center;
  border-radius: 50% !important;
  cursor: pointer;
  border: 2px solid grey;
`;

const Pic = props => {
  AWS.config.update({
    region: 'ap-northeast-2', // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'ap-northeast-2:8a8d19df-b498-40fe-8b68-719bd6b315c6',
    }),
  });

  const handler = props.handler;

  const deleteHandler = name => {
    if (name === 'profile.jpeg') {
      return;
    }

    var s3 = new AWS.S3();
    var params = { Bucket: 'jmtpictures', Key: name };
    s3.deleteObject(params).promise();
  };

  const handleFileInput = async e => {
    // input 태그를 통해 선택한 파일 객체
    const file = e.target.files[0];

    await deleteHandler(file.name);

    // S3 SDK에 내장된 업로드 함수
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: 'jmtpictures', // 업로드할 대상 버킷명
        Key: file.name, // 업로드할 파일명 (* 확장자를 추가해야 합니다!)
        Body: file, // 업로드할 파일 객체
      },
    });

    const promise = upload.promise();

    promise.then(
      function (data) {
        // handler(input);
        alert('이미지 업로드에 성공했습니다.');
      },
      function (err) {
        return alert('오류가 발생했습니다: ', err.message);
      },
    );
  };
  return (
    <Container>
      <button onClick={() => deleteHandler('ec2.png')} />
      <Upload type="file" id="upload" onChange={handleFileInput} />
      <Label htmlFor="upload" className="image-upload-wrapper">
        🖼
      </Label>
    </Container>
  );
};

export default Pic;

const picUrl = 'https://jmtpictures.s3.ap-northeast-2.amazonaws.com/';
//event.target.files[0].name - 저장하려는 파일 이름

//먼저 최초 렌더링시
//signup을 하면 기본적으로 (defualt picture)를 넣어놓는다 (user 생성하면 디폴트값으로 profile.jpeg들가있음)

//1. 사진이 없을경우 (profile.jpeg 계속 보여줌)

//2. 사진 업로드시
// 일단 사진이 profile.jpeg인지 확인함
// 맞을시 그냥 새로운 파일 업로드하고 user 데이터 업데이트해줌
// profile.jpeg가 아니라면 먼저 있던 사진을 삭제하고 파일 업로드하고 user 데이터 업데이트
