package debateProgram.server.discussion.model;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@Builder
public class PostDiscussionRequestDto {

    @NotBlank
    private int userCode;

    @NotBlank
    private String discussionTitle;

    @NotBlank
    private String discussionContents;

    @NotBlank
    private String discussionCategory;

    @NotBlank
    private String discussionTag;

}
