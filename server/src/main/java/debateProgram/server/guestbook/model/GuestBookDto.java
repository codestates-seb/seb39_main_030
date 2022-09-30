package debateProgram.server.guestbook.model;

import java.time.LocalDateTime;

public interface GuestBookDto {

    int getBookCode();
    int getGuestCode();
    String getContents();
    LocalDateTime getCreateDate();

}
