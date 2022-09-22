package debateProgram.server.comments.model;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@Builder
public class PostCommentsRequestDto {

    @NotBlank
    private int userCode;

    @NotBlank
    private int discussionCode;

    @NotBlank
    private String commentContents;

}
