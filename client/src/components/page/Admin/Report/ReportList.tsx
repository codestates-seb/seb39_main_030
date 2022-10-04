import { axiosInstance } from '../../../../axiosInstance';
import Button from '../../../atom/Button';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Report from './Report';
import { Text } from '../../../atom/Text';

export default function ReportList() {
  const [reportList, setReportList] = useState<any>([]);
  const [reportPage, setReportPage] = useState<any>([]);

  const [page, setPage] = useState<number>(0);

  const params = { page: page, size: 5 };
  useEffect(() => {
    axiosInstance.get('/declaration/all', { params }).then(function (response) {
      setReportList(response.data.data);
      setReportPage(response.data.pageInfo);
    });
  }, [page]);

  const previousBtn = () => {
    setPage((page) => page - 1);
  };

  const nextBtn = async () => {
    setPage(page + 1);
  };

  return (
    <StyleContactList>
      <Text className="title">🚨 신고 받은 목록</Text>
      <div>
        {reportList.map((data) => (
          <Report
            key={data.declarationCode}
            declarationCode={data.declarationCode}
            discussionCode={data.discussionCode}
            userCode={data.userCode}
            nickname={data.nickname}
            profileImg={data.profileImg}
            declarationCreateDate={data.declarationCreateDate}
          />
        ))}
      </div>
      <div>
        <div className="pages">
          <Text>
            현재 페이지:{page + 1} 총 페이지:{reportPage.totalPages}
          </Text>
        </div>
        <div className="btn">
          <Button disabled={page < 1} onClick={previousBtn}>
            이전
          </Button>
          <Button
            onClick={nextBtn}
            disabled={page >= reportPage.totalPages - 1}
          >
            다음
          </Button>
        </div>
      </div>
    </StyleContactList>
  );
}

// declarationCode : int,
// discussionCode : string,
// userCode : int,
// nickname :  string,
// profileImg : string

const StyleContactList = styled.div`
  /* overflow: scroll; */
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.mode.divider};
  width: 100%;
  padding: 2rem;
  max-width: 400px;

  .title {
    font-size: 20px;
    font-family: sans-serif;
    margin-bottom: 2rem;
  }

  .pages {
    display: flex;
    justify-content: center;
    margin-bottom: 12px;
    margin-top: 12px;
  }

  .btn {
    display: flex;
    justify-content: space-between;
  }
`;
