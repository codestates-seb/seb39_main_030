package debateProgram.server.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

public enum ExceptionCode {

    USER_NOT_FOUND(404, "User not found"),
    USER_EXISTS(409, "User exists"),

    POST_NOT_FOUND(404, "Post not found"),
    POST_CODE_EXISTS(409, "Post Code exists"),

    COMMENT_NOT_FOUND(404, "Comment not found"),
    COMMENT_CODE_EXISTS(409, "Comment Code exists"),

    QUESTION_NOT_FOUND(404, "Question not found"),
    QUESTION_CODE_EXISTS(409, "Question Code exists"),

    DECLARATION_NOT_FOUND(404, "Declaration not found"),
    DECLARATION_CODE_EXISTS(409, "Declaration Code exists");

//    ORDER_NOT_FOUND(404, "Order not found"),
//    CANNOT_CHANGE_ORDER(403, "Order can not change"),
//    NOT_IMPLEMENTATION(501, "Not Implementation"),
//    INVALID_MEMBER_STATUS(400, "Invalid member status");

    @Getter
    private int status;

    @Getter
    private String message;

}