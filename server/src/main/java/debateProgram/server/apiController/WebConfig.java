package debateProgram.server.apiController;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:8080", "http://54.180.106.244:8080",
                        "http://localhost:3000",
                        "https://localhost:3000",
                        "https://127.0.0.1:3000",
                        "http://192.168.1.100:3000",
                        "http://pre-project-team30.s3-website.ap-northeast-2.amazonaws.com/"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE")
        ;

    }

}
