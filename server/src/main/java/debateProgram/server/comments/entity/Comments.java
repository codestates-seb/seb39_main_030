package debateProgram.server.comments.entity;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Getter
@Setter
@Entity
@Table(name="comments")
@NoArgsConstructor
public class Comments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentCode;

    @Column
    private int discussionCode;

    @Column
    private int userCode;

    @Column
    private String commentContents;

    @Column
    private LocalDateTime commentCreateDate = LocalDateTime.now();

}
