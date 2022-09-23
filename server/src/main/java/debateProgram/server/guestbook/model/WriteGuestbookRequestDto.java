package debateProgram.server.guestbook.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class WriteGuestbookRequestDto {

    private int userCode;
    private int guestCode;
    private String guestbookContents;

}
