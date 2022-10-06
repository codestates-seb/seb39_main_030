import { axiosInstance } from '../../../../axiosInstance';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Question from './Question';
import { getKST } from '../../../app/util';

export default function QuestionList() {
  const [questionList, setQuestionList] = useState<any>([]);
  const [userImg, setUserImg] = useState<string>();

  const userCode = 1001;
  const params = { userCode };
  useEffect(() => {
    axiosInstance.get('/user/lists', { params }).then(function (response) {
      setQuestionList(response.data.questionLists);
      setUserImg(response.data.profileImg);
    });
  }, []);

  return (
    <StyleContactList>
      <div className="questions">
        {questionList.map((data) => (
          <Question
            key={data.questionCode}
            questionTitle={data.questionTitle}
            questionCode={data.questionCode}
            questionCreateDate={
              data.questionCreateDate && getKST(data.questionCreateDate)
            }
            profileImg={userImg}
          />
        ))}
      </div>
      <div></div>
    </StyleContactList>
  );
}

const StyleContactList = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* align-items: center; */
  width: 100%;
  max-width: 800px;
  .info {
    display: flex;
  }

  .title {
    margin-bottom: 1rem;
  }
  .questions {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;
