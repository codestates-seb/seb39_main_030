import { axiosInstance } from '../../../../axiosInstance';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import { getKST } from '../../../app/util';
import { getStoredUser } from '../../../../auth/user-storage';

export default function CommentList() {
  const [commentList, setCommentList] = useState<any>([]);
  const [userImg, setUserImg] = useState<string>();
  const user = getStoredUser();
  console.log(commentList);

  const userCode = user.userCode;
  const params = { userCode };
  useEffect(() => {
    axiosInstance.get('/user/lists', { params }).then(function (response) {
      setCommentList(response.data.commentLists);
      setUserImg(response.data.profileImg);
    });
  }, []);

  return (
    <StyleContactList>
      <div className="comments">
        {commentList.map((data) => (
          <Comment
            key={data.commentCode}
            commentContents={data.commentContents}
            commentCode={data.commentCode}
            commentCreateDate={
              data.commentCreateDate && getKST(data.commentCreateDate)
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
  width: 100%;
  max-width: 800px;
  .info {
    display: flex;
  }

  .commentTitle {
    margin-bottom: 1rem;
  }
  .comments {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;
