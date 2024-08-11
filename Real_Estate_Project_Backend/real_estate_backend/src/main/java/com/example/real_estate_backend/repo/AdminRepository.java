package com.example.real_estate_backend.repo;

import com.example.real_estate_backend.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByEmail(String email); // Method to find Admin by email
}
