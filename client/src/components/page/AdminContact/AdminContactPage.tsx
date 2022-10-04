import useModal from '../../app/hooks/useModal';
import Button from '../../atom/Button';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Text } from '../../atom/Text';

export default function AdminContactPage() {
  const [questionTitle, setQuestionTitle] = useState<any>('');
  const [questionContents, setQuestionContents] = useState<any>('');

  const userCode = 1;

  const { openModal } = useModal();

  const openAddModalHandler = () => {
    openModal({
      type: 'addModal',
      props: {
        userCode: userCode,
        questionTitle: questionTitle,
        questionContents: questionContents,
      },
    });
  };

  return (
    <StyleAdminContactPage>
      <div className="add--question">
        <div className="add--title">
          <h1>
            <Text fontSize="xl" fontWeight="bold">
              🙋‍♂️ 문의 하기
            </Text>
          </h1>
        </div>
        <div className="question--container">
          <div className="title">
            <h3>
              <Text>제목</Text>
            </h3>
            <input
              type="text"
              placeholder="제목입력"
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
            />
            <h3 className="body-title">
              <Text>내용</Text>
            </h3>
            <textarea
              className="body-input"
              value={questionContents}
              onChange={(e) => setQuestionContents(e.target.value)}
              placeholder="여기에 내용을 입력해주세요."
            />
          </div>
          <div className="btn--div">
            <Button className="button" onClick={openAddModalHandler}>
              문의하기
            </Button>
          </div>
        </div>
      </div>
    </StyleAdminContactPage>
  );
}

const StyleAdminContactPage = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;

  @media (max-width: 640px) {
    padding: 20px 30px;
  }

  .add--question {
    padding: 30px 15px;
    display: flex;
    flex-direction: column;
    width: 95%;
    max-width: 800px;
    /* max-width: 800px; */
    height: 100%;
    /* box-shadow: 1px 1px 1px; */
    margin-top: 30px;
    @media (max-width: 640px) {
      padding: 20px 20px 30px;
    }
  }

  .add--title {
    display: flex;
    width: 100%;

    h1 {
      margin-bottom: 20px;
      font-weight: 400;
      font-size: 20px;
    }
  }

  .title {
    display: flex;
    flex-direction: column;
    margin: 10px 0px;
    font-size: 0.9rem;

    h3 {
      font-weight: 500;
      margin-bottom: 10px;
    }
    input {
      margin: 5px 0px;
      padding: 10px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 3px;
      outline: none;
    }
  }
  & input {
    background-color: ${({ theme }) => theme.mode.mainBackground};
    color: ${({ theme }) => theme.mode.primaryText};
  }
  .body-title {
    margin-top: 15px;
  }
  .body-input {
    width: 100%;
    line-height: 25px;
    height: 350px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    outline: none;
    background-color: ${({ theme }) => theme.mode.mainBackground};
    color: ${({ theme }) => theme.mode.primaryText};
  }

  .btn--div {
    display: flex;
    justify-content: end;
  }

  .button {
    max-width: fit-content;
    margin: 10px 0px;
  }
`;
