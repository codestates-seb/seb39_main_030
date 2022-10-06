import styled from 'styled-components';
import React, { useEffect } from 'react';
import Item from '../../block/Carousel/Item';
import TagTab from './TagTab/TagTab';
import DebateList from './component/DebateList';
import { Text } from '../../atom/Text';
import { media } from '../../../style/media';
import Toggle from '../../atom/Toggle';
import { useDispatch } from 'react-redux';
import { toggleActions } from '../../../store/debateToggle-slice';
import { socket } from '../../../auth/SingletonSocket';

const LendingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('me', (id) => {
      console.log(id);
    });
  }, []);

  const toggleHandler = (state) => {
    dispatch(toggleActions.setToggle(state));
  };

  return (
    <StyledLendingPage>
      <SlickContainer>
        <Item />
      </SlickContainer>
      <TagTab />
      <div className="label">
        <Text className="label-debate" fontSize="xl" fontWeight="semiBold">
          토론 목록
        </Text>
        <Text className="label-possible" fontSize="xl" fontWeight="semiBold">
          바로 신청 가능한 토론만 보기
        </Text>
        <Toggle className="toggle-possible" ToggleHandler={toggleHandler} />
      </div>
      <DebateList />
    </StyledLendingPage>
  );
};

export default LendingPage;

const StyledLendingPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: auto;

  .contents {
    border: 1px solid ${({ theme }) => theme.mode.themeIcon};
    width: 300px;
    height: 400px;
    padding: 20px;
    margin: 2rem;
    border-radius: 20px;
  }

  .label {
    margin-top: 5rem;
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }

  .toggle-possible {
    margin-right: 5rem;
    ${media.custom('768px')} {
      margin-right: 2rem;
    }
  }

  .label-possible {
    display: inline-block;
    margin-left: auto;
    margin-right: 1rem;
    ${media.custom('768px')} {
      font-size: 17px;
    }
  }
  .label-debate {
    display: inline-block;
    margin-left: 3rem;
    ${media.custom('768px')} {
      display: none;
    }
  }
`;

const SlickContainer = styled.section`
  width: 100%;
  .slick-dots {
    .slick-active {
      button::before {
        color: ${({ theme }) => theme.mode.themeIcon};
      }
    }
    button::before {
      color: ${({ theme }) => theme.mode.themeIcon};
    }
  }
`;
