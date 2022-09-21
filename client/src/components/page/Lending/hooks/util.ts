import { Debate } from '../../../../type';

// 검색어에 맞는 결과를 필터링 해주는 함수
export const filterBySearchWord = (debateList: Debate[], searchWord: string) =>
  debateList.filter(
    (d) =>
      d.discussionTitle?.includes(searchWord) ||
      d.discussionContents?.includes(searchWord)
  );

export const filterTagByDebate = (question: Debate[], currentTag: string) =>
  question.filter((d) => d.discussionTag === currentTag);
