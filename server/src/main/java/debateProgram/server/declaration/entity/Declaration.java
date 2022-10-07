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
    private int declarationCode;

    @Column
    private int discussionCode;

    @Column
    private int userCode;

    @Column
    private LocalDateTime declarationCreateDate = LocalDateTime.now();

    @Column
    private String declarationReason;

    @Column
    private String declarationAnswer;

    @Column
    private String declarationClear;
}
