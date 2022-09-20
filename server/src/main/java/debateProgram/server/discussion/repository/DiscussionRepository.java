package debateProgram.server.discussion.repository;

import debateProgram.server.discussion.entity.Discussion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface DiscussionRepository extends JpaRepository<Discussion, Integer> {
    Optional<Discussion> findByDiscussionCode(int discussionCode);

    @Modifying
    @Transactional
    @Query(value = "UPDATE discussion SET " +
            "discussion_title = :discussionTitle, " +
            "discussion_contents = :discussionContents, " +
            "discussion_category = :discussionCategory, " +
            "discussion_tag = :discussionTag " +
            "WHERE discussion_code = :discussionCode", nativeQuery = true)
    void updateDiscussion(@Param("discussionTitle") String discussionTitle,
                          @Param("discussionContents") String discussionContents,
                          @Param("discussionCategory") String discussionCategory,
                          @Param("discussionTag") String discussionTag,
                          @Param("discussionCode") int discussionCode);

    @Modifying
    @Transactional
    @Query(value = "UPDATE discussion SET " +
            "discussion_likes = :likes " +
            "WHERE discussion_code = :discussionCode", nativeQuery = true)
    void updateDiscussionLikes(@Param("discussionCode") int discussionCode, @Param("likes") int likes);

}
