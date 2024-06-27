package com.backend.technical.assessment.security;

import com.backend.technical.assessment.dto.ApiErrorResponse;
import com.backend.technical.assessment.util.ApiResponseStatus;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.AccessDeniedException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private Logger logger = LoggerFactory.getLogger(JwtAuthenticationEntryPoint.class);

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        logger.error("Unauthorized error: {}", authException.getMessage());
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        PrintWriter writer = response.getWriter();
        ApiErrorResponse apiErrorResponse = ApiErrorResponse.builder()
                .status(ApiResponseStatus.ERROR)
                .responseDetails("Unauthorized! Access Denied!")
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.writeValue(writer, apiErrorResponse);
        writer.close();
    }
}
