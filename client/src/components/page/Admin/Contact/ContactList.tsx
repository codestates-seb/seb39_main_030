import { axiosInstance } from '../../../../axiosInstance';
import Button from '../../../atom/Button';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Contact from './Contact';
import { Text } from '../../../atom/Text';

export default function ContactList() {
  const [contactList, setContactList] = useState<any>([]);
  const [contactPage, setContactPage] = useState<any>([]);
  const [page, setPage] = useState<number>(0);

  const params = { page: page, size: 5 };

  useEffect(() => {
    axiosInstance.get('/question/all', { params }).then(function (response) {
      setContactList(response.data.data);
      setContactPage(response.data.pageInfo);
    });
  }, [page]);

  const previousBtn = () => {
    setPage((page) => page - 1);
  };

  const nextBtn = () => {
    // dispatch(adminActions.upContactPage());
    setPage((page) => page + 1);
  };

  return (
    <StyleContactList>
      <Text className="title">📑 문의 목록</Text>
      {contactList?.map((data) => (
        <Contact
          key={data.questionCode}
          questionTitle={data.questionTitle}
          questionContents={data.questionContents}
          userCode={data.userCode}
          questionCreateDate={data.questionCreateDate}
          questionCode={data.questionCode}
          nickname={data.nickname}
          questionClear={data.questionClear}
          page={contactPage.totalPages}
        />
      ))}
      <div className="pages">
        <Text>
          현재 페이지:{page + 1} 총 페이지:{contactPage.totalPages}
        </Text>
      </div>
      <div className="btn">
        <Button disabled={page < 1} onClick={previousBtn}>
          이전
        </Button>
        <Button disabled={page >= contactPage.totalPages - 1} onClick={nextBtn}>
          다음
        </Button>
      </div>
    </StyleContactList>
  );
}

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
