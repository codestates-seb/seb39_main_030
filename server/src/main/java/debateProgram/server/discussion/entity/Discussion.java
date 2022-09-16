package debateProgram.server.discussion.entity;

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
@Table(name="discussion")
@NoArgsConstructor
public class Discussion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int discussion_code;

    @Column
    private int user_code;

    @Column
    private LocalDateTime discussion_create_date = LocalDateTime.now();

    @Column
    private String discussion_title;

    @Column
    private String discussion_contents;

    @Column
    private String discussion_category;

    @Column
    private String discussion_tag;

    @Column
    private int discussion_likes;

}
