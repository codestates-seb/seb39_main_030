import { axiosInstance } from '../../../../axiosInstance';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from '../../../atom/Text';

export default function QuestionDetail() {
  const { questionCode }: any = useParams();
  const [questionData, setQuestionData] = useState<any>([]);

  const params = {
    questionCode,
  };
  useEffect(() => {
    axiosInstance.get('/question', { params }).then(function (response) {
      setQuestionData(response.data);
    });
  }, []);

  return (
    <StyleQuestionDetail>
      <div className="contact--title">
        <h1></h1>
      </div>
      <div className="topContainer">
        <Text fontSize="lg" className="contacTtitle">
          {questionData.questionTitle}
        </Text>
        <div className="user">
          <img className="img" src={questionData.profileImg} />
          <Text className="name">{questionData.nickname}</Text>
          <Text>{questionData.createDate}</Text>
        </div>
        <div className="content">
          <Text className="contents">{questionData.questionContents}</Text>
          <div className="user-info"></div>
        </div>
      </div>
    </StyleQuestionDetail>
  );
}

const StyleQuestionDetail = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .topContainer {
    width: 100%;
    max-width: 800px;
  }

  .user {
    display: flex;
    justify-content: space-between;
    border-top: solid 1px;
    border-bottom: solid 1px;
    align-items: center;
    padding: 10px 1rem;

    .name {
      /* margin-top: 12px; */
      /* margin-left: 6px; */
    }
    .img {
      margin-top: 3px;
      margin-bottom: 3px;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
  }

  .contacTtitle {
    padding: 1.5rem 1rem;
    border-top: 1px solid ${({ theme }) => theme.mode.themeIcon};
    width: 100%;
    background-color: ${({ theme }) => theme.mode.background};
  }

  .contents {
    align-self: flex-start;
    padding: 1rem;
  }

  .contactBtn {
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
  }
  /* .contactButton{

  } */

  .bottomContainer {
    padding: 1rem;
  }
  .clear-answer {
    align-items: center;
    font-size: 30px;
  }
  .contact--title {
    display: flex;
    /* width: 100%; */
    justify-content: center;

    h1 {
      margin-bottom: 20px;
      font-weight: 400;
      font-size: 20px;
    }
  }

  .body-title {
    margin-top: 24px;
    margin-bottom: 12px;
  }
  .title {
    display: flex;
    flex-direction: column;
    margin: 10px 0px;
    font-size: 0.9rem;

    h3 {
      size: 600px;
      font-weight: 500;
      margin-bottom: 10px;
    }
  }
  .content {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .user {
    display: flex;
    justify-content: start;
  }
  .img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
  .name {
    margin-right: auto;
    margin-left: 10px;
  }

  .user-info {
    display: flex;
    justify-content: end;
    margin-top: 8px;
  }
  .question-code {
    margin-right: 1rem;
  }
  .body-input {
    width: 100%;
    line-height: 25px;

    min-height: 250px;
    margin: 5px 0px;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  .btn {
    display: flex;
    justify-content: end;
    margin-top: 18px;
  }

  /* .btn {
    max-width: fit-content;
    margin: 10px 0px;
  } */
`;
