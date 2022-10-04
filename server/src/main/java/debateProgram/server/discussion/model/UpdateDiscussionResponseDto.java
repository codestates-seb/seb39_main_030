package debateProgram.server.discussion.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateDiscussionResponseDto {

    private int discussionCode;
    private int userCode;
    private String discussionTitle;
    private String discussionContents;
    private String discussionCategory;
    private String discussionTag;
    private int discussionLikes;

}
