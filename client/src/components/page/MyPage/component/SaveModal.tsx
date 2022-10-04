import styled from 'styled-components';
import Button from '../../../atom/Button';
import { axiosInstance } from '../../../../axiosInstance';
import Modal from '../../../block/Modal/Modal';
import { Text } from '../../../atom/Text';
import { getStoredUser, setStoredUser } from '../../../../auth/user-storage';
import { toast } from 'react-toastify';
import { basicToastOption } from '../../../app/Layout';
import { useDispatch } from 'react-redux';
import { myPageActions } from '../../../../store/myPage';

const SaveModal = ({
  onClose,
  userCode,
  nickname,
  profileImg,
  kakaoEmail,
  tag,
}) => {
  const dispatch = useDispatch();
  const addModalHandler = async () => {
    const user = getStoredUser();
    await axiosInstance
      .post('/user/myInfo', {
        userCode: userCode,
        nickname: nickname || user.nickname,
        profileImg: profileImg,
        kakaoEmail: kakaoEmail || 'null@null.com',
        tag1: tag[0] || '1',
        tag2: tag[1] || '2',
        tag3: tag[2] || '3',
      })
      .then((res) => {
        onClose();
        setStoredUser(res.data);
        dispatch(myPageActions.changeUserInfo());
        toast.success('유저 정보가 변경되었습니다.', {
          position: 'top-center',
          ...basicToastOption,
        });
      })
      .catch(() => {
        onClose();

        toast.error('서버에 문제가 발생했습니다.', {
          position: 'top-center',
          ...basicToastOption,
        });
      });
  };

  return (
    <Modal onClose={onClose}>
      <StyledLogout>
        <Text className="title" fontSize="md" fontWeight="semiBold">
          저장하시겠습니까?
        </Text>
        <div className="button">
          <Button onClick={addModalHandler}>예</Button>
          <Button onClick={onClose}>아니오</Button>
        </div>
      </StyledLogout>
    </Modal>
  );
};

export default SaveModal;

const StyledLogout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;

  .button {
    margin-top: 20px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
  }

  ${Button} {
    margin: 10px;
    height: 30px;
    width: 15vw;
    max-width: 200px;
    min-width: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 600;
  }
`;
