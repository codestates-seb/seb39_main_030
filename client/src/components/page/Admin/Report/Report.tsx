import React from 'react';
import styled from 'styled-components';
import { Text } from '../../../atom/Text';
import { useNavigate } from 'react-router-dom';

export default function Report(props: any) {
  const navigate = useNavigate();
  const onClickContactItem = () => {
    navigate(`/report-list/${props.declarationCode}/${props.userCode}`);
  };
  return (
    <StyledContact onClick={onClickContactItem}>
      <Text>신고 코드: {props.declarationCode}</Text>
      <img className="reportImg" src={props.profileImg} />
      <Text className="reportUser">{props.nickname}</Text>
    </StyledContact>
  );
}

const StyledContact = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px ${({ theme }) => theme.mode.divider};
  height: 80px;
  cursor: pointer;

  ${Text} {
    cursor: pointer;
  }

  .reportUser {
    margin-left: 0.5rem;
  }
  .reportImg {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    margin-left: auto;
  }
`;
