package debateProgram.server.discussion.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
public class UpdateRequestDiscussionDto {

    @NotBlank
    private int discussionCode;

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
