import { axiosInstance } from '../../../axiosInstance';
import useModal from '../../app/hooks/useModal';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserInfo from './component/UserInfo';
import UserTag from './component/UserTag';
import { Text } from '../../atom/Text';
import { getStoredUser } from '../../../auth/user-storage';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
export const tagFilter = (arr) => arr.filter((el) => !Number(el));

export default function MyPage() {
  const { openModal } = useModal();
  const user = getStoredUser();
  const userCode = Number(user.userCode);
  const [userData, setUserData] = useState<any>(['']);
  const [inputNickName, setInputNickName] = useState<string>('');
  const [inputTag, setInputTag] = useState<any>(['']);
  const params = { userCode };

  const myPageFlag = useSelector((state: RootState) => state.myPage.flag);

  useEffect(() => {
    axiosInstance.get('/user/myInfo', { params }).then(function (response) {
      setUserData(response.data);
      setInputTag(tagFilter(Object.values(response.data.tags || { temp: '' })));
    });
  }, [myPageFlag]);

  const saveModalHandler = () => {
    openModal({
      type: 'SaveModal',
      props: {
        userCode: userData.userCode,
        nickname: inputNickName,
        profileImg: userData.profileImg,
        kakaoEmail: userData.kakaoEmail,
        tag: inputTag,
      },
    });
  };

  const leaveModalHandler = () => {
    openModal({
      type: 'LeaveModal',
      props: {
        userCode: userData.userCode,
        kakaoEmail: userData.kakaoEmail,
      },
    });
  };

  return (
    <StyleMyPage>
      <Text fontSize="xl" className="myPage-title">
        👤 마이페이지
      </Text>
      <div className="myPage-user-container">
        <UserInfo
          nickname={userData.nickname}
          profileImg={userData.profileImg}
          userLikes={userData.userLikes}
          setInputNickName={setInputNickName}
          inputNickName={inputNickName}
        />
        <div className="myPage-user-tag">
          <UserTag setInputTag={setInputTag} inputTag={inputTag} />
        </div>
      </div>
      <div className="myPage-Button">
        <button className="comp" onClick={saveModalHandler}>
          정보변경
        </button>
        <button className="end" onClick={leaveModalHandler}>
          회원탈퇴
        </button>
      </div>
    </StyleMyPage>
  );
}

const StyleMyPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 2rem;

  .myPage-title {
    margin-top: 2rem;
    font-size: 24px;
  }

  .myPage-user-container {
    margin-top: 1rem;
    width: 100%;
    max-width: 600px;
    padding: 1rem;
  }

  .myPage-user-tag {
    margin-top: 7rem;
  }
  .myPage-Button {
    display: flex;
    justify-content: center;
    margin-top: 24px;
  }
  .comp {
    font-weight: 700;
    color: #fff;
    border-radius: 4px;
    width: 100px;
    margin-right: 10px;
    height: 2rem;
    font-size: 1rem;
    background-color: black;
    outline: none;
    border: none;
    cursor: pointer;
  }
  .end {
    font-weight: 700;
    color: #fff;
    border-radius: 4px;
    width: 100px;
    margin-right: 10px;
    height: 2rem;
    font-size: 1rem;
    background-color: red;
    outline: none;
    border: none;
    cursor: pointer;
  }
`;
