package debateProgram.server.config.jwt;

public interface JwtProperties {
    // jwt signatuer를 해싱할 때 사용하는 비밀 키로 원하는 영어 단어로 작성
    String SECRET = "Popcorn";

    int EXPIRATION_TIME = 864000000; //10일 (1분이 60000)

    String TOKEN_PREFIX = "Bearer ";

    String HEADER_STRING = "Authorization";

}
