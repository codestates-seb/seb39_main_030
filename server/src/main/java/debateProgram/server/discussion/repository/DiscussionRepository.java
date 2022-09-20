package debateProgram.server.discussion.repository;

import debateProgram.server.discussion.entity.Discussion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DiscussionRepository extends JpaRepository<Discussion, Integer> {
    Optional<Discussion> findByDiscussionCode(int discussionCode);

}
