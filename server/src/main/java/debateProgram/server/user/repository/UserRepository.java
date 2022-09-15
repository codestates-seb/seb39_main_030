package debateProgram.server.user.repository;

import debateProgram.server.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByKakaoEmail(String email);

    @Modifying
    @Transactional
    @Query(value = "UPDATE user SET user_state = 'N' WHERE user_code = :userCode", nativeQuery = true)
    void updateUserState(@Param(("userCode")) int userCode);

}
