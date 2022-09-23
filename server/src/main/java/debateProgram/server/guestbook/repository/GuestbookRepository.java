package debateProgram.server.guestbook.repository;

import debateProgram.server.guestbook.entity.Guestbook;
import debateProgram.server.guestbook.model.UserBookResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GuestbookRepository extends JpaRepository<Guestbook, Integer> {

    @Query(value = "SELECT g.guestbook_code BookCode, g.guest_code GuestCode, g.guestbook_contents Contents, g.guestbook_create_date CreateDate " +
            "FROM guestbook g WHERE g.user_code = :code", nativeQuery = true)
    List<UserBookResponseDto> findByUserCode(@Param("code") int userCode);

}
