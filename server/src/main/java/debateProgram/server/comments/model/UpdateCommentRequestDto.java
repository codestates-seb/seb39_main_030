package debateProgram.server.comments.model;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Builder
public class UpdateCommentRequestDto {

    @NotNull
    private int commentCode;

    @NotNull
    private int userCode;

    @NotBlank
    private String commentContents;
}
