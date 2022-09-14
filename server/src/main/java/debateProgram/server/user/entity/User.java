package debateProgram.server.user.entity;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Getter
@Entity
@Table(name="user")
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userCode;

    @Column
    private Long kakaoId;

    @Column
    private String profileImg;

    @Column
    private String nickname;

    @Column
    private String kakaoEmail;

    @Column
    private String userRole;

    @Column
    private LocalDateTime createDate = LocalDateTime.now();

    @Column
    private int userState;
    // (0:로그아웃, 1:로그인)

    @Builder
    public User(Long kakaoId, String profileImg, String nickname, String kakaoEmail, String userRole, int userState) {
        this.kakaoId = kakaoId;
        this.profileImg = profileImg;
        this.nickname = nickname;
        this.kakaoEmail = kakaoEmail;
        this.userRole = userRole;
        this.userState = userState;
    }

}
