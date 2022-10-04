import React from 'react';
import styled from 'styled-components';
import { Tag } from './Tag';
import { Text } from '../../../atom/Text';

export default function UserTag({ inputTag, setInputTag }) {
  return (
    <StyleUserTag>
      <div className="user-tag">
        <Text className="user-tag-text">관심 토론 태그</Text>
        <Tag inputTag={inputTag} setInputTag={setInputTag} />
      </div>
      <p className="user-tag-info">관심 있는 토론 태그를 등록해주세요</p>
    </StyleUserTag>
  );
}

const StyleUserTag = styled.div`
  display: flex;
  flex-direction: column;

  .user-tag {
    display: flex;
    align-items: center;
  }
  .user-tag-text {
    font-size: 1.17em;
    font-weight: bold;
    margin-right: 1rem;
  }
  .user-tag-info {
    margin-top: 20px;
    border-bottom: solid 1px;
    color: #868e96;
    font-size: 0.875rem;
  }
`;
