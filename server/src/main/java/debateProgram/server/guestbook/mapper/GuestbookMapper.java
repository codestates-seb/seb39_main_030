package debateProgram.server.guestbook.mapper;

import debateProgram.server.guestbook.entity.Guestbook;
import debateProgram.server.guestbook.model.WriteGuestbookRequestDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GuestbookMapper {

    Guestbook writeRequestToGuestbook(WriteGuestbookRequestDto requestDto);

}
