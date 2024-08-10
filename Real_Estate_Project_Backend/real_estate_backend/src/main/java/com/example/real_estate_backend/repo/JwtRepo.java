package com.example.real_estate_backend.repo;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.real_estate_backend.model.Token;

public interface JwtRepo extends JpaRepository<Token, String> {
    List<Token> findAllByUser_UidAndExpiredFalseAndRevokedFalse(Long uid);

    Optional<Token> findByToken(String token);
}
