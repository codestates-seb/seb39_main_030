package debateProgram.server.user.mapper;

import debateProgram.server.user.entity.User;
import debateProgram.server.user.model.OtherUserResponseDto;
import debateProgram.server.user.model.UserResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    UserResponseDto userToUserResponse(User user);

    OtherUserResponseDto userToOtherUserResponse(User user);

}
