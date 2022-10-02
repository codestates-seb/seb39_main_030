package debateProgram.server.user.model.AllListsInterface;

import java.time.LocalDateTime;

public interface DeclarationsDto {

    int getDeclarationCode();
    String getDeclarationReason();
    LocalDateTime getDeclarationCreateDate();

}
