package debateProgram.server.questions.model;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@Builder
public class AdminReviewRequestDto {

    @NotBlank
    private int questionCode;

    @NotBlank
    private int userCode;

    @NotBlank
    private String answer;

}
