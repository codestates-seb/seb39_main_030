package debateProgram.server.declaration.service;

import debateProgram.server.declaration.entity.Declaration;
import debateProgram.server.declaration.model.AdminFeedbackRequestDto;
import debateProgram.server.declaration.model.PostDeclarationResponseDto;
import debateProgram.server.declaration.repository.DeclarationRepository;
import debateProgram.server.exception.BusinessLogicException;
import debateProgram.server.exception.ExceptionCode;
import debateProgram.server.user.entity.User;
import debateProgram.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@Component
@RequiredArgsConstructor
public class DeclarationService {

    private final DeclarationRepository declarationRepository;

    private final UserService userService;

    public Declaration findVerifiedDeclaration(int declarationCode) {
        Optional<Declaration> optionalDeclaration = declarationRepository.findById(declarationCode);

        Declaration declaration = optionalDeclaration.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.DECLARATION_NOT_FOUND));

        return declaration;
    }

    /**
     * 신고 게시글 생성
     */
    public PostDeclarationResponseDto crateDeclaration(Declaration declaration) {
        Declaration save = declarationRepository.save(declaration);
        User user = userService.findVerifiedUser(save.getUserCode());

        PostDeclarationResponseDto result = PostDeclarationResponseDto.builder()
                .declarationCode(save.getDeclarationCode())
                .declarationReason(save.getDeclarationReason())
                .userCode(user.getUserCode())
                .nickname(user.getNickname())
                .profileImg(user.getProfileImg())
                .build();

        return result;
    }

    /**
     * 신고 게시글 삭제
     */
    public void deleteDeclaration(Declaration declaration) {
        declarationRepository.delete(declaration);
    }

    /**
     * 관리자의 신고 처리
     */
    public void feedbackDeclaration(AdminFeedbackRequestDto dto) {
        int code = dto.getDeclarationCode();
        String answer = dto.getDeclarationAnswer();
        declarationRepository.registerFeedBack(answer, code);
    }

    public Page<Declaration> findAllDeclarations(int page, int size) {
        return declarationRepository.findAll(PageRequest.of(page, size, Sort.by("declarationCode").descending()));
    }
}
