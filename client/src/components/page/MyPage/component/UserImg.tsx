import React from 'react';
import styled from 'styled-components';

export default function UserImg({ nickname, profileImg }) {
  const testImg =
    'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg';

  return (
    <StyleUserImg>
      <div className="img">
        <img className="user-img" src={testImg} />
      </div>
      <div className="user-info">
        <div>닉네임</div>
        <div>추천수</div>
      </div>
    </StyleUserImg>
  );
}

const StyleUserImg = styled.div`
  display: flex;
  .user-img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
  }
  .user-info {
    margin-top: 45px;
    margin-left: 12px;
  }
`;
