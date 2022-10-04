package debateProgram.server.user.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SocketIdResponseDto {

    private int userCode;
    private String nickname;
    private String socketId;

}
