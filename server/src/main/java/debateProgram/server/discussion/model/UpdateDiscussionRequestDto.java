package debateProgram.server.discussion.model;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Builder
public class UpdateDiscussionRequestDto {

    @NotNull
    private int discussionCode;

    @NotNull
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
