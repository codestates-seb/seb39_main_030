package debateProgram.server.user.model;

import debateProgram.server.user.model.AllListsInterface.CommentsDto;
import debateProgram.server.user.model.AllListsInterface.DeclarationsDto;
import debateProgram.server.user.model.AllListsInterface.DiscussionsDto;
import debateProgram.server.user.model.AllListsInterface.QuestionsDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class AllListsResponseDto {

    public int userCode;
    public String nickname;
    public String profileImg;
    public List<DiscussionsDto> discussionLists;
    public List<CommentsDto> commentLists;
    public List<QuestionsDto> questionLists;
    public List<DeclarationsDto> declarationLists;

}
