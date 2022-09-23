package debateProgram.server.discussion.mapper;

import debateProgram.server.discussion.entity.Discussion;
import debateProgram.server.discussion.model.PostDiscussionRequestDto;
import debateProgram.server.discussion.model.UpdateDiscussionResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DiscussionMapper {

    Discussion postRequestToDiscussion(PostDiscussionRequestDto postDiscussionRequestDto);

    UpdateDiscussionResponseDto discussionToUpdateResponse(Discussion discussion);



}
