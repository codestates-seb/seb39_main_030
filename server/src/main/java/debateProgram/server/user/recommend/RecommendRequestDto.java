package debateProgram.server.user.recommend;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@Builder
public class RecommendRequestDto {

    @NotBlank
    public int userCode;

    @NotBlank
    public int targetCode;

    @NotBlank
    public String likes;

}
