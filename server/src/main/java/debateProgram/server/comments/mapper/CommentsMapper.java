package debateProgram.server.comments.mapper;

import debateProgram.server.comments.entity.Comments;
import debateProgram.server.comments.model.PostCommentsRequestDto;
import debateProgram.server.comments.model.PostCommentsResponseDto;
import debateProgram.server.comments.model.UpdateCommentResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentsMapper {

    Comments postRequestToComments(PostCommentsRequestDto postCommentsRequestDto);

    PostCommentsResponseDto commentsToPostResponse(Comments comments);

    UpdateCommentResponseDto commentToUpdateResponse(Comments comments);

}
