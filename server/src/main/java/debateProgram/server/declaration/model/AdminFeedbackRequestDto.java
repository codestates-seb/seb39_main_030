package debateProgram.server.declaration.model;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Builder
public class AdminFeedbackRequestDto {

    @NotNull
    private int declarationCode;

    @NotNull
    private int userCode;

    @NotBlank
    private String declarationAnswer;

}
