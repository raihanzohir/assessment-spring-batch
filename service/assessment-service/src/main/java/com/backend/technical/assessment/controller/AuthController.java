package com.backend.technical.assessment.controller;

import com.backend.technical.assessment.batch.controller.TransactionHistoryBatchProcessController;
import com.backend.technical.assessment.entity.AppUser;
import com.backend.technical.assessment.exception.UserNotFoundException;
import com.backend.technical.assessment.repository.AppUserRepository;
import com.backend.technical.assessment.security.JwtResponse;
import com.backend.technical.assessment.security.JwtUtil;
import com.backend.technical.assessment.security.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private AppUserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AppUser user) throws Exception {

        logger.info("AppUser: {}", user);
        try {
            user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
            userRepository.save(user);
            return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception();
        }

    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody AppUser user) throws Exception {

        try {
            final UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
            return new ResponseEntity<>(jwtUtil.generateToken(userDetails.getUsername()), HttpStatus.OK);
        } catch (Exception e) {
            logger.info("Exception - " + e.getMessage());
            e.printStackTrace();
            throw new UserNotFoundException("Invalid User Credentials", HttpStatus.BAD_REQUEST);
        }

    }
}

