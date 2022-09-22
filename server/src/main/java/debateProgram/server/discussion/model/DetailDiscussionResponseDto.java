package debateProgram.server.discussion.model;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class DetailDiscussionResponseDto {

    private int discussionCode;
    private int userCode;
    private LocalDateTime createTime;
    private String title;
    private String contents;
    private String category;
    private String tag;
    private int likes;
    private UserDetailDto userInfo;
    
}
