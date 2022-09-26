package debateProgram.server.declaration.entity;

import debateProgram.server.user.entity.User;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Getter
@Setter
@Entity
@Table(name="declaration")
@NoArgsConstructor
@DynamicInsert
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

    @ManyToOne
    @JoinColumn(name="userCode", insertable = false, updatable = false)
    private User user;

}
