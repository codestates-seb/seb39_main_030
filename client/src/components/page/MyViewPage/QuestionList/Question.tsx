import React from 'react';
import styled from 'styled-components';
import { Text } from '../../../atom/Text';
import { useNavigate } from 'react-router-dom';
import { media } from '../../../../style/media';

export default function Question(props: any) {
  const navigate = useNavigate();

  const onClickQuestion = () => {
    navigate(`/myview/question/${props.questionCode}`, {
      state: props,
    });
  };
  return (
    <StyledQuestion>
      <div className="question-userInfo">
        <img className="img" src={props.profileImg} />
        <Text
          onClick={onClickQuestion}
          className="discussionTitle"
          fontSize="lg"
        >
          {props.questionTitle}
        </Text>
      </div>
      <Text className="discussionDate" fontSize="lg">
        {props.questionCreateDate}
      </Text>
    </StyledQuestion>
  );
}

const StyledQuestion = styled.div`
  display: flex;
  min-height: 70px;
  cursor: pointer;
  ${Text} {
    cursor: pointer;
  }

  border-bottom: solid 1px;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  ${media.custom('768px')} {
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;
    .question-userInfo {
      margin-bottom: 1rem;
    }
    .discussionDate {
      align-self: flex-end;
    }
  }

  .question-userInfo {
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
