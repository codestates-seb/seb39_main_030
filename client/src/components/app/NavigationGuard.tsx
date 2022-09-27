import { usePrompt } from './hooks/usePrompt';
import { ReactNode } from 'react';
import styled from 'styled-components';
import Button from '../atom/Button';
import { Text } from '../atom/Text';

type ModalProps = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  children: ReactNode;
};

export const Modal = ({
  visible,
  onCancel,
  onConfirm,
  children,
}: ModalProps) => {
  const confirm = () => {
    onCancel();
    onConfirm();
  };
  return (
    <StyledModal>
      {visible && (
        <div className="modal_container">
          <div className="bg_modal" />
          <div className="inner_modal">
            <Text className="modal_body">{children}</Text>
            <div className="modal_foot">
              <Button onClick={() => onCancel()} type="button">
                No
              </Button>
              <Button onClick={confirm}>Yes</Button>
            </div>
            <button
              onClick={() => onCancel()}
              type="button"
              className="btn_close"
            >
              <Text fontSize="lg">x</Text>
            </button>
          </div>
        </div>
      )}
    </StyledModal>
  );
};

const StyledModal = styled.div`
  .modal_container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .inner_modal {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      width: 400px;
      height: 150px;
      border-radius: 6px;
      box-shadow: 0 2px 10px 0 ${({ theme }) => theme.mode.themeIcon};
      background-color: ${({ theme }) => theme.mode.mainBackground};
      .modal_body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60%;
        padding: 1rem;
        margin-bottom: -1rem;
        line-height: 25px;
      }
      .modal_foot {
        display: flex;
        justify-content: center;
        align-items: center;
        ${Button} {
          margin: 0 1rem;
        }
      }
    }
    .btn_close {
      position: absolute;
      right: 0;
      top: 0;
      padding: 3px 10px;
      font-size: 20px;
      background-color: ${({ theme }) => theme.mode.mainBackground};
      border: none;
      cursor: pointer;
      & span {
        cursor: pointer;
      }
    }
  }
`;

type NavigationGuardProps = {
  message?: string;
  when: boolean;
};

export const NavigationGuard = ({
  when,
  message = 'Are you sure to leave this page?',
}: NavigationGuardProps) => {
  const { showPrompt, confirmNavigation, cancelNavigation } = usePrompt(when);

  const handleClickNo = () => {
    cancelNavigation();
  };

  const handleClickYes = () => {
    confirmNavigation();
  };

  return (
    <Modal
      visible={showPrompt}
      onCancel={handleClickNo}
      onConfirm={handleClickYes}
    >
      {message}
    </Modal>
  );
};
