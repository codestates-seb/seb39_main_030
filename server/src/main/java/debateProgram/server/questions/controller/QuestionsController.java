package debateProgram.server.questions.controller;

import debateProgram.server.dto.MultiResponseDto;
import debateProgram.server.questions.entity.Questions;
import debateProgram.server.questions.mapper.QuestionsMapper;
import debateProgram.server.questions.model.*;
import debateProgram.server.questions.service.QuestionsService;
import debateProgram.server.user.entity.User;
import debateProgram.server.user.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/question")
public class QuestionsController {

    private final QuestionsService questionsService;

    private final QuestionsMapper questionsMapper;

    private final UserService userService;


    /**
     * 문의글 조회 API
     */
    @GetMapping
    public ResponseEntity questionInfo(@RequestParam("questionCode") int questionCode) {
        Questions question = questionsService.findVerifiedQuestion(questionCode);
        User user = userService.findVerifiedUser(question.getUserCode());

        DetailQuestionResponseDto result = new DetailQuestionResponseDto(question, user);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    /**
     * 문의글 전체 조회 API
     */
    @GetMapping("/all")
    public ResponseEntity allQuestionInfo(@RequestParam("page") int page,
                                          @RequestParam("size") int size){
        Page<Questions> pageQuestions = questionsService.findAllQuestions(page, size);
        List<Questions> questions = pageQuestions.getContent();

        List<AllQuestionsResponseDto> result = new ArrayList<>();

        for(int i=0; i<questions.size(); i++){
            Questions q = questions.get(i);

            AllQuestionsResponseDto responseDto = AllQuestionsResponseDto.builder()
                    .questionCode(q.getQuestionCode())
                    .questionTitle(q.getQuestionTitle())
                    .questionContents(q.getQuestionContents())
                    .userCode(q.getUser().getUserCode())
                    .nickname(q.getUser().getNickname())
                    .profileImg(q.getUser().getProfileImg())
                    .questionClear(q.getQuestionClear())
                    .build();
            result.add(responseDto);
        }

        return new ResponseEntity<>(new MultiResponseDto<>(result, pageQuestions), HttpStatus.OK);
    }


    /**
     * 문의글 생성 API
     */
    @PostMapping
    public ResponseEntity createQuestion(@RequestBody CreateQuestionRequestDto requestDto) {
        Questions question = questionsMapper.createRequestToQuestion(requestDto);
        CreateQuestionResponseDto savedQ = questionsService.createQuestion(question);

        return new ResponseEntity<>(savedQ, HttpStatus.CREATED);
    }

    @PostMapping("/test")
    public ResponseEntity createQuestionTest(@RequestBody CreateQuestionRequestDto requestDto) {
        Questions question = questionsMapper.createRequestToQuestion(requestDto);
        Questions savedQ = questionsService.createQuestionTest(question);

        return new ResponseEntity<>(savedQ, HttpStatus.CREATED);
    }


    /**
     * 문의글 삭제 API (작성자 or 관리자만 가능)
     */
    @DeleteMapping
    public ResponseEntity deleteQuestion(@RequestParam("questionCode") int questionCode,
                                         @RequestParam("userCode") int userCode) {
        Questions question = questionsService.findVerifiedQuestion(questionCode);
        User user = userService.findVerifiedUser(userCode);

        String role = user.getUserRole();

        if (question.getUserCode() == userCode || role.equals("ROLE_ADMIN")) {
            questionsService.deleteQuestion(question);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            String result = "본인의 문의글 또는 관리자만 삭제 가능";
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
    }

    /**
     * 관리자의 문의 처리 API
     */
    @PostMapping("/review")
    public ResponseEntity questionReview(@RequestBody AdminReviewRequestDto requestDto) {
        User user = userService.findVerifiedUser(requestDto.getUserCode());

        if (!user.getUserRole().equals("ROLE_ADMIN")) {
            String result = "관리자만 답변 가능";
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        } else {
            questionsService.updateReview(requestDto);
            Questions result = questionsService.findVerifiedQuestion(requestDto.getQuestionCode());
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        }
    }

}
