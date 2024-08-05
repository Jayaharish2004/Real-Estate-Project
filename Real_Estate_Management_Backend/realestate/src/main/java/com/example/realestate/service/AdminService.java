package com.example.realestate.service;

import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private static final String ADMIN_EMAIL = "admin@gmail.com";
    private static final String ADMIN_PASSWORD = "admin123";

    public boolean authenticate(String email, String password) {
        return ADMIN_EMAIL.equals(email) && ADMIN_PASSWORD.equals(password);
    }
}
