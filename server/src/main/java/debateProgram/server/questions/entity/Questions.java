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
    private int question_code;

    @Column
    private int user_code;

    @Column
    private LocalDateTime question_create_date = LocalDateTime.now();

    @Column
    private String question_title;

    @Column
    private String question_contents;

    @Column
    private String question_answer;

    @Column
    private String question_clear;
}
