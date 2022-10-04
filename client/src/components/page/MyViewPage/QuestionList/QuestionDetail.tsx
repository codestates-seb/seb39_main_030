import { axiosInstance } from '../../../../axiosInstance';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from '../../../atom/Text';
import { getKST } from '../../../app/util';
import { GrUserManager } from 'react-icons/gr';

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
        <Text fontSize="lg" className="contactTitle">
          {questionData.questionTitle}
        </Text>
        <div className="user">
          <img className="img" src={questionData.profileImg} />
          <Text className="name">{questionData.nickname}</Text>
          <Text>
            {questionData.createDate && getKST(questionData.createDate)}
          </Text>
        </div>
        <div className="content">
          <Text className="contents">{questionData.questionContents}</Text>
        </div>
      </div>
      <div className="bottomContainer">
        <div className="user">
          <GrUserManager />
          <Text fontWeight="semiBold" className="name">
            관리자 답변
          </Text>
        </div>
        <Text className="admin-answer">{questionData.questionAnswer}</Text>
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
    .img {
      margin-top: 3px;
      margin-bottom: 3px;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
    svg {
      margin-top: 3px;
      margin-bottom: 3px;
      width: 3rem;
      height: 3rem;
    }
  }
  .contactTitle {
    padding: 1.5rem 1rem;
    border-top: 1px solid ${({ theme }) => theme.mode.themeIcon};
    width: 100%;
    background-color: ${({ theme }) => theme.mode.background};
  }
  .contents {
    align-self: flex-start;
    padding: 1rem;
    line-height: 25px;
  }
  .contact--title {
    display: flex;
    justify-content: center;
  }
  .content {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .name {
    margin-right: auto;
    margin-left: 10px;
  }

  .bottomContainer {
    width: 100%;
    max-width: 800px;
    margin-top: 5rem;
  }

  .admin-answer {
    margin-top: 0.5rem;
    padding: 1rem;
    line-height: 25px;
  }
`;
