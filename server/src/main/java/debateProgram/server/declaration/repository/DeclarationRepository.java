package debateProgram.server.declaration.repository;

import debateProgram.server.declaration.entity.Declaration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface DeclarationRepository extends JpaRepository<Declaration, Integer> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE declaration SET declaration_answer = :answer, declaration_clear = 'Y' WHERE declaration_code = :code", nativeQuery = true)
    void registerFeedBack(@Param("answer") String answer, @Param("code") int code);

    @Transactional
    void deleteAllByUserCode(int userCode);
}
