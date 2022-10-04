package debateProgram.server.declaration.model;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Builder
public class PostDeclarationRequestDto {

    @NotNull
    private int userCode;

    @NotNull
    private int discussionCode;

    @NotBlank
    private String declarationReason;

}
