package debateProgram.server.user.controller;

import debateProgram.server.user.entity.User;
import debateProgram.server.user.model.kakaoLoginDto.OauthToken;
import debateProgram.server.user.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Slf4j
@Controller
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/oauth/token")
    public ResponseEntity userLogin(@RequestParam("code") String code) {
        OauthToken oauthToken = userService.getAccessToken(code);
        log.info("code = {}", oauthToken);

        User user = userService.saveUserAndGetUser(oauthToken.getAccess_token());
        log.info("user = {}", user);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }


    @PatchMapping("/logout")
    public ResponseEntity userLogout(@RequestParam("userCode") int userCode) {
        User user = userService.findUser(userCode);
        String result = user.getUserState();

        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}
