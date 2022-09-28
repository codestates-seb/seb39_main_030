package debateProgram.server.user.service;

import debateProgram.server.comments.repository.CommentsRepository;
import debateProgram.server.declaration.repository.DeclarationRepository;
import debateProgram.server.discussion.repository.DiscussionRepository;
import debateProgram.server.guestbook.repository.GuestbookRepository;
import debateProgram.server.questions.repository.QuestionsRepository;
import debateProgram.server.user.entity.User;
import debateProgram.server.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.web.WebAppConfiguration;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@WebAppConfiguration
class UserServiceTest {

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    DiscussionRepository discussionRepository;

    @Autowired
    CommentsRepository commentsRepository;

    @Autowired
    QuestionsRepository questionsRepository;

    @Autowired
    DeclarationRepository declarationRepository;

    @Autowired
    GuestbookRepository guestbookRepository;


    @Test
    @DisplayName("유저 로그아웃 테스트")
    void logoutUser() {
        //given
        int userCode = 9999;

        //when
        User user = userService.logoutUser(userCode);

        //then
        assertThat(user.getUserState()).isEqualTo("N");
    }


    @Test
    @DisplayName("유저 찾기 테스트")
    void findVerifiedUser() {
        int userCode = 9999;
        User findUser = userService.findVerifiedUser(userCode);
        assertThat(findUser.getNickname()).isEqualTo("testUser");
    }

    @Test
    @DisplayName("유저 정보 업데이트")
    void updateUserInfo() {
        int userCode = 9999;
        String nickname = "testUser";
        String profileImg = "image.png";
    }

    @Test
    @DisplayName("")
    void updateDiscussionState() {

    }

    @Test
    @DisplayName("")
    void updateUserLikes() {

    }

    @Test
    @DisplayName("")
    void verifyEmailAndDeleteAll() {

    }

    @Test
    @DisplayName("")
    void findAllLists() {

    }

    @Test
    @DisplayName("")
    void registerSocketId() {

    }
}
