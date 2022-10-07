package debateProgram.server.questions.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Getter
@Setter
@Entity
@Table(name="questions")
@NoArgsConstructor
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
}
