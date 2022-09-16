package debateProgram.server.declaration.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Getter
@Setter
@Entity
@Table(name="declaration")
@NoArgsConstructor
public class Declaration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int declaration_code;

    @Column
    private int discussion_code;

    @Column
    private int user_code;

    @Column
    private LocalDateTime declaration_create_date = LocalDateTime.now();

    @Column
    private String declaration_reason;

    @Column
    private String declaration_answer;

    @Column
    private String declaration_clear;
}
