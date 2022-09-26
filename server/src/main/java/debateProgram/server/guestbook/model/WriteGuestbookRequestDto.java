package debateProgram.server.guestbook.model;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@Builder
public class WriteGuestbookRequestDto {

    @NotBlank
    private int userCode;

    @NotBlank
    private int guestCode;

    @NotBlank
    private String guestbookContents;

}
