package debateProgram.server.user.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OtherUserResponseDto {

    private String discussionState;
    private String nickname;
    private String profileImg;
    private String kakaoEmail;
    private String userLikes;

}
