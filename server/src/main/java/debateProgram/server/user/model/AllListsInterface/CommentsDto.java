package debateProgram.server.user.model.AllListsInterface;

import java.time.LocalDateTime;

public interface CommentsDto {

    int getCommentCode();
    String getCommentContents();
    LocalDateTime getCommentCreateDate();

}
