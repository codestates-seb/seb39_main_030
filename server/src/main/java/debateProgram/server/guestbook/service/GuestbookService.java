package debateProgram.server.guestbook.service;

import debateProgram.server.exception.BusinessLogicException;
import debateProgram.server.exception.ExceptionCode;
import debateProgram.server.guestbook.entity.Guestbook;
import debateProgram.server.guestbook.model.UpdateGuestbookRequestDto;
import debateProgram.server.guestbook.model.UserBookResponseDto;
import debateProgram.server.guestbook.repository.GuestbookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Component
@RequiredArgsConstructor
public class GuestbookService {

    private final GuestbookRepository guestbookRepository;

    @Transactional(readOnly = true)
    public Guestbook findVerifiedGuestBook(int guestbookCode) {
        Optional<Guestbook> optionalGuestbook = guestbookRepository.findById(guestbookCode);

        Guestbook findBook = optionalGuestbook.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.GUESTBOOK_NOT_FOUND));

        return findBook;
    }

    public List<UserBookResponseDto> findUserGuestbook(int userCode) {
        return guestbookRepository.findByUserCode(userCode);
    }

    public Guestbook writeGuestBook(Guestbook guestbook) {
        return guestbookRepository.save(guestbook);
    }

    public void deleteGuestbook(int bookCode) {
        guestbookRepository.deleteById(bookCode);
    }

    public void updateGuestbook(UpdateGuestbookRequestDto dto) {
        String contents = dto.getGuestbookContents();
        int code = dto.getGuestbookCode();
        guestbookRepository.UpdateGuestbook(contents, code);
    }
}
