import React from 'react';
import styled from 'styled-components';
import { Text } from '../../../atom/Text';

export default function UserInfo(props: any) {
  return (
    <StyleUserInfo>
      <div className="user-info--top">
        <img className="userinfo-img" src={props.profileImg} />
        <Text>{props.nickname}</Text>
        <Text className="good">👍 {props.userLikes || 10}</Text>
      </div>
      <div className="user-info--middle">
        <Text fontSize="lg" className="nickname">
          닉네임
        </Text>
        <input
          className="nickname-input"
          placeholder="변경하실 닉네임 입력해주세요"
          onChange={(e) => props.setInputNickName(e.target.value)}
        />
      </div>
      <p className="user-info--bottom">와글와글에서 사용되는 이름입니다.</p>
    </StyleUserInfo>
  );
}

const StyleUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & input {
    background-color: ${({ theme }) => theme.mode.mainBackground};
    color: ${({ theme }) => theme.mode.primaryText};
  }

  & .user-info--top {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
  }

  &. user-info--middle {
    display: flex;
  }

  .nickname {
    margin-right: 1rem;
  }

  .userinfo-img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    margin-right: 1rem;
  }

  .nickname-input {
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    outline: none;
    width: 60%;
  }

  & .user-info--bottom {
    margin-top: 2rem;
    border-bottom: solid 1px;
    color: #868e96;
    font-size: 0.875rem;
  }
`;
