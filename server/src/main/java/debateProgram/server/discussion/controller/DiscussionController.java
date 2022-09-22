package debateProgram.server.discussion.controller;

import debateProgram.server.discussion.entity.Discussion;
import debateProgram.server.discussion.mapper.DiscussionMapper;
import debateProgram.server.discussion.model.DetailDiscussionResponseDto;
import debateProgram.server.discussion.model.PostDiscussionRequestDto;
import debateProgram.server.discussion.model.UpdateDiscussionRequestDto;
import debateProgram.server.discussion.model.UpdateDiscussionResponseDto;
import debateProgram.server.discussion.service.DiscussionService;
import debateProgram.server.dto.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

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

    /**
     * 토론 게시글 생성 API
     */
    @PostMapping
    public ResponseEntity postDiscussion(@RequestBody PostDiscussionRequestDto postDiscussionRequestDto) {
        Discussion discussion = discussionMapper.postRequestToDiscussion(postDiscussionRequestDto);
        Discussion response = discussionService.createDiscussion(discussion);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * 토론 게시글 page, size에 따른 조회 API (무한 스크롤)
     * DiscussionCode를 기준으로 DESC 정렬
     */
    @GetMapping
    public ResponseEntity getAllDiscussions(@RequestParam int page, @RequestParam int size) {
        Page<Discussion> pageDiscussions = discussionService.findAllDiscussions(page, size);
        List<Discussion> discussions = pageDiscussions.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(discussions, pageDiscussions), HttpStatus.OK);
    }

    /**
     * 토론 게시글 상세 조회 API
     */
    @GetMapping("/detail/{discussion-code}")
    public ResponseEntity getDiscussionDetails(@PathVariable("discussion-code") int discussionCode) {
        DetailDiscussionResponseDto result = discussionService.findDiscussionWithUser(discussionCode);

//        List<Object> response = new ArrayList<>();
//        response.add(discussion);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    /**
     * 토론 게시글 삭제 API
     */
    @DeleteMapping("/{discussion-code}")
    public ResponseEntity deleteDiscussion(@PathVariable("discussion-code") int discussionCode,
                                           @RequestParam("viewerCode") int viewerCode) {
        int userCode = discussionService.findDiscussionDetails(discussionCode).getUserCode();

        if (userCode == viewerCode) {
            discussionService.deleteDiscussion(discussionCode);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        else {
            String result = "삭제 불가";
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
    }

    /**
     * 토론 게시글 수정 API
     */
    @PostMapping("/update")
    public ResponseEntity updateDiscussion(@RequestParam("viewerCode") int viewerCode,
                                           @RequestBody UpdateDiscussionRequestDto updateDiscussionRequestDto) {
        Discussion details = discussionService.findDiscussionDetails(updateDiscussionRequestDto.getDiscussionCode());
        int userCode = details.getUserCode();

        if (userCode == viewerCode) {
            Discussion discussion = discussionService.updateDiscussion(details);
            UpdateDiscussionResponseDto response = discussionMapper.discussionToUpdateResponse(discussion);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }
        else {
            String result = "수정 불가";
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
    }

    /**
     * 토론 게시글 좋아요 수 변경 API
     */
    @PostMapping("/likes/{discussion-code}")
    public ResponseEntity updateDiscussionLikes(@PathVariable("discussion-code") int discussionCode,
                                                @RequestParam("viewerCode") int viewerCode,
                                                @RequestParam("likes") int likes) {
        int userCode = discussionService.findDiscussionDetails(discussionCode).getUserCode();

        if (userCode == viewerCode) {
            String result = "본인의 좋아요는 증감 불가";
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        else {
            int response = discussionService.updateDiscussionLikes(discussionCode, likes);
            return new ResponseEntity(response, HttpStatus.CREATED);
        }
    }
}
