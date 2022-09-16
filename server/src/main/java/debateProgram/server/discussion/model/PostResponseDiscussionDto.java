package debateProgram.server.discussion.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class PostResponseDiscussionDto {

    private int discussionCode;
    private int userCode;
    private LocalDateTime discussionCreateDate;
    private String discussionTitle;
    private String discussionContents;
    private String discussionCategory;
    private String discussionTag;
    private int discussionLikes;

}
