package debateProgram.server.exception;

import lombok.Getter;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum ExceptionCode {

    USER_NOT_FOUND(404, "User not found"),
    USER_EXISTS(409, "User exists"),

    POST_NOT_FOUND(404, "Post not found"),
    POST_CODE_EXISTS(409, "Post Code exists"),

    COMMENT_NOT_FOUND(404, "Comment not found"),
    COMMENT_CODE_EXISTS(409, "Comment Code exists");


//    ORDER_NOT_FOUND(404, "Order not found"),
//    CANNOT_CHANGE_ORDER(403, "Order can not change"),
//    NOT_IMPLEMENTATION(501, "Not Implementation"),
//    INVALID_MEMBER_STATUS(400, "Invalid member status");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }

}

