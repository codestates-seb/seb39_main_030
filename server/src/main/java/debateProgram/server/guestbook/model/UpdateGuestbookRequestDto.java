package debateProgram.server.guestbook.model;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Builder
public class UpdateGuestbookRequestDto {

    @NotNull
    private int bookCode;

    @NotNull
    private int userCode;

    @NotBlank
    private String guestbookContents;

}
