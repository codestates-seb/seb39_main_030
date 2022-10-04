package debateProgram.server.user.model.AllListsInterface;

import java.time.LocalDateTime;

public interface DiscussionsDto {

    int getDiscussionCode();
    String getDiscussionTitle();
    LocalDateTime getDiscussionCreateDate();

}
