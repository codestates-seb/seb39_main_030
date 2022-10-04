import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import QuestionList from './QuestionList/QuestionList';
import DiscussionList from './DiscussionList/DiscussionList';
import DeclarationList from './DeclarationList/DeclarationList';
import CommentList from './CommentList/CommentList';

const MyViewPage = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    { name: '작성한 토론글 목록', content: <DiscussionList /> },
    { name: '작성한 코멘트 목록', content: <CommentList /> },
    { name: '작성한 문의 목록', content: <QuestionList /> },
    { name: '신고한 목록', content: <DeclarationList /> },
  ];

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
  };

  return (
    <>
      <TabMenu>
        {menuArr.map((ele, index) => {
          return (
            <li
              key={index}
              className={currentTab === index ? 'submenu focused' : 'submenu'}
              onClick={() => selectMenuHandler(index)}
            >
              {ele.name}
            </li>
          );
        })}
      </TabMenu>
      <Desc>{menuArr[currentTab].content}</Desc>
    </>
  );
};

export default MyViewPage;

const TabMenu = styled.ul`
  background-color: #dcdcdc;
  color: rgba(73, 73, 73, 0.5);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  list-style: none;
  margin-bottom: 2rem;

  .submenu {
    width: 100%;
    padding: 15px 10px;
    cursor: pointer;
  }

  .focused {
    background-color: #4000c7;
    color: rgba(255, 255, 255, 1);
    transition: 0.3s;
  }

  & div.desc {
    text-align: center;
  }
`;

const Desc = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  /* background-color: black; */
`;
