package debateProgram.server.user.controller;

import debateProgram.server.discussion.service.DiscussionService;
import debateProgram.server.user.recommend.Recommend;
import debateProgram.server.user.entity.User;
import debateProgram.server.user.mapper.UserMapper;
import debateProgram.server.user.model.*;
import debateProgram.server.user.recommend.RecommendRequestDto;
import debateProgram.server.user.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.regex.Pattern;


@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    private final UserMapper userMapper;

    private final DiscussionService discussionService;

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
        String regexp = "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";
        if (!Pattern.matches(regexp, email)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        String result = userService.verifyEmailAndDeleteAll(userCode, email);

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
        UpdateUserResponseDto result = userService.findUserInfo(userCode);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    /**
     * 마이페이지 수정 API
     */
    @PostMapping("/myInfo")
    public ResponseEntity updateUserInfo(@Valid @RequestBody UpdateUserRequestDto updateUserRequestDto, Errors errors){
        if (errors.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        UpdateUserResponseDto updateResult = userService.updateUserInfo(updateUserRequestDto);

        return new ResponseEntity<>(updateResult, HttpStatus.CREATED);
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
     * 사용자 socketId 변경 API
     */
    @PostMapping("/socket")
    public ResponseEntity updateSocketId(@RequestParam("userCode") int userCode,
                                         @RequestParam("socketId") String socketId){
        User updatedUser = userService.registerSocketId(userCode, socketId);
        SocketIdResponseDto result = userMapper.userToSocketResponse(updatedUser);

        return new ResponseEntity(result, HttpStatus.CREATED);
    }

    /**
     * 사용자의 토론글 좋아요 수 변경 API
     */
    @PostMapping("/likes")
    public ResponseEntity updateUserLikesV2(@RequestBody RecommendRequestDto requestDto){
        Recommend recommend = userMapper.recommendRequestToRecommend(requestDto);
        int userCode = recommend.getUserCode();
        int targetCode = recommend.getTargetCode();

        if(userCode == targetCode){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        Recommend history = userService.findVerifiedRecommend(userCode, targetCode);

        // 좋아요 수 증가를 원하는 경우
        if(recommend.getLikes().equals("Y")){
            if(history==null || history.getLikes().equals("N")){
                if(history==null){
                    userService.saveUserRecommend(recommend);
                    discussionService.updateDiscussionLikes(targetCode, 1);
                }
                else if(history.getLikes().equals("N")){
                    userService.updateUserRecommend(recommend);
                    discussionService.updateDiscussionLikes(targetCode, 1);
                }
                return new ResponseEntity<>(HttpStatus.CREATED);
            }
            else {
                String result = "이미 좋아요를 눌렀음";
                return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
            }
        }
        // 좋아요 수 취소를 원하는 경우
        else if(recommend.getLikes().equals("N")) {
            if(history!=null && history.getLikes().equals("Y")){
                userService.updateUserRecommend(recommend);
                discussionService.updateDiscussionLikes(targetCode, 0);
                return new ResponseEntity<>(HttpStatus.CREATED);
            }
            else {
                String result = "좋아요 기록이 없으므로 취소 불가";
                return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
            }
        }
        String result = "요청값을 다시 확인바람";
        return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
    }

}
