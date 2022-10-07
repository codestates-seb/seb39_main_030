package debateProgram.server.user.repository;

import debateProgram.server.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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

}
