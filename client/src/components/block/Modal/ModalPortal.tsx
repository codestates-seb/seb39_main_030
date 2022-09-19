import { createPortal } from 'react-dom';
import { modalSelector } from '../../../store/uiSlice/modal-slice';
import { useSelector } from 'react-redux';

import SimpleModal from './SimpleModal';
import Login from '../../../auth/Login';
import useModal from '../../app/hooks/useModal';
import Logout from '../../../auth/Logout';

const MODAL_COMPONENTS = {
  simple: SimpleModal,
  login: Login,
  logout: Logout,
};

const ModalPortal = () => {
  const { closeModal } = useModal();
  const { type, props } = useSelector(modalSelector);

  if (!type) {
    return null;
  }

  const Modal = MODAL_COMPONENTS[type];

  return createPortal(
    <>
      <Modal {...props} onClose={closeModal} />
    </>,
    document.getElementById('modal')
  );
};

export default ModalPortal;
