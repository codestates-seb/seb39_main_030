import useModal from '../../app/hooks/useModal';
import React from 'react';
import styled from 'styled-components';

const AddDebatePage = () => {
  const { openModal } = useModal();

  const onClickButton = () => {
    openModal({ type: 'login' });
  };
  return (
    <div>
      <Container></Container>
      <button onClick={onClickButton}>click!!(Modal Test)</button>
      AddDebatePage
    </div>
  );
};

export default AddDebatePage;

const Container = styled.div`
  overflow: hidden;
`;
