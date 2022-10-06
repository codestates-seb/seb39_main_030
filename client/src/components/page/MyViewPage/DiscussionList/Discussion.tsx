import React from 'react';
import styled from 'styled-components';
import { Text } from '../../../atom/Text';
import { useNavigate } from 'react-router-dom';
import { media } from '../../../../style/media';

export default function Discussion(props: any) {
  const navigate = useNavigate();

  const onClickContactItem = () => {
    navigate(`/debate/${props.discussionCode}`);
  };

  return (
    <StyledContact onClick={onClickContactItem}>
      <div className="discussion-userInfo">
        <img className="img" src={props.profileImg} />
        <Text className="discussionTitle" fontSize="lg">
          {props.discussionTitle}
        </Text>
      </div>
      <Text className="discussionDate" fontSize="lg">
        {props.discussionCreateDate}
      </Text>
    </StyledContact>
  );
}

const StyledContact = styled.div`
  display: flex;
  min-height: 70px;

  border-bottom: solid 1px;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  cursor: pointer;

  ${Text} {
    cursor: pointer;
  }

  ${media.custom('768px')} {
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;
    .discussion-userInfo {
      margin-bottom: 1rem;
    }
    .discussionDate {
      align-self: flex-end;
    }
  }

  .discussion-userInfo {
    display: flex;
    align-items: center;
  }

  .discussionTitle {
    margin-left: 1rem;
    word-break: break-all;
  }

  .img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
`;
