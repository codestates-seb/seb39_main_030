import { axiosInstance } from '../../../../axiosInstance';
import useModal from '../../../app/hooks/useModal';
import Button from '../../../atom/Button';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from '../../../atom/Text';
import { getKST } from '../../../app/util';

export default function ReportDetail() {
  const { openModal } = useModal();

  const [answerContent, setAnswerContent] = useState<any>();
  const [reportData, setReportData] = useState<any>([]);
  const { declarationCode, userCode }: any = useParams();

  const navigate = useNavigate();

  const params = {
    declarationCode,
    userCode,
  };

  useEffect(() => {
    axiosInstance.get('/declaration', { params }).then(function (response) {
      setReportData(response.data);
    });
  }, []);
  const discussionCodeHandler = () => {
    navigate(`/debate/${reportData.discussionCode}`);
  };

  const onClickAnswer = () => {
    openModal({
      type: 'RaddModal',
      props: {
        declarationCode: reportData.declarationCode,
        userCode: reportData.userCode,
        declarationAnswer: answerContent,
      },
    });
  };

  const onClickDelete = () => {
    openModal({
      type: 'RdeleteModal',
      props: {
        declarationCode: reportData.declarationCode,
        userCode: reportData.userCode,
      },
    });
  };

  return (
    <StyleContactDetail>
      <div className="contact-detail">
        <div className="contact--title">
          <h1>
            <Text fontSize="xl">🚨 신고 게시물</Text>
          </h1>
        </div>
        <div className="user">
          <div className="user-container">
            <img className="img" src={reportData.profileImg} />
            <Text className="name">{reportData.nickname}</Text>
            <Text className="date">
              {reportData.createDate && getKST(reportData.createDate)}
            </Text>
          </div>
          <div className="content-container">
            <Text className="contents">{reportData.declarationReason}</Text>
          </div>
        </div>
        <div className="content">
          <div className="user-info">
            <Button onClick={discussionCodeHandler}>
              해당 게시물 보러가기
            </Button>
          </div>
          {reportData.declarationClear === 'N' && (
            <h3 className="body-title">
              <Text>답변 내용</Text>
            </h3>
          )}
          {reportData.declarationClear === 'Y' ? (
            <div className="afterProcess">
              <Text className="clear-answer">이미 답변된 신고글입니다</Text>
              <Button onClick={onClickDelete} className="button">
                삭제하기
              </Button>
            </div>
          ) : (
            <textarea
              className="body-input"
              value={answerContent}
              onChange={(e) => setAnswerContent(e.target.value)}
            />
          )}
          {reportData.declarationClear === 'Y' ? (
            <div></div>
          ) : (
            <div className="btn">
              <Button onClick={onClickDelete} className="button">
                삭제하기
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

  .afterProcess {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .contact-detail {
    width: 100%;
    max-width: 800px;
    margin-top: 3rem;
  }
  .user-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .user-info {
    margin-bottom: 1rem;
  }
  .user {
    width: 100%;
    display: flex;
    border-top: solid 1px;
    border-bottom: solid 1px;
    /* align-items: center; */
    padding: 10px 1rem;
    flex-direction: column;
    .name {
      margin-left: 10px;
      margin-right: auto;
    }
    .img {
      margin-top: 3px;
      margin-bottom: 3px;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
  }

  .content-container {
    margin-top: 1rem;
  }

  .contact--title {
    display: flex;

    justify-content: center;

    h1 {
      margin-bottom: 20px;
      font-weight: 400;
      font-size: 20px;
    }
  }
  .clear-answer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    font-size: 24px;
    margin-bottom: 1rem;
  }

  .body-title {
    margin-top: 24px;
    margin-bottom: 12px;
  }

  .content {
    padding: 1rem;
  }

  .user-info {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }

  .body-input {
    width: 100%;
    height: 250px;
    line-height: 25px;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    background-color: ${({ theme }) => theme.mode.background};
    color: ${({ theme }) => theme.mode.primaryText};
  }

  .btn {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
  }
`;
