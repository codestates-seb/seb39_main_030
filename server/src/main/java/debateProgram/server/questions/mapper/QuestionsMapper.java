package debateProgram.server.questions.mapper;

import debateProgram.server.questions.entity.Questions;
import debateProgram.server.questions.model.CreateQuestionRequestDto;
import debateProgram.server.questions.model.CreateQuestionResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionsMapper {

    Questions createRequestToQuestion(CreateQuestionRequestDto createQuestionRequestDto);

}
