package debateProgram.server.user.mapper;

import debateProgram.server.user.recommend.Recommend;
import debateProgram.server.user.entity.User;
import debateProgram.server.user.model.OtherUserResponseDto;
import debateProgram.server.user.recommend.RecommendRequestDto;
import debateProgram.server.user.model.SocketIdResponseDto;
import debateProgram.server.user.model.UpdateUserResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    UpdateUserResponseDto userToUserResponse(User user);

    OtherUserResponseDto userToOtherUserResponse(User user);

    SocketIdResponseDto userToSocketResponse(User user);

    Recommend recommendRequestToRecommend(RecommendRequestDto recommendRequestDto);

}
