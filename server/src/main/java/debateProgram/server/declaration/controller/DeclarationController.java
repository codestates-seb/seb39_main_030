package debateProgram.server.declaration.controller;

import debateProgram.server.declaration.entity.Declaration;
import debateProgram.server.declaration.mapper.DeclarationMapper;
import debateProgram.server.declaration.model.AdminFeedbackRequestDto;
import debateProgram.server.declaration.model.PostDeclarationRequestDto;
import debateProgram.server.declaration.service.DeclarationService;
import debateProgram.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

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
                                         @RequestParam("viewerCode") int viewerCode) {
        int userCode = declarationService.findVerifiedDeclaration(declarationCode).getUserCode();
        String viewerRole = userService.findVerifiedUser(viewerCode).getUserRole();

        if (userCode == viewerCode || viewerRole.equals("ROLE_ADMIN")) {
            Declaration declaration = declarationService.findVerifiedDeclaration(declarationCode);

            return new ResponseEntity<>(declaration, HttpStatus.OK);
        } else {
            String result = "본인의 신고글 또는 관리자만 조회 가능";
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
    }

    /**
     * 신고 게시글 생성 API
     * null값이 N으로 들어가야 하는데 아직 구현X
     */
    @PostMapping
    public ResponseEntity postDeclaration(@RequestBody PostDeclarationRequestDto requestDto) {
        Declaration declaration = declarationMapper.postRequestToDeclaration(requestDto);
        Declaration crateDeclaration = declarationService.crateDeclaration(declaration);

        return new ResponseEntity<>(crateDeclaration, HttpStatus.CREATED);
    }

    /**
     * 신고 게시글 삭제 API
     */
    @DeleteMapping
    public ResponseEntity deleteDeclaration(@RequestParam("declarationCode") int declarationCode,
                                            @RequestParam("viewerCode") int viewerCode) {
        Declaration declaration = declarationService.findVerifiedDeclaration(declarationCode);
        int userCode = declaration.getUserCode();
        String viewerRole = userService.findVerifiedUser(viewerCode).getUserRole();

        if (userCode == viewerCode || viewerRole.equals("ROLE_ADMIN")) {
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
