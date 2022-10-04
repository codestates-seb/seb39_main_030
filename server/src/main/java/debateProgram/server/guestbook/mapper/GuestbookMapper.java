package debateProgram.server.guestbook.mapper;

import debateProgram.server.guestbook.entity.Guestbook;
import debateProgram.server.guestbook.model.GuestInfoDto;
import debateProgram.server.guestbook.model.WriteGuestbookRequestDto;
import debateProgram.server.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GuestbookMapper {

    Guestbook writeRequestToGuestbook(WriteGuestbookRequestDto requestDto);

    GuestInfoDto userToGuestInfoDto(User user);

}
