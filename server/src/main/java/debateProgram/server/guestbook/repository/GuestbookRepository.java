package debateProgram.server.guestbook.repository;

import debateProgram.server.guestbook.entity.Guestbook;
import debateProgram.server.guestbook.model.GuestBookDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface GuestbookRepository extends JpaRepository<Guestbook, Integer> {

    @Query(value = "SELECT g.guestbook_code BookCode, g.guest_code GuestCode, g.guestbook_contents Contents, g.guestbook_create_date CreateDate " +
            "FROM guestbook g WHERE g.user_code = :code", nativeQuery = true)
    List<GuestBookDto> findByUserCode(@Param("code") int userCode);

    @Modifying
    @Transactional
    @Query(value = "UPDATE guestbook SET guestbook_contents = :contents WHERE guestbook_code = :code", nativeQuery = true)
    void updateGuestbook(@Param("contents") String contents, @Param("code") int code);

    @Transactional
    void deleteAllByUserCode(int userCode);

}
