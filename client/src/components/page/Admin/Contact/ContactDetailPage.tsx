import { axiosInstance } from '../../../../axiosInstance';
import useModal from '../../../app/hooks/useModal';
import Button from '../../../atom/Button';
import { Text } from '../../../atom/Text';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getKST } from '../../../app/util';

export default function ContactDetailPage() {
  const { openModal } = useModal();

  const { questionCode }: any = useParams();
  const [detailData, setDetailDate] = useState<any>([]);

  const [answerContent, setAnswerContent] = useState<string>();
  const params = { questionCode };

  useEffect(() => {
    axiosInstance.get('/question/', { params }).then(function (response) {
      setDetailDate(response.data);
    });
  }, []);

  const onClickAnswer = () => {
    openModal({
      type: 'CaddModal',
      props: {
        questionCode: detailData.questionCode,
        answer: answerContent,
        userCode: detailData.userCode,
        questionClear: detailData.questionClear,
      },
    });
  };

  const onClickDelete = () => {
    openModal({
      type: 'CdeleteModal',
      props: {
        questionCode: detailData.questionCode,
        userCode: detailData.userCode,
      },
    });
  };

  return (
    <StyleContactDetail>
      <div className="contact--title">
        <h1>
          <Text fontSize="xl">👤 유저 문의</Text>
        </h1>
      </div>
      <div className="topContainer">
        <Text fontSize="lg" className="contacTtitle">
          {detailData.questionTitle}
        </Text>
        <div className="user">
          <img className="img" src={detailData.profileImg} alt="프로필이미지" />
          <Text className="name">{detailData.nickname}</Text>
          <Text>{detailData.createDate && getKST(detailData.createDate)}</Text>
        </div>
        <div className="content">
          <Text className="contents">{detailData.questionContents}</Text>

          <div className="bottomContainer">
            {detailData.questionClear === 'N' && (
              <h3 className="body-title">
                <Text>답변 내용</Text>
              </h3>
            )}
            {detailData.questionClear === 'Y' ? (
              <div className="co-temp">
                <Text className="clear-answer">이미 답변된 문의입니다</Text>
                <Button className="contactButton" onClick={onClickDelete}>
                  문의 삭제하기
                </Button>
              </div>
            ) : (
              <textarea
                className="body-input"
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
              />
            )}
          </div>
          {detailData.questionClear === 'Y' ? (
            <div></div>
          ) : (
            <div className="contactBtn">
              <Button className="contactButton" onClick={onClickDelete}>
                문의 삭제하기
              </Button>
              <Button onClick={onClickAnswer}>답변하기</Button>
            </div>
          )}
        </div>
      </div>
    </StyleContactDetail>
  );
}

const StyleContactDetail = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .co-temp {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .topContainer {
    width: 100%;
    max-width: 800px;
  }

  .user {
    display: flex;
    justify-content: space-between;
    border-top: solid 1px ${({ theme }) => theme.mode.themeIcon};
    border-bottom: solid 1px ${({ theme }) => theme.mode.themeIcon};
    align-items: center;
    padding: 10px 1rem;

    .img {
      margin-top: 3px;
      margin-bottom: 3px;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
  }
  .contact--title {
    margin-top: 1rem;
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
    margin-bottom: 2rem;
  }
  /* .contactButton{

  } */

  .bottomContainer {
    padding: 1rem;
  }
  .clear-answer {
    align-items: center;
    font-size: 30px;
    margin-bottom: 1rem;
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
    margin: 10px 0;
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
    margin: 5px 0;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    background-color: ${({ theme }) => theme.mode.background};
    color: ${({ theme }) => theme.mode.primaryText};
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
