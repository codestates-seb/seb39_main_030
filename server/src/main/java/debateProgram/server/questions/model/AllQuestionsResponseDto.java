package debateProgram.server.questions.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AllQuestionsResponseDto {

    private int questionCode;
    private String questionTitle;
    private String questionContents;
    private int userCode;
    private String nickname;
    private String profileImg;

}
