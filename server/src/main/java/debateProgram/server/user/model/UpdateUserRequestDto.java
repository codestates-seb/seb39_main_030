package debateProgram.server.user.model;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@Builder
public class UpdateUserRequestDto {

    @NotBlank
    private int userCode;

    @NotBlank
    private String nickname;

    @NotBlank
    private String profileImg;

    @NotBlank
    private String kakaoEmail;

    @NotBlank
    private String tag1;

    @NotBlank
    private String tag2;

    @NotBlank
    private String tag3;

}
