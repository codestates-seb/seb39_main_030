package debateProgram.server.comments.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateCommentResponseDto {

    private int commentCode;
    private int discussionCode;
    private int userCode;
    private String commentContents;

}
