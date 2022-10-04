package debateProgram.server.questions.entity;

import debateProgram.server.user.entity.User;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Getter
@Setter
@Entity
@Table(name = "questions")
@NoArgsConstructor
@DynamicInsert
public class Questions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int questionCode;

    @Column
    private int userCode;

    @Column
    private LocalDateTime questionCreateDate = LocalDateTime.now();

    @Column
    private String questionTitle;

    @Column
    private String questionContents;

    @Column
    private String questionAnswer;

    @Column
    private String questionClear;

    @ManyToOne
    @JoinColumn(name="userCode", insertable = false, updatable = false)
    private User user;

}
