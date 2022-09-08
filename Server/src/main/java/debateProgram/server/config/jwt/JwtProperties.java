package debateProgram.server.config.jwt;

public interface JwtProperties {
    String SECRET = "Popcorn";

    int EXPIRATION_TIME = 864000000; //10일 (1분이 60000)

    String TOKEN_PREFIX = "Bearer";

    String HEADER_STRING = "Authorization";

}
