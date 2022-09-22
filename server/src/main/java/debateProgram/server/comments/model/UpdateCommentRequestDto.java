package debateProgram.server.comments.model;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@Builder
public class UpdateCommentRequestDto {

    @NotBlank
    private int commentCode;

    @NotBlank
    private int userCode;

    @NotBlank
    private String commentContents;
}
