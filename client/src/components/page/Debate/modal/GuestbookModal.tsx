import styled from 'styled-components';
import Modal from '../../../block/Modal/Modal';
import { Text } from '../../../atom/Text';
import useGuestbook from '../hooks/useGetGuestbook';
import DebateCommentInput from '../component/DebateCommentInput';
import GuestbookList from '../component/GuestbookList';
import { useEffect, useState } from 'react';
import { getStoredUser } from '../../../../auth/user-storage';
import { getKST } from '../../../app/util';
import useAddGuestBook from '../hooks/useAddGuestBook';
import useUpdateGuestBook from '../hooks/useUpdateGuestbook';
import { axiosInstance } from '../../../../axiosInstance';
import { tagFilter } from '../../MyPage/MyPage';

const GuestbookModal = ({ onClose, userCode, nickname }) => {
  const user = getStoredUser();
  const { guestbookList } = useGuestbook(userCode);
  const [guestIdx, setGuestIdx] = useState<number>(null);
  const addGuestBook = useAddGuestBook();
  const updateGuestBook = useUpdateGuestBook();
  const [tag, setTag] = useState<string>('');

  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = async () => {
    const params = { userCode };
    const { data } = await axiosInstance.get('/user/myInfo', { params });
    data.tag && setTag(tagFilter(Object.values(data.tags)).toString());
  };

  const modifyControlHandler = (idx) => {
    if (guestIdx === idx) setGuestIdx(null);
    else setGuestIdx(idx);
  };

  const addGuestBookHandler = (text, ref) => {
    addGuestBook({
      userCode: userCode,
      guestCode: Number(user.userCode),
      guestbookContents: text,
    });
    ref.value = '';
  };

  const updateGuestBookHandler = (text, ref) => {
    updateGuestBook({
      bookCode: guestbookList[guestIdx].bookCode,
      userCode: Number(user.userCode),
      guestbookContents: text,
    });
    ref.value = '';
  };

  return (
    <Modal onClose={onClose}>
      <StyledUserInfoModal>
        <div className="gs-title">
          <Text fontSize="md">{nickname}님의 방명록 👀</Text>
        </div>
        <div className="gs-tag">
          <Text fontSize="sm">🏷 관심 태그 : {tag}</Text>
        </div>
        <DebateCommentInput
          type="main"
          isSelected={true}
          placeHolder={'방명록 작성'}
          updateText={null}
          handler={addGuestBookHandler}
        />
        <hr />
        <div className="guestbook">
          {guestbookList?.map((guestbook, idx) => (
            <ul key={idx}>
              <GuestbookList
                getKST={getKST}
                comment={guestbook}
                sameUser={user && Number(user.userCode) === guestbook.guestCode}
                modifyHandler={() => modifyControlHandler(idx)}
                isSelected={guestIdx === idx}
              />
              {guestIdx === idx ? null : <hr className="custom-hr-thin" />}
              <DebateCommentInput
                type="updateGuestbook"
                isSelected={guestIdx === idx}
                placeHolder={'수정내용 작성'}
                updateText={guestbook.contents}
                handler={updateGuestBookHandler}
              />
              {guestIdx === idx ? <hr className="custom-hr-thin" /> : null}
            </ul>
          ))}
        </div>
      </StyledUserInfoModal>
    </Modal>
  );
};

export default GuestbookModal;

const StyledUserInfoModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .gs-title {
    text-align: center;
  }

  .gs-tag {
    text-align: right;
    margin-right: 1rem;
    margin-top: 10px;
  }

  .guestbook {
    height: 20rem;
    overflow-y: scroll;
  }

  .guestbook::-webkit-scrollbar {
    width: 10px;
  }
  .guestbook::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.mode.themeIcon};
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  .guestbook::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.mode.background};
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px ${({ theme }) => theme.mode.divider};
  }
`;
