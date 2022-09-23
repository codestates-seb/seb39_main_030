package debateProgram.server.discussion.model;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class DetailCommentsResponseDto {

    private int userCode;
    private String nickname;
    private String profileImg;
    private String commentContents;
    private LocalDateTime commentCreateDate;

}
