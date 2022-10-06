package debateProgram.server.discussion.service;

import debateProgram.server.comments.repository.CommentsRepository;
import debateProgram.server.discussion.entity.Discussion;

import debateProgram.server.discussion.model.DetailDiscussionResponseDto;
import debateProgram.server.discussion.model.UpdateDiscussionRequestDto;
import debateProgram.server.discussion.model.UserDetailDto;

import debateProgram.server.discussion.repository.DiscussionRepository;
import debateProgram.server.exception.BusinessLogicException;
import debateProgram.server.exception.ExceptionCode;
import debateProgram.server.user.recommend.Recommend;
import debateProgram.server.user.recommend.RecommendRepository;
import debateProgram.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@Component
@RequiredArgsConstructor
public class DiscussionService {

    private final DiscussionRepository discussionRepository;

    private final CommentsRepository commentsRepository;

    private final UserService userService;


    public Discussion findVerifiedDiscussion(int discussionCode) {
        Optional<Discussion> optionalDiscussion = discussionRepository.findById(discussionCode);

        Discussion findDiscussion = optionalDiscussion.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));

        return findDiscussion;
    }

    /**
     * 토론글 상세
     */
    public DetailDiscussionResponseDto findDiscussionWithUser(int discussionCode, int loginUserCode){
        Discussion d = findVerifiedDiscussion(discussionCode);
        Recommend r = userService.findLikesHistory(loginUserCode, discussionCode);
        if(r.getLikes()==null) r.setLikes("N");
        UserDetailDto userInfo = discussionRepository.findUserInfo(discussionCode);

        DetailDiscussionResponseDto dto = DetailDiscussionResponseDto.builder()
                .discussionCode(d.getDiscussionCode())
                .userCode(d.getUserCode())
                .createTime(d.getDiscussionCreateDate())
                .title(d.getDiscussionTitle())
                .contents(d.getDiscussionContents())
                .category(d.getDiscussionCategory())
                .tag(d.getDiscussionTag())
                .likes(d.getDiscussionLikes())
                .recommendState(r.getLikes())
                .userInfo(userInfo)
                .build();

        return dto;
    }

    /**
     * 토론글 전체 조회
     */
    public Page<Discussion> findAllDiscussions(int page, int size) {
        return discussionRepository.findAll(PageRequest.of(page, size, Sort.by("discussionCode").descending()));
    }

    /**
     * 토론글 생성
     */
    public Discussion createDiscussion(Discussion discussion) {
        return discussionRepository.save(discussion);
    }

    /**
     * 토론글 삭제
     */
    public void deleteDiscussion(int discussionCode) {
        Discussion findDiscussion = findVerifiedDiscussion(discussionCode);
        commentsRepository.deleteAllByDiscussionCode(discussionCode);
        discussionRepository.delete(findDiscussion);
    }

    public void updateDiscussion(UpdateDiscussionRequestDto dto) {
        discussionRepository.updateDiscussion(
                dto.getDiscussionTitle(),
                dto.getDiscussionContents(),
                dto.getDiscussionCategory(),
                dto.getDiscussionTag(),
                dto.getDiscussionCode()
        );
    }

    /**
     * 토론글 좋아요
     */
    @Transactional
    public int updateDiscussionLikes(int discussionCode, int identifier) {
        Discussion discussion = findVerifiedDiscussion(discussionCode);
        int likes = discussion.getDiscussionLikes();

        if (identifier == 1) {
            likes = likes + 1;
            discussionRepository.updateDiscussionLikes(discussionCode, likes);
        } else if (identifier == 0) {
            likes = likes - 1;
            discussionRepository.updateDiscussionLikes(discussionCode, likes);
        }

        return likes;
    }
}
