package debateProgram.server.user.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import debateProgram.server.exception.BusinessLogicException;
import debateProgram.server.exception.ExceptionCode;
import debateProgram.server.user.entity.User;
import debateProgram.server.user.model.KakaoProfile;
import debateProgram.server.user.model.OauthToken;
import debateProgram.server.user.model.UserUpdateRequestDto;
import debateProgram.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Slf4j
@Service
@Component
@RequiredArgsConstructor
public class UserService {

    @Value("${KAKAO_Client_Id}")
    private String client_id;

    @Value("${KAKAO_Client_Secret}")
    private String client_secret;

    private final UserRepository userRepository;

    public OauthToken getAccessToken(String code) {

        RestTemplate restTemplate = new RestTemplate();

        //HttpHeader
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        //HttpBody
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", client_id);
        params.add("redirect_uri", "http://localhost:3000/auth");
        params.add("code", code);
        params.add("client_secret", client_secret);

        //HttpEntity (헤더와 바디를 담을 객체)
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        //응답 형식인 json에 맞추어 객체 생성
        ResponseEntity<String> accessTokenResponse = restTemplate.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        /**
         * ObjectMapper
         * String으로 받은 Json 형식의 데이터를 객체로 변환 함.
         * readValue(Json 데이터, 변환할 클래스)
         */
        ObjectMapper objectMapper = new ObjectMapper();
        OauthToken oauthToken = null;

        try {
            oauthToken = objectMapper.readValue(accessTokenResponse.getBody(), OauthToken.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return oauthToken;
    }


    public User saveUserAndGetUser(String token) {

        KakaoProfile profile = findProfile(token);

        User user = userRepository.findByKakaoId(profile.getId());

        if (user == null) {
            user = User.builder()
                    .kakaoId(profile.getId())
                    .profileImg(profile.getKakao_account().getProfile().getProfile_image_url())
                    .nickname(profile.getKakao_account().getProfile().getNickname())
                    .kakaoEmail(profile.getKakao_account().getEmail())
                    .userRole("ROLE_USER")
                    .userState("Y")
                    .build();

            userRepository.save(user);
        } else {
            userRepository.updateUserState(user.getUserCode(), "Y");
        }

        return user;
    }


    public KakaoProfile findProfile(String token) {

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest = new HttpEntity<>(headers);

        ResponseEntity<String> kakaoProfileResponse = restTemplate.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );

        ObjectMapper objectMapper = new ObjectMapper();
        KakaoProfile kakaoProfile = null;

        try {
            kakaoProfile = objectMapper.readValue(kakaoProfileResponse.getBody(), KakaoProfile.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return kakaoProfile;
    }


    public User logoutUser(int userCode) {
        userRepository.updateUserState(userCode, "N");
        User findUser = findVerifiedUser(userCode);

        return findUser;
    }


    @Transactional(readOnly = true)
    public User findVerifiedUser(int userCode) {
        Optional<User> optionalMember = userRepository.findById(userCode);

        User findUser = optionalMember.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        return findUser;
    }


    public User updateUserInfo(UserUpdateRequestDto dto) {
        userRepository.updateInfo(dto.getUserCode(), dto.getNickname(), dto.getProfileImg(), dto.getKakaoEmail());
        User findUser = findVerifiedUser(dto.getUserCode());

        return findUser;
    }


    public User discussionStateUpdate(int userCode, String state) {
        userRepository.updateLiveState(userCode, state);
        User findUser = findVerifiedUser(userCode);

        return findUser;
    }


    @Transactional
    public int userLikesUpdate(int userCode, int identifier) {
        User user = findVerifiedUser(userCode);
        int likes = user.getUserLikes();

        if (identifier==1) {
            likes = likes + 1;
            userRepository.updateUserLikes(userCode, likes);
        }
        else if (identifier==0) {
            likes = likes - 1;
            userRepository.updateUserLikes(userCode, likes);
        }

        return likes;
    }


    public String verifyEmailAndDelete(int userCode, String email) {
        User user = findVerifiedUser(userCode);
        String result = "";

        if(user.getKakaoEmail().equals(email)){
            userRepository.delete(user);
            result = "SUCCESS";
        } else {
            result = "FAIL";
        }

        return result;
    }

}
