package debateProgram.server.user.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Getter
@Entity
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
    private LocalDateTime createDate;


    @Builder
    public User(Long kakaoId, String profileImg, String nickname, String kakaoEmail, String userRole) {
        this.kakaoId = kakaoId;
        this.profileImg = profileImg;
        this.nickname = nickname;
        this.kakaoEmail = kakaoEmail;
        this.userRole = userRole;
    }
}
