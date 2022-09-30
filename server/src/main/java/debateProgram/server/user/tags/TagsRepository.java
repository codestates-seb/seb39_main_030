package debateProgram.server.user.tags;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface TagsRepository extends JpaRepository<Tags, Integer> {

    @Query(value = "SELECT tag1 Tag1, tag2 Tag2, tag3 Tag3 FROM tags WHERE user_code = :code", nativeQuery = true)
    UserTags findByUserCode(@Param("code") int userCode);

    @Modifying
    @Transactional
    @Query(value = "UPDATE tags SET tag1=:tag1, tag2=:tag2, tag3=:tag3 WHERE user_code=:userCode", nativeQuery = true)
    void updateTags(@Param("userCode") int userCode, @Param("tag1") String tag1, @Param("tag2") String tag2, @Param("tag3") String tag3);



}
