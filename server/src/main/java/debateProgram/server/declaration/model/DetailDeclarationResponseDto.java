package debateProgram.server.declaration.model;

import debateProgram.server.declaration.entity.Declaration;
import debateProgram.server.questions.entity.Questions;
import debateProgram.server.user.entity.User;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class DetailDeclarationResponseDto {

    private int declarationCode;

    private int discussionCode;

    private LocalDateTime createDate;

    private String declarationReason;

    private String declarationAnswer;

    private String declarationClear;

    private int userCode;

    private String userState;

    private String nickname;

    private String profileImg;

    public DetailDeclarationResponseDto(Declaration declaration, User user) {
        this.declarationCode = declaration.getDeclarationCode();
        this.discussionCode = declaration.getDiscussionCode();
        this.createDate = declaration.getDeclarationCreateDate();
        this.declarationReason = declaration.getDeclarationReason();
        this.declarationAnswer = declaration.getDeclarationAnswer();
        this.declarationClear = declaration.getDeclarationClear();
        this.userCode = user.getUserCode();
        this.userState = user.getUserState();
        this.nickname = user.getNickname();
        this.profileImg = user.getProfileImg();
    }

}
