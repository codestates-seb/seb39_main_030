import styled from 'styled-components';
import React from 'react';
import { Text } from '../../atom/Text';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LendingPage = () => {
  return (
    <StyledLendingPage>
      <div className="contents">
        <Text className="title" fontSize="xl" fontWeight="extraBold">
          여기에 컨텐츠 내용이 들어갑니다.
          <button
            onClick={() => {
              toast.success('🦄 Wow so easy!', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }}
          >
            test
          </button>
        </Text>
      </div>
      <div className="contents">
        <Text className="title" fontSize="xl" fontWeight="extraBold">
          여기에 컨텐츠 내용이 들어갑니다.
        </Text>
      </div>
      <div className="contents">
        <Text className="title" fontSize="xl" fontWeight="extraBold">
          여기에 컨텐츠 내용이 들어갑니다.
        </Text>
      </div>
      <div className="contents">
        <Text className="title" fontSize="xl" fontWeight="extraBold">
          여기에 컨텐츠 내용이 들어갑니다.
        </Text>
      </div>
      <div className="contents">
        <Text className="title" fontSize="xl" fontWeight="extraBold">
          여기에 컨텐츠 내용이 들어갑니다.
        </Text>
      </div>
      <div className="contents">
        <Text className="title" fontSize="xl" fontWeight="extraBold">
          여기에 컨텐츠 내용이 들어갑니다.
        </Text>
      </div>
    </StyledLendingPage>
  );
};

export default LendingPage;

const StyledLendingPage = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px;

  .contents {
    border: 1px solid ${({ theme }) => theme.mode.themeIcon};
    width: 300px;
    height: 400px;
    padding: 20px;
    margin: 2rem;
    border-radius: 20px;
  }
`;
