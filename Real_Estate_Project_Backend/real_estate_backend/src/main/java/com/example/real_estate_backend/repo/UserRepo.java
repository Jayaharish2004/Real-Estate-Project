package com.example.real_estate_backend.repo;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.real_estate_backend.model.User;

public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}