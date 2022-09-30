package debateProgram.server.user.tags;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Data
@Getter
@Setter
@Entity
@Table(name="user")
@NoArgsConstructor
@DynamicInsert
public class Tags {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int tagsCode;

    @Column
    private int userCode;

    @Column
    private String tag1;

    @Column
    private String tag2;

    @Column
    private String tag3;

}
