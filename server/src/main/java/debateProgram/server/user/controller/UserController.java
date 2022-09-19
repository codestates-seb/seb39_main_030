package debateProgram.server.user.controller;

import debateProgram.server.user.entity.User;
import debateProgram.server.user.mapper.UserMapper;
import debateProgram.server.user.model.OauthToken;
import debateProgram.server.user.model.OtherUserResponseDto;
import debateProgram.server.user.model.UserUpdateRequestDto;
import debateProgram.server.user.model.UserResponseDto;
import debateProgram.server.user.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    private final UserMapper userMapper;

    @GetMapping("/oauth/token")
    public ResponseEntity userLogin(@RequestParam("code") String code) {
        OauthToken oauthToken = userService.getAccessToken(code);
        log.info("code = {}", oauthToken);

        User user = userService.saveUserAndGetUser(oauthToken.getAccess_token());
        log.info("user = {}", user);

        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }


    @PostMapping("/logout")
    public ResponseEntity userLogout(@RequestParam("userCode") int userCode) {
        User user = userService.logoutUser(userCode);
        String result = user.getUserState();

        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @GetMapping("/myInfo")
    public ResponseEntity userInfo(@RequestParam("userCode") int userCode){
        User user = userService.findVerifiedUser(userCode);
        UserResponseDto result = userMapper.userToUserResponse(user);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @GetMapping("/otherInfo")
    public ResponseEntity otherUserInfo(@RequestParam("userCode") int userCode){
        User user = userService.findVerifiedUser(userCode);
        OtherUserResponseDto result = userMapper.userToOtherUserResponse(user);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @PostMapping("/myInfo/update")
    public ResponseEntity updateUserInfo(@RequestBody UserUpdateRequestDto userUpdateRequestDto){
        User updateUser = userService.updateUserInfo(userUpdateRequestDto);
        UserResponseDto result = userMapper.userToUserResponse(updateUser);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @PostMapping("/update/state")
    public ResponseEntity updateLiveState(@RequestParam("userCode") int userCode,
                                          @RequestParam("discussionState") String state){
        User user = userService.discussionStateUpdate(userCode, state);
        String result = user.getDiscussionState();

        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @PostMapping("/update/likes")
    public ResponseEntity updateUserLikes(@RequestParam("userCode") int userCode,
                                          @RequestParam("opponentCode") int opponentCode,
                                          @RequestParam("identifier") int identifier){
        if(userCode == opponentCode) {
            String result = "본인의 좋아요는 증감 불가";
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        else {
            int result = userService.userLikesUpdate(opponentCode, identifier);
            return new ResponseEntity(result, HttpStatus.OK);
        }
    }


    @DeleteMapping("/delete")
    public ResponseEntity deleteUser(@RequestParam("userCode") int userCode,
                                     @RequestParam("kakaoEmail") String email){
        String result = userService.verifyEmailAndDelete(userCode, email);

        if(result.equals("FAIL")){
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}
