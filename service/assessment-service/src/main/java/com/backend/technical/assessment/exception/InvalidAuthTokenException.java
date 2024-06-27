package com.backend.technical.assessment.exception;

import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;

public class InvalidAuthTokenException extends JwtException {

    private static final long serialVersionUID = 1L;

    private final String message;
    private final HttpStatus httpStatus;

    public InvalidAuthTokenException(String message, HttpStatus httpStatus) {
        super(message);
        this.message = message;
        this.httpStatus = httpStatus;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
