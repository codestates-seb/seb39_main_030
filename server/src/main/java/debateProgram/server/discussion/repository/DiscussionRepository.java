package debateProgram.server.discussion.repository;

import debateProgram.server.discussion.entity.Discussion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface DiscussionRepository extends JpaRepository<Discussion, Integer> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE discussion SET discussion_title = :title, discussion_contents = :contents, " +
            "discussion_category = :category, discussion_tag = :tag WHERE discussion_code = :code", nativeQuery = true)
    void updateDiscussion(@Param("title") String title, @Param("contents") String contents, @Param("category") String category,
                          @Param("tag") String tag, @Param("code") int code);

    @Modifying
    @Transactional
    @Query(value = "UPDATE discussion SET discussion_likes = :likes WHERE discussion_code = :code", nativeQuery = true)
    void updateDiscussionLikes(@Param("code") int discussionCode, @Param("likes") int likes);

}
