package debateProgram.server.comments.model;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Builder
public class PostCommentsRequestDto {

    @NotNull
    private int userCode;

    @NotNull
    private int discussionCode;

    @NotBlank
    private String commentContents;

}
