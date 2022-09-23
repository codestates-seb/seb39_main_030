package debateProgram.server.declaration.mapper;

import debateProgram.server.declaration.entity.Declaration;
import debateProgram.server.declaration.model.PostDeclarationRequestDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DeclarationMapper {

    Declaration postRequestToDeclaration(PostDeclarationRequestDto postDeclarationRequestDto);

}
