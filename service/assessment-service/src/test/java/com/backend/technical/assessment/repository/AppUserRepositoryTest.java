package com.backend.technical.assessment.repository;

import com.backend.technical.assessment.entity.AppUser;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@RequiredArgsConstructor
public class AppUserRepositoryTest {

    @Autowired
    private AppUserRepository repository;

    @Test
    public void testFindAllUsers() {

        AppUser user1 = new AppUser();
        user1.setUsername("John");
        user1.setEmail("john@example.com");
        repository.save(user1);

        AppUser user2 = new AppUser();
        user2.setUsername("Jane");
        user2.setEmail("jane@example.com");
        repository.save(user2);

        List<AppUser> users = repository.findAll();

        assertThat(users).hasSize(3);
    }

    @Test
    public void testFindUserByUsername() {

        String username = "admin";
        Optional<AppUser> user = repository.findByUsername(username);

        assertThat(user).isPresent();
    }

    @Test
    public void testFindUserByUsername_NotFound() {

        String username = "ddd";
        Optional<AppUser> user = repository.findByUsername(username);

        assertThat(user).isNotPresent();
    }
}
