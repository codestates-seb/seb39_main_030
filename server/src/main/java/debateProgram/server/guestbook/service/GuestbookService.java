package debateProgram.server.guestbook.service;

import debateProgram.server.exception.BusinessLogicException;
import debateProgram.server.exception.ExceptionCode;
import debateProgram.server.guestbook.entity.Guestbook;
import debateProgram.server.guestbook.mapper.GuestbookMapper;
import debateProgram.server.guestbook.model.GuestInfoDto;
import debateProgram.server.guestbook.model.UpdateGuestbookRequestDto;
import debateProgram.server.guestbook.model.GuestBookDto;
import debateProgram.server.guestbook.model.UserGuestBookResponseDto;
import debateProgram.server.guestbook.repository.GuestbookRepository;
import debateProgram.server.user.entity.User;
import debateProgram.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Component
@RequiredArgsConstructor
public class GuestbookService {

    private final GuestbookRepository guestbookRepository;

    private final GuestbookMapper guestbookMapper;

    private final UserService userService;

    @Transactional(readOnly = true)
    public Guestbook findVerifiedGuestBook(int guestbookCode) {
        Optional<Guestbook> optionalGuestbook = guestbookRepository.findById(guestbookCode);

        Guestbook findBook = optionalGuestbook.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.GUESTBOOK_NOT_FOUND));

        return findBook;
    }

    public List<UserGuestBookResponseDto> findUserGuestbook(int userCode) {
        List<GuestBookDto> bookDto = guestbookRepository.findByUserCode(userCode);
        List<UserGuestBookResponseDto> result = new ArrayList<>();

        for(int i=0; i<bookDto.size(); i++){
            User guest = userService.findVerifiedUser(bookDto.get(i).getGuestCode());
            GuestInfoDto guestInfoDto = guestbookMapper.userToGuestInfoDto(guest);

            UserGuestBookResponseDto responseDto = UserGuestBookResponseDto.builder()
                    .bookCode(bookDto.get(i).getBookCode())
                    .guestCode(bookDto.get(i).getGuestCode())
                    .contents(bookDto.get(i).getContents())
                    .createDate(bookDto.get(i).getCreateDate())
                    .guestInfo(guestInfoDto)
                    .build();
            result.add(responseDto);
        }

        return result;
    }

    public Guestbook writeGuestBook(Guestbook guestbook) {
        return guestbookRepository.save(guestbook);
    }

    public void deleteGuestbook(int bookCode) {
        guestbookRepository.deleteById(bookCode);
    }

    public void updateGuestbook(UpdateGuestbookRequestDto dto) {
        String contents = dto.getGuestbookContents();
        int code = dto.getBookCode();
        guestbookRepository.updateGuestbook(contents, code);
    }

}
