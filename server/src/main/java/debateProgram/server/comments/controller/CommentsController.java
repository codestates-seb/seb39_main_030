package debateProgram.server.comments.controller;

import debateProgram.server.comments.entity.Comments;
import debateProgram.server.comments.mapper.CommentsMapper;
import debateProgram.server.comments.model.PostCommentsRequestDto;
import debateProgram.server.comments.model.PostCommentsResponseDto;
import debateProgram.server.comments.model.UpdateCommentRequestDto;
import debateProgram.server.comments.model.UpdateCommentResponseDto;
import debateProgram.server.comments.service.CommentsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

/**
 * 댓글
 */

@Slf4j
@Component
@RestController
@RequiredArgsConstructor
@RequestMapping("/comments")
public class CommentsController {

    private final CommentsService commentsService;

    private final CommentsMapper commentsMapper;

    /**
     * 댓글 생성 API
     */
    @PostMapping
    public ResponseEntity postComment(@RequestBody PostCommentsRequestDto requestDto) {
        Comments comments = commentsMapper.postRequestToComments(requestDto);
        Comments newComment = commentsService.creatComment(comments);

        PostCommentsResponseDto response = commentsMapper.commentsToPostResponse(newComment);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * 댓글 삭제 API
     */
    @DeleteMapping("/delete")
    public ResponseEntity deleteComment(@RequestParam("commentCode") int commentCode,
                                        @RequestParam("viewerCode") int viewerCode) {
        int userCode = commentsService.findVerifiedComment(commentCode).getUserCode();

        if (userCode == viewerCode) {
            commentsService.deleteComment(commentCode);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        else {
            String response = "삭제 불가";
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
    }

    /**
     * 댓글 수정 API
     */
    @PostMapping("/update")
    public ResponseEntity updateComment(@RequestParam("viewerCode") int viewerCode,
                                        @RequestBody UpdateCommentRequestDto requestDto) {
        Comments commentDetails = commentsService.findVerifiedComment(requestDto.getCommentCode());
        int userCode = commentDetails.getUserCode();

        if (userCode == viewerCode) {
            commentsService.updateComment(requestDto);
            Comments result = commentsService.findVerifiedComment(requestDto.getCommentCode());
            UpdateCommentResponseDto response = commentsMapper.commentToUpdateResponse(result);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }
        else {
            String response = "수정 불가";
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
    }

}
