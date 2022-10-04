import { axiosInstance } from '../../../../axiosInstance';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Discussion from './Discussion';
import { getKST } from '../../../app/util';

export default function DiscussionList() {
  const [discussionList, setDiscussionList] = useState<any>([]);
  const [userImg, setUserImg] = useState<string>();

  const userCode = 1001;
  const params = { userCode };
  useEffect(() => {
    axiosInstance.get('/user/lists', { params }).then(function (response) {
      setDiscussionList(response.data.discussionLists);
      setUserImg(response.data.profileImg);
    });
  }, []);

  return (
    <StyleContactList>
      <div className="discussions">
        {discussionList.map((data) => (
          <Discussion
            key={data.discussionCode}
            discussionTitle={data.discussionTitle}
            discussionCode={data.discussionCode}
            discussionCreateDate={
              data.discussionCreateDate && getKST(data.discussionCreateDate)
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

  .title {
    margin-bottom: 1rem;
  }
  .discussions {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;
