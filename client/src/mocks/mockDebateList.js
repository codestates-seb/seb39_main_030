const discussionCode = [];
for (let i = 1; i <= 100; i++) {
  discussionCode.push(i);
}
const nickname = [
  '홍길동',
  '김두한',
  '이순신',
  '정치왕',
  '예술가',
  '독서광',
  '김철수',
  '토론왕',
  '박지성',
  '손흥민',
  '오랑우탄',
  '강아지',
  '고양이',
  '닉네임이아주긴사람',
  'Adam Smith',
  'Johann Wittgenstein',
];
const discussionTitle = [
  '영화 이야기 할 분?',
  '정치 잘 아는 사람만',
  'epl전문가만 오세요',
  '가장 강한 지상 동물은??',
  '메시 vs 호날두 vs 홀란드',
  '탑건 매버릭 이야기 나눌 분만',
  '중세 유럽 전쟁사 토론 할 분?',
  '중세 유럽 전쟁사 토론 할 분 긴 제목은 어떻게 처리할까 너무 길어지면 그냥 이렇게 처리 할까..?',
];
const discussionTag = [
  '정당',
  '대통령',
  '정치학',
  '이데올로기',
  '사건/사고',
  '법',
  '교육',
  '환경',
  '지역',
  '음식',
  '의복',
  '여행',
  '생활경제',
  '글로벌경제',
  '거시경제',
  '미시경제',
  '물리학',
  '화학',
  '생물학',
  '지구과학',
  '컴퓨터과학',
  '대수학',
  '기하학',
  '통계학',
  '수리논리학',
  '헬스',
  '축구',
  '농구',
  '야구',
  '음악',
  '고대철학',
  '근대철학',
  '분석철학',
  '기타',
];

const userState = [true, false];

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const genObj = (num) => {
  return {
    discussionCode: num,
    nickname: nickname[rand(0, nickname.length - 1)],
    discussionCreateDate: '2022-07-29',
    discussionTitle: discussionTitle[rand(0, discussionTitle.length - 1)],
    discussionContents:
      '내용이 여기 잔뜩 들어있을 것이다 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세',
    discussionCategory: '예술',
    discussionTag: discussionTag[rand(0, discussionTag.length - 1)],
    discussionLikes: discussionCode[rand(0, 99)],
    profileImg:
      'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg',
    userState: userState[rand(0, 1)],
  };
};

export const mockDebateList = [];

for (const num of discussionCode) {
  mockDebateList.push(genObj(Number(num)));
}
