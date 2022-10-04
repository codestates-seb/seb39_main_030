package debateProgram.server.questions.model;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Builder
public class AdminReviewRequestDto {

    @NotNull
    private int questionCode;

    @NotNull
    private int userCode;

    @NotBlank
    private String answer;

}
