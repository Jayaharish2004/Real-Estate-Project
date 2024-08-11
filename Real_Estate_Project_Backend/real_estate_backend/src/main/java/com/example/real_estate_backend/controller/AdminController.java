package com.example.real_estate_backend.controller;

import com.example.real_estate_backend.model.Admin;
import com.example.real_estate_backend.service.AdminService;
import com.example.real_estate_backend.utils.JwtToken;
import com.example.real_estate_backend.dto.request.LoginRequest;
import com.example.real_estate_backend.dto.request.AdminUpdateRequest;
import com.example.real_estate_backend.dto.response.LoginResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;
    // Constructor-based dependency injection
    public AdminController(AdminService adminService, JwtToken jwtToken) {
        this.adminService = adminService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Admin admin = adminService.authenticateAdmin(loginRequest.getEmail(), loginRequest.getPassword());
        if (admin != null) {
            String token = JwtToken.generateToken(admin.getEmail(), null); // Using email for token generation
            LoginResponse loginResponse = LoginResponse.builder()
                                                      .accessToken(token)
                                                      .tokenType("Bearer")
                                                      .build();
            return ResponseEntity.ok(loginResponse);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body("Invalid credentials");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAdmin(@PathVariable Long id) {
        try {
            Admin admin = adminService.getAdminById(id)
                                      .orElseThrow(() -> new RuntimeException("Admin not found"));
            return ResponseEntity.ok(admin);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAdmin(@PathVariable Long id, @RequestBody AdminUpdateRequest updateRequest) {
        try {
            Admin updatedAdmin = adminService.updateAdmin(id, updateRequest);
            return ResponseEntity.ok(updatedAdmin);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAdmin(@PathVariable Long id) {
        try {
            adminService.deleteAdmin(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(e.getMessage());
        }
    }
}
