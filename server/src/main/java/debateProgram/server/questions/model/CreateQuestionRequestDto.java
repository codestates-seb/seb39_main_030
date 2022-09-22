package debateProgram.server.questions.model;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@Builder
public class CreateQuestionRequestDto {

    @NotBlank
    private int userCode;

    @NotBlank
    private String questionTitle;

    @NotBlank
    private String questionContents;

}
