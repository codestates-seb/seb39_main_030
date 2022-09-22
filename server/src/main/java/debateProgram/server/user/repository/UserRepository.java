package debateProgram.server.user.repository;

import debateProgram.server.user.entity.User;
import debateProgram.server.user.model.AllListsInterface.CommentsDto;
import debateProgram.server.user.model.AllListsInterface.DeclarationsDto;
import debateProgram.server.user.model.AllListsInterface.DiscussionsDto;
import debateProgram.server.user.model.AllListsInterface.QuestionsDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByKakaoId(Long kakaoId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE user SET user_state = :state WHERE user_code = :userCode", nativeQuery = true)
    void updateUserState(@Param("userCode") int userCode, @Param("state") String state);

    @Modifying
    @Transactional
    @Query(value = "UPDATE user SET nickname=:nickname, profile_img=:profileImg, kakao_email=:kakaoEmail WHERE user_code=:userCode", nativeQuery = true)
    void updateInfo(@Param("userCode") int userCode, @Param("nickname") String nickname,
                    @Param("profileImg") String profileImg, @Param("kakaoEmail") String kakaoEmail);

    @Modifying
    @Transactional
    @Query(value = "UPDATE user SET discussion_state = :state WHERE user_code = :userCode", nativeQuery = true)
    void updateLiveState(@Param("userCode") int userCode, @Param("state") String state);

    @Modifying
    @Transactional
    @Query(value = "UPDATE user SET user_likes = :likes WHERE user_code = :userCode", nativeQuery = true)
    void updateUserLikes(@Param("userCode") int userCode, @Param("likes") int likes);

    @Query(value = "SELECT d.discussion_code DiscussionCode, d.discussion_title DiscussionTitle, d.discussion_create_date DiscussionCreateDate " +
            "FROM user JOIN discussion d ON user.user_code = d.user_code WHERE user.user_code = :userCode", nativeQuery = true)
    List<DiscussionsDto> findAllDiscussions(@Param("userCode") int userCode);

    @Query(value = "SELECT c.comment_code CommentCode, c.comment_contents CommentContents, c.comment_create_date CommentCreateDate " +
            "FROM user JOIN comments c ON user.user_code = c.user_code WHERE user.user_code = :userCode", nativeQuery = true)
    List<CommentsDto> findAllComments(@Param("userCode") int userCode);

    @Query(value = "SELECT q.question_code QuestionCode, q.question_title QuestionTitle, q.question_create_date QuestionCreateDate " +
            "FROM user JOIN questions q ON user.user_code = q.user_code WHERE user.user_code = :userCode", nativeQuery = true)
    List<QuestionsDto> findAllQuestions(@Param("userCode") int userCode);

    @Query(value = "SELECT d.declaration_code DeclarationCode, d.declaration_reason DeclarationReason, d.declaration_create_date DeclarationCreateDate " +
            "FROM user JOIN declaration d ON user.user_code = d.user_code WHERE user.user_code = :userCode", nativeQuery = true)
    List<DeclarationsDto> findAllDeclarations(@Param("userCode") int userCode);

    @Modifying
    @Transactional
    @Query(value = "UPDATE user SET socket_id = :id WHERE user_code = :code", nativeQuery = true)
    void updateSocketId(@Param("code")int userCode, @Param("id")String socketId);
}
