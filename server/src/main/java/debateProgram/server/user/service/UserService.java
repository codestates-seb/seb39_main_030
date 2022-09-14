package debateProgram.server.user.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import debateProgram.server.config.jwt.JwtProperties;
import debateProgram.server.user.entity.User;
import debateProgram.server.user.model.kakaoLoginDto.OauthToken;
import debateProgram.server.user.model.oauth.KakaoProfile;
import debateProgram.server.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Component
@AllArgsConstructor
public class UserService {

//    @Value("${KAKAO_Client_Id}")
//    String client_id;
//
//    @Value("${KAKAO_Client_Secret}")
//    String client_secret;

    private final UserRepository userRepository;

    public OauthToken getAccessToken(String code) {

        RestTemplate restTemplate = new RestTemplate();

        //HttpHeader
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        //HttpBody
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "");
        params.add("redirect_uri", "http://localhost:3000/auth");
        params.add("code", code);
        params.add("client_secret", "");

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

        User user = userRepository.findByKakaoEmail(profile.getKakao_account().getEmail());

        if (user == null) {
            user = User.builder()
                    .kakaoId(profile.getId())
                    .profileImg(profile.getKakao_account().getProfile().getProfile_image_url())
                    .nickname(profile.getKakao_account().getProfile().getNickname())
                    .kakaoEmail(profile.getKakao_account().getEmail())
                    .userRole("ROLE_USER")
                    .userState(0)
                    .build();

            userRepository.save(user);
        }

        return user;
    }
//        return createToken(user);


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


    public String findUser(int userNum) {
        Optional<User> user = userRepository.findById(userNum);
        User findUser = user.orElseThrow(() -> new NoSuchElementException());

        if(findUser.getUserState()==1){
            findUser.setUserState(0);
        }

        return "SUCCESS";
    }










//    public String createToken(User user) {
//        String jwtToken = JWT.create()
//                .withSubject(user.getKakaoEmail())
//                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
//                .withClaim("id", user.getUserCode())
//                .withClaim("nickname", user.getNickname())
//                .sign(Algorithm.HMAC512(JwtProperties.SECRET));
//
//        return jwtToken;
//    }

//    public User getUser(HttpServletRequest request) {
//        Long userCode = (Long) request.getAttribute("userCode");
//
//        User user = userRepository.findByUserCode(userCode);
//
//        return user;
//    }

}