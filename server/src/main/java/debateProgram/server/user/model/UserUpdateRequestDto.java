package debateProgram.server.user.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserUpdateRequestDto {

    private int userCode;
    private String nickname;
    private String profileImg;
    private String kakaoEmail;

}
