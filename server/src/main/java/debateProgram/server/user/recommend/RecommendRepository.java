package debateProgram.server.user.recommend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface RecommendRepository extends JpaRepository<Recommend, Integer> {

    Optional<Recommend> findByUserCodeAndTargetCode(@Param("userCode") int userCode, @Param("targetCode") int targetCode);

    @Modifying
    @Transactional
    @Query(value = "UPDATE recommend SET likes = :state WHERE user_code = :user AND target_code = :target", nativeQuery = true)
    void updateLikesState(@Param("user") int userCode, @Param("target") int targetCode, @Param("state") String likes);
}
