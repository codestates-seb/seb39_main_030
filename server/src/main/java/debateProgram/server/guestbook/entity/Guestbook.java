package debateProgram.server.guestbook.entity;


import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Getter
@Setter
@Entity
@Table(name="guestbook")
@NoArgsConstructor
public class Guestbook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int guestbookCode;

    @Column
    private int userCode;

    @Column
    private int guestCode;

    @Column
    private String commentContents;

    @Column
    private LocalDateTime commentCreateDate = LocalDateTime.now();

}
