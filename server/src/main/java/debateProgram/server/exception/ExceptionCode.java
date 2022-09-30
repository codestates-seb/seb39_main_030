package debateProgram.server.exception;

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

    GUESTBOOK_NOT_FOUND(404, "Guestbook not found"),
    GUESTBOOK_CODE_EXISTS(409, "Guestbook Code exists"),

    RECOMMEND_NOT_FOUND(404, "Recommend not found"),
    RECOMMEND_CODE_EXISTS(409, "Recommend Code exists");


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

