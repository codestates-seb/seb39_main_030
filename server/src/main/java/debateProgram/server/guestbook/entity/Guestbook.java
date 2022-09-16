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
    private int guestbook_code;

    @Column
    private int user_code;

    @Column
    private int guest_code;

    @Column
    private String comment_contents;

    @Column
    private LocalDateTime comment_create_date = LocalDateTime.now();

}
