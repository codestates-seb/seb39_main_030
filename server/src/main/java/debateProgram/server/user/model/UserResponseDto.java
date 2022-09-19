package debateProgram.server.user.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserResponseDto {

    private int userCode;
    private String discussionState;
    private int kakaoId;
    private String nickname;
    private String profileImg;
    private String kakaoEmail;
    private String userLikes;
    private String userRole;

}
