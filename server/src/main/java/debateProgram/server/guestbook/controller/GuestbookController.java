package debateProgram.server.guestbook.controller;

import debateProgram.server.guestbook.entity.Guestbook;
import debateProgram.server.guestbook.mapper.GuestbookMapper;
import debateProgram.server.guestbook.model.UpdateGuestbookRequestDto;
import debateProgram.server.guestbook.model.UserBookResponseDto;
import debateProgram.server.guestbook.model.WriteGuestbookRequestDto;
import debateProgram.server.guestbook.service.GuestbookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Component
@RestController
@RequiredArgsConstructor
@RequestMapping("/guestbook")
public class GuestbookController {

    private final GuestbookService guestbookService;

    private final GuestbookMapper guestbookMapper;

    /**
     * 방명록 조회 API
     */
    @GetMapping
    public ResponseEntity getMyGuestbook(@RequestParam("userCode") int userCode){
        List<UserBookResponseDto> userGuestbook = guestbookService.findUserGuestbook(userCode);

        return new ResponseEntity<>(userGuestbook, HttpStatus.OK);
    }

    /**
     * 방명록 생성 API
     */
    @PostMapping
    public ResponseEntity createGuestbook(@RequestBody WriteGuestbookRequestDto requestDto){
        Guestbook guestbook = guestbookMapper.writeRequestToGuestbook(requestDto);
        Guestbook savedBook = guestbookService.writeGuestBook(guestbook);

        return new ResponseEntity<>(savedBook, HttpStatus.CREATED);
    }

    /**
     * 방명록 삭제 API
     */
    @DeleteMapping
    public ResponseEntity deleteGuestbook(@RequestParam("guestCode") int guestCode,
                                          @RequestParam("bookCode") int bookCode){
        Guestbook findBook = guestbookService.findVerifiedGuestBook(bookCode);

        if(findBook.getGuestCode() != guestCode){
            String result = "작성자만 삭제 가능";
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        } else {
            guestbookService.deleteGuestbook(bookCode);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    /**
     * 방명록 수정 API
     */
    @PostMapping("/update")
    public ResponseEntity updateGuestbook(@RequestParam("viewerCode") int viewerCode,
                                          @RequestBody UpdateGuestbookRequestDto dto) {
        int userCode = guestbookService.findVerifiedGuestBook(dto.getGuestbookCode()).getGuestCode();

        if (viewerCode == userCode) {
            guestbookService.updateGuestbook(dto);
            Guestbook result = guestbookService.findVerifiedGuestBook(dto.getGuestbookCode());

            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } else {
            String result = "작성자만 수정 가능";
            return new ResponseEntity<>(result, HttpStatus.NO_CONTENT);
        }
    }

}
