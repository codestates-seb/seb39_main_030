package debateProgram.server.user.controller;

import debateProgram.server.user.entity.User;
import debateProgram.server.user.mapper.UserMapper;
import debateProgram.server.user.model.*;
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

    /**
     * 카카오 oauth 로그인 API
     */
    @GetMapping("/oauth/token")
    public ResponseEntity userLogin(@RequestParam("code") String code) {
        OauthToken oauthToken = userService.getAccessToken(code);
        log.info("code = {}", oauthToken);

        User user = userService.saveUserAndGetUser(oauthToken.getAccess_token());
        log.info("user = {}", user);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    /**
     * 사용자 로그아웃 API
     */
    @PostMapping("/logout")
    public ResponseEntity userLogout(@RequestParam("userCode") int userCode) {
        User user = userService.logoutUser(userCode);
        String result = user.getUserState();

        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    /**
     * 사용자 삭제 API
     */
    @DeleteMapping
    public ResponseEntity deleteUser(@RequestParam("userCode") int userCode,
                                     @RequestParam("kakaoEmail") String email){
        String result = userService.verifyEmailAndDelete(userCode, email);

        if(result.equals("FAIL")){
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }

        return new ResponseEntity<>(result, HttpStatus.NO_CONTENT);
    }

    /**
     * 마이페이지 조회 API
     */
    @GetMapping("/myInfo")
    public ResponseEntity userInfo(@RequestParam("userCode") int userCode){
        User user = userService.findVerifiedUser(userCode);
        UpdateUserResponseDto result = userMapper.userToUserResponse(user);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    /**
     * 마이페이지 수정 API
     */
    @PostMapping("/myInfo")
    public ResponseEntity updateUserInfo(@RequestBody UpdateUserRequestDto updateUserRequestDto){
        User updateUser = userService.updateUserInfo(updateUserRequestDto);
        UpdateUserResponseDto result = userMapper.userToUserResponse(updateUser);

        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    /**
     * 다른 사용자의 프로필 조회 API
     */
    @GetMapping("/otherInfo")
    public ResponseEntity otherUserInfo(@RequestParam("userCode") int userCode){
        User user = userService.findVerifiedUser(userCode);
        OtherUserResponseDto result = userMapper.userToOtherUserResponse(user);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    /**
     * 사용자가 작성한 전체 글 조회 API
     */
    @GetMapping("/lists")
    public ResponseEntity getAllList(@RequestParam("userCode") int userCode){
        AllListsResponseDto result = userService.findAllLists(userCode);

        return new ResponseEntity(result, HttpStatus.OK);
    }

    /**
     * 실시간 토론 상태 변경 API
     */
    @PostMapping("/state")
    public ResponseEntity updateLiveState(@RequestParam("userCode") int userCode,
                                          @RequestParam("discussionState") String state){
        User user = userService.updateDiscussionState(userCode, state);
        String result = user.getDiscussionState();

        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    /**
     * 사용자 좋아요 수 변경 API
     */
    @PostMapping("/likes")
    public ResponseEntity updateUserLikes(@RequestParam("userCode") int userCode,
                                          @RequestParam("viewerCode") int viewerCode,
                                          @RequestParam("likes") int likes){
        if(userCode == viewerCode) {
            String result = "본인의 좋아요는 증감 불가";
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        else {
            int result = userService.updateUserLikes(viewerCode, likes);
            return new ResponseEntity(result, HttpStatus.CREATED);
        }
    }

    /**
     * 사용자 socketId 변경 API
     */
    @PostMapping("/socket")
    public ResponseEntity updateSocketId(@RequestParam("userCode") int userCode,
                                         @RequestParam("socketId") String socketId){
        User updatedUser = userService.registerSocketId(userCode, socketId);
        SocketIdResponseDto result = userMapper.userToSocketResponse(updatedUser);

        return new ResponseEntity(result, HttpStatus.CREATED);
    }



}
