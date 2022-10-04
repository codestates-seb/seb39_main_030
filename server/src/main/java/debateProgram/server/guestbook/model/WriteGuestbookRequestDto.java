package debateProgram.server.guestbook.model;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Builder
public class WriteGuestbookRequestDto {

    @NotNull
    private int userCode;

    @NotNull
    private int guestCode;

    @NotBlank
    private String guestbookContents;

}
