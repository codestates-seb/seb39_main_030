package debateProgram.server.user.mapper;

import debateProgram.server.user.entity.User;
import debateProgram.server.user.model.UserRequestDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    UserRequestDto userToUserResponse(User user);

}
