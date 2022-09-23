package debateProgram.server.guestbook.model;

import java.time.LocalDateTime;

public interface UserBookResponseDto {

    int getBookCode();
    int getGuestCode();
    String getContents();
    LocalDateTime getCreateDate();

}
