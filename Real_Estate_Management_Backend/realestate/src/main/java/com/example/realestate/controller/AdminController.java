package com.example.realestate.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.realestate.model.Admin;
import com.example.realestate.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    public AdminController(AdminService adminService) {
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Admin admin) {
        if ("admin@gmail.com".equals(admin.getEmail()) && "admin123".equals(admin.getPassword())) {
            return ResponseEntity.ok("Admin authenticated successfully");
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}
