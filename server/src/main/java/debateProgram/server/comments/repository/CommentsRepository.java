package debateProgram.server.comments.repository;

import debateProgram.server.comments.entity.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CommentsRepository extends JpaRepository<Comments, Integer> {

    @Query(value = "SELECT * FROM comments WHERE discussion_code = :discussionCode", nativeQuery = true)
    List<Comments> findByAllDiscussionComments(@Param("discussionCode") int discussionCode);

    @Modifying
    @Transactional
    @Query(value = "UPDATE comments SET comment_contents = :commentContents WHERE comment_code = :commentCode", nativeQuery = true)
    void updateComment(@Param("commentContents") String commentContents, @Param("commentCode") int commentCode);


    @Transactional
    void deleteAllByDiscussionCode(int discussionCode);

    @Transactional
    void deleteAllByUserCode(int userCode);
}
