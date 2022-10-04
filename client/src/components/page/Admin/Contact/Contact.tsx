import React, { useState } from 'react';
import styled from 'styled-components';
import { Text } from '../../../atom/Text';
import { useNavigate } from 'react-router-dom';

export default function Contact(props: any) {
  const testImg =
    'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg';

  const navigate = useNavigate();

  const onClickContactItem = () => {
    ///contact-list/:questionCode
    navigate(`/contact-list/${props.questionCode}`, {
      state: props,
    });
  };

  return (
    <StyledContact onClick={onClickContactItem}>
      <Text>{props.questionTitle}</Text>
      <Text>{props.questionCreateDate}</Text>
      <img className="contactImg" src={testImg} />
      <Text className="contactUser">{props.nickname}</Text>
    </StyledContact>
  );
}

const StyledContact = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.mode.divider};
  height: 80px;
  cursor: pointer;

  ${Text} {
    cursor: pointer;
  }
  .contactUser {
    margin-left: 0.5rem;
  }
  .contactImg {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    margin-left: auto;
  }
`;
