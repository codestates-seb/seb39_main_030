package debateProgram.server.user.entity;

import lombok.*;

import javax.persistence.*;

@Data
@Getter
@Setter
@Entity
@Table(name="user")
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userCode;

    @Column
    private String userState;

    @Column
    private String discussionState;

    @Column
    private Long kakaoId;

    @Column
    private String nickname;

    @Column
    private String profileImg;

    @Column
    private String kakaoEmail;

    @Column
    private int userLikes;

    @Column
    private String userRole;


    @Builder
    public User(Long kakaoId, String profileImg, String nickname, String kakaoEmail, String userRole, String userState) {
        this.kakaoId = kakaoId;
        this.profileImg = profileImg;
        this.nickname = nickname;
        this.kakaoEmail = kakaoEmail;
        this.userRole = userRole;
        this.userState = userState;
    }

}
