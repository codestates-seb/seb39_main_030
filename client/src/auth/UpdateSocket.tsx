import { useEffect, useState } from 'react';
import Loading from '../components/app/Loading';
import useSocket from '../components/page/VideoChat/hooks/useSocket';
import { clearStoredUser, getStoredUser, setStoredUser } from './user-storage';
import { useLocation, useNavigate } from 'react-router-dom';
import { userActions } from '../store/user-slice';
import { toast } from 'react-toastify';
import { basicToastOption } from '../components/app/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from './SingletonSocket';
import { socketActions } from '../store/socket-slice';
import { RootState } from '../store';
import useModal from '../components/app/hooks/useModal';
import { signal } from '../store/uiSlice/modal-slice';

const UpdateSocket = () => {
  const dispatch = useDispatch();
  const user = getStoredUser();
  const updateSocketId = useSocket();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const { openModal } = useModal();

  useEffect(() => {
    switch (state) {
      case 'logout':
        console.log(user?.userCode);
        socket.emit('forceDisconnect', { userCode: user?.userCode });
        updateSocketId({
          userCode: Number(user?.userCode),
          socketId: '',
        });
        clearStoredUser();
        dispatch(userActions.change());
        toast.info('로그아웃이 완료되었습니다.', {
          position: 'top-center',
          ...basicToastOption,
        });
        navigate('/');
        break;

      default:
        if (user?.socketId) {
          console.log('ex', user);
          socket.on('me', (id) => {
            dispatch(socketActions.setSocketId(id));
            setStoredUser({
              ...user,
              socketId: id,
              temp: Number(user?.userCode) + 1,
            });
            socket.emit('setUserCode', {
              userCode: Number(user?.userCode) + 1,
              socketId: id,
            });
            navigate('/');
          });
        } else {
          console.log('정식', user);
          socket.on('me', (id) => {
            dispatch(socketActions.setSocketId(id));
            socket.emit('setUserCode', {
              userCode: user.userCode,
              socketId: id,
            });
            setStoredUser({ ...user, socketId: id });
            updateSocketId({
              userCode: Number(user.userCode),
              socketId: id,
            });
          });
        }
        break;
    }
  }, []);

  useEffect(() => {
    socket.on('receiveFight', (data) => {
      dispatch(signal(true));
      // dispatch(socketActions.signal(true));
      toast.info('토론 신청이 왔습니다!.', {
        position: 'top-center',
        ...basicToastOption,
      });
      openModal({
        type: 'fightModal',
        props: { fightUser: data },
      });
    });
  }, []);

  // useEffect(() => {
  //   const user = getStoredUser();
  //   console.log(user && user.socketId);
  //   if (socketSignal) {
  //   }
  // }, [socketSignal]);

  return (
    <div>
      <Loading sub={false} />
    </div>
  );
};

export default UpdateSocket;