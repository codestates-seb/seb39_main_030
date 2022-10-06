package debateProgram.server.guestbook.model;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class UserGuestBookResponseDto {

    public int bookCode;
    public int guestCode;
    public String contents;
    public LocalDateTime createDate;
    public GuestInfoDto guestInfo;

}
