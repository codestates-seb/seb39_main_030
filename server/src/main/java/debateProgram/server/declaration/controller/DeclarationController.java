package debateProgram.server.declaration.controller;

import debateProgram.server.declaration.entity.Declaration;
import debateProgram.server.declaration.mapper.DeclarationMapper;
import debateProgram.server.declaration.model.*;
import debateProgram.server.declaration.service.DeclarationService;
import debateProgram.server.dto.MultiResponseDto;
import debateProgram.server.questions.entity.Questions;
import debateProgram.server.questions.model.AllQuestionsResponseDto;
import debateProgram.server.user.entity.User;
import debateProgram.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@RestController
@RequiredArgsConstructor
@RequestMapping("/declaration")
public class DeclarationController {

    private final DeclarationService declarationService;

    private final DeclarationMapper declarationMapper;

    private final UserService userService;

    /**
     * 신고 게시글 조회 API
     */
    @GetMapping
    public ResponseEntity getDeclaration(@RequestParam("declarationCode") int declarationCode,
                                         @RequestParam("userCode") int userCode) {
        int writerCode = declarationService.findVerifiedDeclaration(declarationCode).getUserCode();
        String userRole = userService.findVerifiedUser(userCode).getUserRole();

        if (writerCode == userCode || userRole.equals("ROLE_ADMIN")) {
            Declaration declaration = declarationService.findVerifiedDeclaration(declarationCode);
            User user = userService.findVerifiedUser(declaration.getUserCode());

            DetailDeclarationResponseDto result = new DetailDeclarationResponseDto(declaration, user);

            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            String result = "본인의 신고글 또는 관리자만 조회 가능";
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
    }

    /**
     * 신고글 전체 조회 API
     */
    @GetMapping("/all")
    public ResponseEntity allQuestionInfo(@RequestParam("page") int page,
                                          @RequestParam("size") int size){
        Page<Declaration> pageDeclarations = declarationService.findAllDeclarations(page, size);
        List<Declaration> declarations = pageDeclarations.getContent();

        List<AllDeclarationResponseDto> result = new ArrayList<>();

        for(int i=0; i<declarations.size(); i++){
            Declaration d = declarations.get(i);

            AllDeclarationResponseDto responseDto = AllDeclarationResponseDto.builder()
                    .declarationCode(d.getDeclarationCode())
                    .declarationReason(d.getDeclarationReason())
                    .userCode(d.getUser().getUserCode())
                    .nickname(d.getUser().getNickname())
                    .profileImg(d.getUser().getProfileImg())
                    .build();
            result.add(responseDto);
        }

        return new ResponseEntity<>(new MultiResponseDto<>(result, pageDeclarations), HttpStatus.OK);
    }

    /**
     * 신고 게시글 생성 API
     */
    @PostMapping
    public ResponseEntity postDeclaration(@RequestBody PostDeclarationRequestDto requestDto) {
        Declaration declaration = declarationMapper.postRequestToDeclaration(requestDto);
        PostDeclarationResponseDto result = declarationService.crateDeclaration(declaration);

        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    /**
     * 신고 게시글 삭제 API
     */
    @DeleteMapping
    public ResponseEntity deleteDeclaration(@RequestParam("declarationCode") int declarationCode,
                                            @RequestParam("userCode") int userCode) {
        Declaration declaration = declarationService.findVerifiedDeclaration(declarationCode);
        int writerCode = declaration.getUserCode();
        String userRole = userService.findVerifiedUser(userCode).getUserRole();

        if (writerCode == userCode || userRole.equals("ROLE_ADMIN")) {
            declarationService.deleteDeclaration(declaration);
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        else {
            String result = "본인의 신고글 또는 관리자만 삭제 가능";
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
    }

    /**
     * 관리자의 신고 처리 API
     */
    @PostMapping("/feedback")
    public ResponseEntity declarationFeedback(@RequestBody AdminFeedbackRequestDto dto) {
        String userRole = userService.findVerifiedUser(dto.getUserCode()).getUserRole();

        if (userRole.equals("ROLE_ADMIN")) {
            declarationService.feedbackDeclaration(dto);
            Declaration result = declarationService.findVerifiedDeclaration(dto.getDeclarationCode());
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } else {
            String result = "관리자만 답변 가능";
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
    }

}
