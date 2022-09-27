package debateProgram.server.questions.model;

import debateProgram.server.questions.entity.Questions;
import debateProgram.server.user.entity.User;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class DetailQuestionResponseDto {

    private int questionCode;

    private LocalDateTime createDate;

    private String questionTitle;

    private String questionContents;

    private String questionAnswer;

    private String questionClear;

    private int userCode;

    private String userState;

    private String nickname;

    private String profileImg;

    public DetailQuestionResponseDto(Questions question, User user) {
        this.questionCode = question.getQuestionCode();
        this.createDate = question.getQuestionCreateDate();
        this.questionTitle = question.getQuestionTitle();
        this.questionContents = question.getQuestionContents();
        this.questionAnswer = question.getQuestionAnswer();
        this.questionClear = question.getQuestionClear();
        this.userCode = user.getUserCode();
        this.userState = user.getUserState();
        this.nickname = user.getNickname();
        this.profileImg = user.getProfileImg();
    }

}
