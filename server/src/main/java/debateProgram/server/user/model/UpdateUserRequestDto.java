package debateProgram.server.user.model;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Getter
@Builder
public class UpdateUserRequestDto {

    @NotNull
    private int userCode;

    @NotBlank
    private String nickname;

    @NotBlank
    private String profileImg;

    @NotBlank
    @Pattern(regexp = "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$")
    private String kakaoEmail;

}
