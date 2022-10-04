import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import useOutSideClick from '../../app/hooks/useOutSideClick';

import { IoIosClose } from 'react-icons/io';

const Modal = ({ onClose, children }) => {
  const modalRef = useRef(null);
  const closeHandler = () => {
    onClose?.();
  };

  useOutSideClick(modalRef, closeHandler);

  useEffect(() => {
    const $body = document.querySelector('body');
    $body.style.overflow = 'hidden';
    return () => {
      $body.style.overflow = 'auto';
    };
  }, []);

  return (
    <Overlay>
      <ModalWrap ref={modalRef}>
        <IoIosClose className="close-btn" onClick={closeHandler} />
        <main>{children}</main>
      </ModalWrap>
    </Overlay>
  );
};

export default Modal;

export const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1111;
`;

const ModalWrap = styled.div`
  width: fit-content;
  max-width: 800px;
  min-width: 230px;
  height: fit-content;
  border-radius: 15px;
  background: ${({ theme }) => theme.mode.background};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .close-btn {
    align-self: flex-end;
    width: 30px;
    height: 30px;
    cursor: pointer;
    color: ${({ theme }) => theme.mode.themeIcon};
  }
`;
