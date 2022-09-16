package debateProgram.server.discussion.service;

import debateProgram.server.discussion.entity.Discussion;
import debateProgram.server.discussion.repository.DiscussionRepository;
import debateProgram.server.exception.BusinessLogicException;
import debateProgram.server.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Component
@RequiredArgsConstructor
public class DiscussionService {

    private final DiscussionRepository discussionRepository;

    /**
     * 토론 게시글 상세
     * @param discussionCode
     * @return
     */
    public Discussion findDiscussionDetails(int discussionCode) {
        Optional<Discussion> optionalDiscussion = discussionRepository.findByDiscussionCode(discussionCode);

        Discussion findDiscussion = optionalDiscussion.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));

        return findDiscussion;
    }

    /**
     * 토론 게시글 page, size에 맞춰 호출 API (무한 스크롤)
     * DiscussionCode는 게시글 첫 작성을 기준으로 증가하는 column. DiscussionCode를 기준으로 DESC 정렬.
     * @param page
     * @param size
     * @return
     */
    public Page<Discussion> findAllDiscussions(int page, int size) {
        return discussionRepository.findAll(PageRequest.of(page, size, Sort.by("discussionCode").descending()));
    }

    /**
     * 토론 게시글 생성
     * @param discussion
     * @return
     */
    public Discussion createDiscussion(Discussion discussion) {
        return discussionRepository.save(discussion);
    }

    /**
     * 토론 게시글 삭제
     * @param discussionCode
     */
    public void deleteDiscussion(int discussionCode) {
        Discussion findDiscussion = findDiscussionDetails(discussionCode);
        discussionRepository.delete(findDiscussion);
    }
}
