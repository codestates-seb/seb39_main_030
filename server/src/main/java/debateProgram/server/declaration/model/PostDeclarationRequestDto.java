package debateProgram.server.declaration.model;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@Builder
public class PostDeclarationRequestDto {

    @NotBlank
    private int userCode;

    @NotBlank
    private int discussionCode;

    @NotBlank
    private String declarationReason;

}
