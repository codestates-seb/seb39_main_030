package debateProgram.server.discussion.controller;

import debateProgram.server.comments.entity.Comments;
import debateProgram.server.comments.service.CommentsService;
import debateProgram.server.discussion.entity.Discussion;
import debateProgram.server.discussion.mapper.DiscussionMapper;
import debateProgram.server.discussion.model.*;
import debateProgram.server.discussion.service.DiscussionService;
import debateProgram.server.dto.MultiResponseDto;
import debateProgram.server.user.entity.User;
import debateProgram.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

/**
 * 토론 게시글
 */

@Slf4j
@Component
@RestController
@RequiredArgsConstructor
@RequestMapping("/discussion")
public class DiscussionController {

    private final DiscussionService discussionService;

    private final DiscussionMapper discussionMapper;

    private final CommentsService commentsService;

    private final UserService userService;

    /**
     * 토론글 생성 API
     */
    @PostMapping
    public ResponseEntity postDiscussion(@Valid @RequestBody PostDiscussionRequestDto postDiscussionRequestDto) {
        Discussion discussion = discussionMapper.postRequestToDiscussion(postDiscussionRequestDto);
        Discussion response = discussionService.createDiscussion(discussion);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * 토론글 전체 조회 API
     */
    @GetMapping
    public ResponseEntity getAllDiscussions(@RequestParam int page, @RequestParam int size) {
        Page<Discussion> pageDiscussions = discussionService.findAllDiscussions(page, size);
        List<Discussion> discussions = pageDiscussions.getContent();

        List<AllDiscussionsResponseDto> result = new ArrayList<>();

        for(int i=0; i<discussions.size(); i++){
            Discussion d = discussions.get(i);

            AllDiscussionsResponseDto responseDto = AllDiscussionsResponseDto.builder()
                    .discussionCode(d.getDiscussionCode())
                    .createDate(d.getDiscussionCreateDate())
                    .discussionTitle(d.getDiscussionTitle())
                    .discussionContents(d.getDiscussionContents())
                    .discussionCategory(d.getDiscussionCategory())
                    .discussionTag(d.getDiscussionTag())
                    .discussionLikes(d.getDiscussionLikes())
                    .userCode(d.getUser().getUserCode())
                    .userState(d.getUser().getUserState())
                    .nickname(d.getUser().getNickname())
                    .profileImg(d.getUser().getProfileImg())
                    .build();

            result.add(responseDto);
        }

        return new ResponseEntity<>(new MultiResponseDto<>(result, pageDiscussions), HttpStatus.OK);
    }

    /**
     * 토론글 상세 조회 API
     */
    @GetMapping("/detail")
    public ResponseEntity getDiscussionDetails(@RequestParam("discussionCode") int discussionCode,
                                               @RequestParam("loginUserCode") int loginUserCode) {
        DetailDiscussionResponseDto result = discussionService.findDiscussionWithUser(discussionCode, loginUserCode);
        List<Comments> comments = commentsService.findDiscussionComments(discussionCode);

        List<DetailCommentsResponseDto> commentsDto = new ArrayList<>();

        for (int i=0; i<comments.size(); i++){
            int userCode = comments.get(i).getUserCode();
            User userInfo = userService.findVerifiedUser(userCode);
            Comments commentInfo = comments.get(i);

            DetailCommentsResponseDto dto = DetailCommentsResponseDto.builder()
                    .userCode(userInfo.getUserCode())
                    .nickname(userInfo.getNickname())
                    .profileImg(userInfo.getProfileImg())
                    .commentCode(commentInfo.getCommentCode())
                    .commentContents(commentInfo.getCommentContents())
                    .commentCreateDate(commentInfo.getCommentCreateDate())
                    .build();

            commentsDto.add(dto);
        }

        List<Object> response = new ArrayList<>();
        response.add(result);
        response.add(commentsDto);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * 토론글 삭제 API
     */
    @DeleteMapping
    public ResponseEntity deleteDiscussion(@RequestParam("discussionCode") int discussionCode,
                                           @RequestParam("userCode") int userCode) {
        int writerCode = discussionService.findVerifiedDiscussion(discussionCode).getUserCode();

        if (writerCode == userCode) {
            discussionService.deleteDiscussion(discussionCode);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        else {
            String result = "삭제 불가";
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
    }

    /**
     * 토론글 수정 API
     */
    @PostMapping("/update")
    public ResponseEntity updateDiscussion(@Valid @RequestBody UpdateDiscussionRequestDto requestDto) {
        Discussion details = discussionService.findVerifiedDiscussion(requestDto.getDiscussionCode());
        int writerCode = details.getUserCode();

        if (writerCode == requestDto.getUserCode()) {
            discussionService.updateDiscussion(requestDto);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        else {
            String result = "수정 불가";
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
    }

}
