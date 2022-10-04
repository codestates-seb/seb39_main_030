import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../../store/uiSlice/modal-slice';

const useModal = () => {
  const dispatch = useDispatch();

  const openModalHandler = ({ type, props = null }) => {
    dispatch(openModal({ type, props }));
  };

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  return { openModal: openModalHandler, closeModal: closeModalHandler };
};

export default useModal;
