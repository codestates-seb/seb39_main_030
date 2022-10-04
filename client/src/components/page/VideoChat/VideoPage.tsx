import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import { Text } from '../../atom/Text';
import { media } from '../../../style/media';
import { getMedia } from './util';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../atom/Button';
import Loading from '../../app/Loading';
import { socket } from '../../../auth/SingletonSocket';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { toast } from 'react-toastify';
import { basicToastOption } from '../../app/Layout';
import { getStoredUser } from '../../../auth/user-storage';
import useModal from '../../app/hooks/useModal';

interface 도전자 {
  SlaveUserCode: string;
  SlaveSocketId: string;
}

const VideoPage = () => {
  const [masterWaiting, setMasterWaiting] = useState<boolean>(true);
  const mySocketId = useSelector((state: RootState) => state.socket.socketId);
  const [stream, setStream] = useState<any>();
  const myVideo = useRef<any>();
  const userVideo = useRef<any>();
  const connectionRef = useRef<any>();
  const [callAccepted, setCallAccepted] = useState<any>(false);
  const [callEnded, setCallEnded] = useState<any>(false);
  const [receivingCall, setReceivingCall] = useState<any>(false);
  const [caller, setCaller] = useState<any>('');
  const [callerSignal, setCallerSignal] = useState<any>();
  const [masterUserCode, setMasterUserCode] = useState<string>('');
  const navigate = useNavigate();
  const user = getStoredUser();
  const { openModal } = useModal();

  const location = useLocation();
  const 도전자 = location.state as 도전자;
  useEffect(() => {
    if (도전자) {
      console.log('도전자 id', 도전자.SlaveSocketId);
      console.log('내 id', mySocketId);
    }
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
          // console.log(myVideo.current);
        }
      });
    socket.on('callUser', (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
      setMasterUserCode(data.userCode);
    });

    socket.on('callEnded', () => {
      setCallEnded(true);
      connectionRef.current.destroy();
      navigate('/');
      toast.info(
        '상대방이 토론을 끝냈습니다. 상대의 방명록에 글을 남겨보세요.',
        {
          position: 'top-center',
          ...basicToastOption,
        }
      );
    });
  }, []);

  const callUser = (id: any) => {
    setMasterWaiting(false);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: mySocketId,
        user: user.userCode,
      });
    });
    peer.on('stream', (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: caller });
    });
    peer.on('stream', (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    socket.emit('end', {
      targetUserId: caller || 도전자.SlaveSocketId,
    });
    setCallEnded(true);
    connectionRef.current.destroy();
    navigate('/');
    openModal({
      type: 'guestbook',
      props: {
        userCode: masterUserCode || user.userCode,
        nickname: '방금 토론한 상대',
      },
    });
    toast.info('토론을 끝냈습니다. 상대방의 방명록에 글을 남겨보세요.', {
      position: 'top-center',
      ...basicToastOption,
    });
  };

  return (
    <StyledVideoPage>
      <div className="video-title">
        <Text fontWeight="semiBold" fontSize="lg">
          토론방
        </Text>
      </div>
      <VideoContainer>
        <div className="video">
          <video
            playsInline
            muted
            style={{ width: '100%' }}
            ref={myVideo}
            autoPlay
          />
        </div>
        <div className="video">
          {callAccepted && !callEnded ? (
            <video
              playsInline
              muted
              ref={userVideo}
              autoPlay
              style={{ width: '100%' }}
            />
          ) : null}
        </div>
      </VideoContainer>
      {도전자 && !callAccepted && (
        <div className="debate-start">
          {masterWaiting && (
            <Text className="start-msg">
              토론 준비가 되었으면 시작 버튼을 눌러주세요.
            </Text>
          )}
          {masterWaiting ? (
            <Button onClick={() => callUser(도전자.SlaveSocketId)}>
              시작하기
            </Button>
          ) : (
            <div>
              <Text className="waiting-msg">
                상대가 준비 중입니다. 잠시만 기다려주세요.
              </Text>
              <Loading sub={true} />
            </div>
          )}
        </div>
      )}

      {!도전자 && !callAccepted && (
        <div className="debate-start">
          {receivingCall && !callAccepted ? (
            <Text className="start-msg">
              상대가 토론 신청을 수락했습니다. 토론을 시작하시겠습니까?
            </Text>
          ) : (
            <Text className="waiting-msg">상대를 기다리는 중입니다...</Text>
          )}
          {receivingCall && !callAccepted ? (
            <Button onClick={answerCall}>시작하기</Button>
          ) : (
            <Loading sub={true} />
          )}
        </div>
      )}

      {callAccepted && (
        <Button className="end-debate--button" onClick={leaveCall}>
          토론 끝내기
        </Button>
      )}
    </StyledVideoPage>
  );
};

// 신청자의 상태 => FightUserData
// 1. 신청 후 상대를 기다리고 있는 상태 slaveWaiting
// 2. 상대방이 콜을 보내서 최종 승낙 버튼이 나온 상태
// 3. 매칭

// 주인의 상태 => FightUserData
// 1. 토론 준비 시작버튼 누른 상태
// 2. 시작버튼 누르고, 콜을 기다리는 상태
// 3. 매칭

export default VideoPage;

const StyledVideoPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  & .video-title {
    margin-bottom: 1rem;
  }

  & .debate-start {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    .start-msg {
      margin-bottom: 1rem;
    }
    .waiting-msg {
      margin-bottom: 4rem;
    }
  }

  & .end-debate--button {
    margin-top: 1rem;
  }
`;

const VideoContainer = styled.section`
  display: flex;
  & .video {
    display: inline-block;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  ${media.custom('768px')} {
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
  }
`;

// 1. 고길동이 둘리 게시물의 토론신청 버튼 클릭 : 클라emit("fight"){ 고길동의 id, 둘리의 id }
// 2. 서버on("fight"){ 서버emit(to 둘리){ 고길동의 id } }
// 3. 둘리의on("fight")  { 요청 왔습니다. 모달을 띄운다. }
// 4. 둘리가 수락하거나 거절을 한다.
// 5. 수락할 경우
// 6. 둘리의 emit("callUser") { }
// 7. 서버의 on("callUser") { 고길동한테 보낸다 (코드참조)}
// 8. 고길동의 on("callUser") { 고길동의 emit("answerCall")기존 코드의 전화버튼을 누를시 응답이 아닌 바로 응답. }
// 9. 서버의 on("answerCall") { 서버emit("callAccepted")  }