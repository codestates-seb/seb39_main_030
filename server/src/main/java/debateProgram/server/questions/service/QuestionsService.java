package debateProgram.server.questions.service;

import debateProgram.server.exception.BusinessLogicException;
import debateProgram.server.exception.ExceptionCode;
import debateProgram.server.questions.entity.Questions;
import debateProgram.server.questions.model.AdminReviewRequestDto;
import debateProgram.server.questions.model.CreateQuestionResponseDto;
import debateProgram.server.questions.repository.QuestionsRepository;
import debateProgram.server.user.entity.User;
import debateProgram.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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

    private final UserService userService;

    @Transactional(readOnly = true)
    public Questions findVerifiedQuestion(int questionCode) {
        Optional<Questions> optionalQuestions = questionsRepository.findById(questionCode);

        Questions question = optionalQuestions.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

        return question;
    }

    @Transactional
    public CreateQuestionResponseDto createQuestion(Questions question) {
        Questions save = questionsRepository.save(question);
        User user = userService.findVerifiedUser(save.getUserCode());

        CreateQuestionResponseDto result = CreateQuestionResponseDto.builder()
                .questionCode(save.getQuestionCode())
                .questionTitle(save.getQuestionTitle())
                .questionContents(save.getQuestionContents())
                .userCode(save.getUserCode())
                .nickname(user.getNickname())
                .profileImg(user.getProfileImg())
                .build();

        return result;
    }

    @Transactional
    public Questions createQuestionTest(Questions question) {
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

    public Page<Questions> findAllQuestions(int page, int size) {
        return questionsRepository.findAll(PageRequest.of(page, size, Sort.by("questionCode").descending()));
    }
}
