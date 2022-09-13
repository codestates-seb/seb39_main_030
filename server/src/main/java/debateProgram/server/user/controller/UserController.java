package debateProgram.server.user.controller;

import debateProgram.server.config.jwt.JwtProperties;
import debateProgram.server.user.entity.User;
import debateProgram.server.user.model.kakaoLoginDto.OauthToken;
import debateProgram.server.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;

@Controller
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;


    @GetMapping("/oauth/token")
    public ResponseEntity getLogin(@RequestParam("code") String code) {
        OauthToken oauthToken = userService.getAccessToken(code);

        String token = userService.saveUserAndGetToken(oauthToken.getAccess_token());

        HttpHeaders headers = new HttpHeaders();
        headers.add(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + token);

        return ResponseEntity.ok().headers(headers).body("SUCCESS");
    }

    @GetMapping("/me")
    public ResponseEntity getCurrentUser(HttpServletRequest request){
        User user = userService.getUser(request);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
