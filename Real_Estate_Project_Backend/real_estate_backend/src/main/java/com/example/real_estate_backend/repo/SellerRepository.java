package com.example.real_estate_backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.real_estate_backend.model.Seller;

public interface SellerRepository extends JpaRepository<Seller, Long> {
    Seller findByEmail(String email);
}
