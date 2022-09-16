package debateProgram.server.discussion.mapper;

import debateProgram.server.discussion.entity.Discussion;
import debateProgram.server.discussion.model.PostRequestDiscussionDto;
import debateProgram.server.discussion.model.PostResponseDiscussionDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DiscussionMapper {

    Discussion postRequestDiscussion(PostRequestDiscussionDto postRequestDiscussionDto);

    PostResponseDiscussionDto postResponseDiscussionDto(Discussion discussion);

}
