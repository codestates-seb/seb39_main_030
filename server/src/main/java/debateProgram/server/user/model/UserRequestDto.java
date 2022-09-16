package debateProgram.server.user.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserRequestDto {

    private int userCode;
    private String nickname;
    private String profileImg;
    private String kakaoEmail;
    private String userLikes;

}
