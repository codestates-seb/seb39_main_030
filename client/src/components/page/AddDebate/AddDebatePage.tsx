import useModal from '../../app/hooks/useModal';
import React from 'react';

const AddDebatePage = () => {
  const { openModal } = useModal();

  const onClickButton = () => {
    openModal({ type: 'login' });
  };
  return (
    <div>
      <button onClick={onClickButton}>click!!(Modal Test)</button>
      AddDebatePage
    </div>
  );
};

export default AddDebatePage;
