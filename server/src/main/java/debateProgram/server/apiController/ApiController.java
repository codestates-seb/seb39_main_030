package debateProgram.server.apiController;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:8080", allowedHeaders = "*")
@RestController
public class ApiController {

    @GetMapping("/api/")
    public String hello(){
        return "hello";
    }
}
