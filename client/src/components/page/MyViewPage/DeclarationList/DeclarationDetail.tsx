import { axiosInstance } from '../../../../axiosInstance';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from '../../../atom/Text';
import { GrUserManager } from 'react-icons/gr';
import { getStoredUser } from '../../../../auth/user-storage';

export default function DeclarationDetail() {
  const { declarationCode }: any = useParams();
  const [declarationData, setDeclarationData] = useState<any>([]);
  const user = getStoredUser();
  const params = {
    declarationCode,
    userCode: user.userCode,
  };
  useEffect(() => {
    console.log(declarationData);
    axiosInstance.get('/declaration', { params }).then(function (response) {
      setDeclarationData(response.data);
    });
  }, []);

  return (
    <StyleQuestionDetail>
      <div className="Container">
        <div className="user">
          <GrUserManager />
          <Text fontWeight="semiBold" className="name">
            관리자 답변
          </Text>
        </div>
        <Text className="admin-answer">
          {declarationData.declarationAnswer}
        </Text>
      </div>
    </StyleQuestionDetail>
  );
}

const StyleQuestionDetail = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .Container {
    width: 100%;
    max-width: 800px;
  }

  .user {
    display: flex;
    border-top: solid 1px;
    border-bottom: solid 1px;
    align-items: center;
    padding: 10px 1rem;

    svg {
      margin-top: 3px;
      margin-bottom: 3px;
      width: 3rem;
      height: 3rem;
      color: ${({ theme }) => theme.mode.themeIcon};
    }
  }

  .admin-answer {
    margin-top: 0.5rem;
    padding: 1rem;
    line-height: 25px;
  }
`;
