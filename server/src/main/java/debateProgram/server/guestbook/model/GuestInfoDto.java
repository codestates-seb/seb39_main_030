package debateProgram.server.guestbook.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GuestInfoDto {

    public int userCode;
    public String nickname;
    public String profileImg;

}
