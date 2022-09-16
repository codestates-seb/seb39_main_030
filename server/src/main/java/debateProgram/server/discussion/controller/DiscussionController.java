package debateProgram.server.discussion.controller;

import debateProgram.server.discussion.entity.Discussion;
import debateProgram.server.discussion.mapper.DiscussionMapper;
import debateProgram.server.discussion.model.PostRequestDiscussionDto;
import debateProgram.server.discussion.model.PostResponseDiscussionDto;
import debateProgram.server.discussion.service.DiscussionService;
import debateProgram.server.dto.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

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

    /**
     * 토론 게시글 상세 API
     * @param discussionCode
     * @return
     */
    @GetMapping("/detail/{discussion-code}")
    public ResponseEntity getDiscussionDetails(@PathVariable("discussion-code") int discussionCode) {
        Discussion discussion = discussionService.findDiscussionDetails(discussionCode);

        List<Object> response = new ArrayList<>();
        response.add(discussion);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    /**
     * 토론 게시글 page, size에 맞춰 호출 API (무한 스크롤)
     * DiscussionCode를 기준으로 DESC 정렬
     * @param page
     * @param size
     * @return
     */
    @GetMapping
    public ResponseEntity getAllDiscussions(@RequestParam int page, @RequestParam int size) {
        Page<Discussion> pageDiscussions = discussionService.findAllDiscussions(page, size);
        List<Discussion> discussions = pageDiscussions.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(discussions, pageDiscussions), HttpStatus.OK);
    }

    /**
     * 토론 게시글 생성 API
     * @param postRequestDiscussionDto
     * @return
     */
    @PostMapping
    public ResponseEntity postDiscussion(@RequestBody PostRequestDiscussionDto postRequestDiscussionDto) {
        Discussion discussion = discussionMapper.postRequestDiscussion(postRequestDiscussionDto);
        Discussion newDiscussion = discussionService.createDiscussion(discussion);

        PostResponseDiscussionDto result = discussionMapper.postResponseDiscussionDto(newDiscussion);

        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    /**
     * 토론 게시글 삭제 API
     * @param discussionCode
     * @return
     */
    @DeleteMapping("/delete/{discussion-code}")
    public ResponseEntity deleteDiscussion(@PathVariable("discussion-code") int discussionCode) {

        discussionService.deleteDiscussion(discussionCode);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
