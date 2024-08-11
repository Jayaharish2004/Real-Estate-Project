package com.example.real_estate_backend.service;

import com.example.real_estate_backend.model.Admin;
import com.example.real_estate_backend.repo.AdminRepository;
import com.example.real_estate_backend.dto.request.AdminUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Admin authenticateAdmin(String email, String password) {
        Admin admin = adminRepository.findByEmail(email);
        if (admin != null && passwordEncoder.matches(password, admin.getPassword())) {
            return admin;
        }
        return null; // Authentication failed
    }

    public Optional<Admin> getAdminById(Long id) {
        return adminRepository.findById(id);
    }

    public Admin updateAdmin(Long id, AdminUpdateRequest updateRequest) {
        Optional<Admin> optionalAdmin = adminRepository.findById(id);
        if (optionalAdmin.isPresent()) {
            Admin admin = optionalAdmin.get();
            // Update fields
            if (updateRequest.getEmail() != null) {
                admin.setEmail(updateRequest.getEmail());
            }
            if (updateRequest.getPassword() != null) {
                admin.setPassword(passwordEncoder.encode(updateRequest.getPassword())); // Hash password
            }
            return adminRepository.save(admin);
        } else {
            throw new RuntimeException("Admin not found");
        }
    }

    public void deleteAdmin(Long id) {
        if (adminRepository.existsById(id)) {
            adminRepository.deleteById(id);
        } else {
            throw new RuntimeException("Admin not found");
        }
    }
}
