package debateProgram.server.user.recommend;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Data
@Getter
@Setter
@Entity
@Table(name="recommend")
@NoArgsConstructor
public class Recommend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int recommendCode;

    @Column
    private int userCode;

    @Column
    private int targetCode;

    @Column
    private String likes;


}
