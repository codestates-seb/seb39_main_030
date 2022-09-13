package debateProgram.server.user.repository;

import debateProgram.server.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    //SELECT * FROM User WHERE email = ?
    public User findByKakaoEmail(String email);

    public User findByUserCode(Long userCode);


}
