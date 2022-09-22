package debateProgram.server.user.model.AllListsInterface;

import java.time.LocalDateTime;

public interface QuestionsDto {

    int getQuestionCode();
    String getQuestionTitle();
    LocalDateTime getQuestionCreateDate();

}
