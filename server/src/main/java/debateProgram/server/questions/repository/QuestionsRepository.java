package debateProgram.server.questions.repository;

import debateProgram.server.questions.entity.Questions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface QuestionsRepository extends JpaRepository<Questions, Integer> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE questions SET question_answer = :answer, question_clear = 'Y' WHERE question_code = :code", nativeQuery = true)
    void registerReview(@Param("code") int questionCode, @Param("answer") String answer);

    @Transactional
    void deleteAllByUserCode(int userCode);

}
