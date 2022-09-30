package debateProgram.server.guestbook.model;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@Builder
public class UpdateGuestbookRequestDto {

    @NotBlank
    private int bookCode;

    @NotBlank
    private int userCode;

    @NotBlank
    private String guestbookContents;

}
