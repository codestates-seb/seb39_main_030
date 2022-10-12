import { createPortal } from 'react-dom';
import { modalSelector } from '../../../store/uiSlice/modal-slice';
import { useSelector } from 'react-redux';

import SimpleModal from './SimpleModal';
import Login from '../../../auth/Login';
import useModal from '../../app/hooks/useModal';
import Logout from '../../../auth/Logout';
import DebateConfirmModal from '../../page/AddDebate/component/DebateConfirmModal';
import GuestbookModal from '../../page/Debate/modal/GuestbookModal';
import DebateUpdateModal from '../../page/Debate/modal/DebateUpdateModal';
import DebateDeleteModal from '../../page/Debate/modal/DebateDeleteModal';
import AddDeclarationModal from '../../page/Debate/modal/AddDeclarationModal';
import addModal from '../../page/AdminContact/addModal';
import CdeleteModal from '../../page/Admin/Contact/CdeleteModal';
import CaddModal from '../../page/Admin/Contact/CaddModal';
import RaddModal from '../../page/Admin/Report/RaddModal';
import RdeleteModal from '../../page/Admin/Report/RdeleteModal';
import SaveModal from '../../page/MyPage/component/SaveModal';
import LeaveModal from '../../page/MyPage/component/LeaveModal';
import FightModal from '../../page/VideoChat/FightModal';
import InfoModal from '../../page/Lending/InfoModal';

const MODAL_COMPONENTS = {
  simple: SimpleModal,
  login: Login,
  logout: Logout,
  addDebate: DebateConfirmModal,
  guestbook: GuestbookModal,
  updateDebate: DebateUpdateModal,
  deleteDebate: DebateDeleteModal,
  addDeclaration: AddDeclarationModal,
  addModal: addModal,
  CdeleteModal: CdeleteModal,
  CaddModal: CaddModal,
  RaddModal: RaddModal,
  RdeleteModal: RdeleteModal,
  SaveModal: SaveModal,
  LeaveModal: LeaveModal,
  fightModal: FightModal,
  infoModal: InfoModal,
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
