package debateProgram.server.comments.model;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class PostCommentsResponseDto {

    private int commentCode;
    private int discussionCode;
    private int userCode;
    private String commentContents;
    private LocalDateTime commentCreateDate;

}
