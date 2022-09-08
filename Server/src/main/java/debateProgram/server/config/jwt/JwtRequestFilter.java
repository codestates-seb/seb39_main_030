package debateProgram.server.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import debateProgram.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {

    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwtHeader = request.getHeader(JwtProperties.HEADER_STRING);
        System.out.println("JwtRequestFilter 진입");

        if(jwtHeader==null || !jwtHeader.startsWith(JwtProperties.TOKEN_PREFIX)){
            filterChain.doFilter(request, response);
            return;
        }

        String token = jwtHeader.replace(JwtProperties.TOKEN_PREFIX, "");
        Long userCode = null;

        try{
            userCode = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(token)
                    .getClaim("id").asLong();

        }
        catch (TokenExpiredException e){
            request.setAttribute(JwtProperties.HEADER_STRING, "토큰이 만료되었습니다.");
        }
        catch (JWTVerificationException e){
            request.setAttribute(JwtProperties.HEADER_STRING, "유효하지 않은 토큰입니다.");
        }

        request.setAttribute("userCode", userCode);

        filterChain.doFilter(request, response);

   }
}
