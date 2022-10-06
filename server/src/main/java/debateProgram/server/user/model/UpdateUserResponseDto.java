package debateProgram.server.user.model;

import debateProgram.server.user.entity.User;
import debateProgram.server.user.tags.UserTags;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateUserResponseDto {

    private int userCode;
    private String userState;
    private String discussionState;
    private Long kakaoId;
    private String nickname;
    private String profileImg;
    private String kakaoEmail;
    private int userLikes;
    private String socketId;
    private UserTags tags;

}
