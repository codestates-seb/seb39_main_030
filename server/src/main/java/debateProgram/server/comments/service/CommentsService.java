package debateProgram.server.comments.service;

import debateProgram.server.comments.entity.Comments;
import debateProgram.server.comments.model.UpdateCommentRequestDto;
import debateProgram.server.comments.repository.CommentsRepository;
import debateProgram.server.exception.BusinessLogicException;
import debateProgram.server.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Component
@RequiredArgsConstructor
public class CommentsService {

    private final CommentsRepository commentsRepository;

    /**
     * 댓글 상세 조회
     */
    public Comments findCommentDetails(int commentCode) {
        Optional<Comments> optionalComments = commentsRepository.findById(commentCode);

        Comments comment = optionalComments.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return comment;
    }

    /**
     * 한 토론글에 달린 모든 댓글 조회
     */
    public List<Comments> findDiscussionComments(int discussionCode) {
        return commentsRepository.findByAllDiscussionComments(discussionCode);
    }

    /**
     * 댓글 생성
     */
    public Comments creatComment(Comments comments) {
        return commentsRepository.save(comments);
    }

    /**
     * 댓글 삭제
     */
    public void deleteComment(int commentCode) {
        Comments comment = findCommentDetails(commentCode);
        commentsRepository.delete(comment);
    }

    /**
     * 댓글 수정
     */
    public void updateComment(UpdateCommentRequestDto updateCommentRequestDto) {
        String contents = updateCommentRequestDto.getCommentContents();
        int code = updateCommentRequestDto.getCommentCode();
        commentsRepository.updateComment(contents, code);
    }

}
