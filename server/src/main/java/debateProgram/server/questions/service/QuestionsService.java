package debateProgram.server.questions.service;

import debateProgram.server.exception.BusinessLogicException;
import debateProgram.server.exception.ExceptionCode;
import debateProgram.server.questions.entity.Questions;
import debateProgram.server.questions.model.AdminReviewRequestDto;
import debateProgram.server.questions.repository.QuestionsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@Component
@RequiredArgsConstructor
public class QuestionsService {

    private final QuestionsRepository questionsRepository;

    @Transactional(readOnly = true)
    public Questions findVerifiedQuestion(int questionCode) {
        Optional<Questions> optionalQuestions = questionsRepository.findById(questionCode);

        Questions question = optionalQuestions.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

        return question;
    }

    public Questions createQuestion(Questions question) {
        return questionsRepository.save(question);
    }

    public void deleteQuestion(Questions question) {
        questionsRepository.delete(question);
    }

    public void updateReview(AdminReviewRequestDto requestDto) {
        int code = requestDto.getQuestionCode();
        String answer = requestDto.getAnswer();
        questionsRepository.registerReview(code, answer);

    }
}
