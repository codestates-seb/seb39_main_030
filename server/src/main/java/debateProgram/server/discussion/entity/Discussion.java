package debateProgram.server.discussion.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import debateProgram.server.user.entity.User;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Getter
@Setter
@Entity
@ToString(exclude = "user")
@Table(name="discussion")
@NoArgsConstructor
public class Discussion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int discussionCode;

    @Column
    private int userCode;

    @Column
    private LocalDateTime discussionCreateDate = LocalDateTime.now();

    @Column
    private String discussionTitle;

    @Column
    private String discussionContents;

    @Column
    private String discussionCategory;

    @Column
    private String discussionTag;

    @Column
    private int discussionLikes;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="userCode", insertable = false, updatable = false)
    private User user;

}
