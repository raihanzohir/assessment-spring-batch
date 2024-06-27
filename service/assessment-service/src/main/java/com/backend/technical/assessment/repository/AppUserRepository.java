package com.backend.technical.assessment.repository;

import com.backend.technical.assessment.entity.AppUser;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Integer> {

  Optional<AppUser> findByUsername(String username);

}
