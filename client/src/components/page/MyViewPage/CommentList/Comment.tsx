import React from 'react';
import styled from 'styled-components';
import { Text } from '../../../atom/Text';
import { media } from '../../../../style/media';

export default function Comment(props: any) {
  return (
    <StyledContact>
      <div className="comment-userInfo">
        <img className="img" src={props.profileImg} />
        <Text className="commentTitle-list" fontSize="lg">
          {props.commentContents}
        </Text>
      </div>
      <Text className="commentDate" fontSize="lg">
        {props.commentCreateDate}
      </Text>
    </StyledContact>
  );
}

const StyledContact = styled.div`
  display: flex;
  min-height: 70px;

  border-bottom: solid 1px;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  ${media.custom('768px')} {
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;
    .comment-userInfo {
      margin-bottom: 1rem;
    }
    .commentDate {
      align-self: flex-end;
    }
  }

  .comment-userInfo {
    display: flex;
    align-items: center;
  }

  .commentTitle-list {
    margin-left: 1rem;
    word-break: break-all;
  }

  .img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
`;
