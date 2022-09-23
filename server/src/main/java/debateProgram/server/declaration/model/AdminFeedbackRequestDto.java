package debateProgram.server.declaration.model;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@Builder
public class AdminFeedbackRequestDto {

    @NotBlank
    private int declarationCode;

    @NotBlank
    private int userCode;

    @NotBlank
    private String declarationAnswer;

}
