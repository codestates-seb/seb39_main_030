import { axiosInstance } from '../../../../axiosInstance';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Declaration from './Declaration';
import { getKST } from '../../../app/util';

export default function DeclarationList() {
  const [declarationList, setDeclarationList] = useState<any>([]);
  const [userImg, setUserImg] = useState<string>();
  const userCode = 1001;
  const params = { userCode };
  useEffect(() => {
    axiosInstance.get('/user/lists', { params }).then(function (response) {
      setDeclarationList(response.data.declarationLists);
      setUserImg(response.data.profileImg);
    });
  }, []);

  return (
    <StyleContactList>
      <div className="declaration">
        {declarationList.map((data) => (
          <Declaration
            key={data.declarationCode}
            ddeclarationReason={data.declarationReason}
            declarationCode={data.declarationCode}
            declarationCreateDate={
              data.declarationCreateDate && getKST(data.declarationCreateDate)
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
