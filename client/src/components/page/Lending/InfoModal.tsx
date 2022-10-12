import Modal from '../../block/Modal/Modal';
import { Text } from '../../atom/Text';
import styled from 'styled-components';

const InfoModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <StyledSimpleModal>
        <Text>--- 데모데이 안내문</Text>
        <Text fontSize="md" className="content">
          1. 헤더의 로그인(데스크톱), 로그인 아이콘(모바일)을 클릭하면 바로
          카카오톡을 통해 로그인 할 수 있습니다. 로그인 후 프로필을 누르면
          마이페이지, 글쓴 목록 조회, 로그아웃을 할 수 있습니다.
          <br /> <br />
          2. 검색, 다크모드, crud, 신고, 좋아요 등 모든 기능이 작동합니다.
          마음껏 게시글과 댓글을 쓰고 수정, 삭제해보세요. (모든 페이지가
          반응형으로, 모바일 크기에선 헤더가 햄버거 메뉴로 변화됩니다.)
          <br /> <br />
          3. 게시글의 프로필이나 댓글의 프로필을 클릭하면 해당하는 사람의
          방명록에 글을 남길 수 있습니다.
          <br /> <br />
          4. 화상채팅 시연을 원하시면 아무 글이나 작성하신 후 저희에게
          문의해주세요. 모바일, 데스크톱 모두 동작합니다.
          <br /> <br />
          5. 아직 화상채팅을 위한 소켓서버에서 소켓 id관리가 완벽하게 이루어지지
          않고 있습니다. 로그인 후 새로고침을 하면 소켓 id가 변경되어 화상채팅이
          되지 않을 수 있습니다. 또한 연속적으로 화상채팅을 시도하는 경우
          연결되지 않는 현상이 있습니다.
          <br /> <br />
          6. 로그인 후 특별히 새로고침을 하지 않은 상태에서 화상토론을 신청하고
          받는 과정은 모두 테스트를 마친 상태입니다.
          <br /> <br />
          7. 관리자페이지는 현재 저희 팀원만 접근 가능합니다.
        </Text>
      </StyledSimpleModal>
    </Modal>
  );
};

export default InfoModal;

const StyledSimpleModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${Text} {
    line-height: 25px;
    text-align: left;
  }

  .title {
    text-align: center;
    margin-top: -15px;
  }
  .content {
    margin-top: 20px;
    margin-bottom: 10px;
    text-align: center;
  }
`;
