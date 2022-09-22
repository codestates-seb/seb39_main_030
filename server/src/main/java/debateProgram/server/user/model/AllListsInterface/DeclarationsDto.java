package debateProgram.server.user.model.AllListsInterface;

import java.time.LocalDateTime;

public interface DeclarationsDto {

    int getDeclarationCode();
    String getDDeclarationReason();
    LocalDateTime getDeclarationCreateDate();

}
