package debateProgram.server.discussion.model;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class AllDiscussionsResponseDto {

    private int discussionCode;
    private LocalDateTime createDate;
    private String discussionTitle;
    private String discussionContents;
    private String discussionCategory;
    private String discussionTag;
    private int discussionLikes;
    private int userCode;
    private String userState;
    private String nickname;
    private String profileImg;

}
