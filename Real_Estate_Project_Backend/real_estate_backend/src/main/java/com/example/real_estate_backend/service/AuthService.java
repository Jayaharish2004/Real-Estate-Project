package com.example.real_estate_backend.service;

import com.example.real_estate_backend.dto.request.LoginRequest;
import com.example.real_estate_backend.dto.request.RegisterRequest;
import com.example.real_estate_backend.dto.response.LoginResponse;

public interface AuthService {
    String register(RegisterRequest registerRequest);

    LoginResponse login(LoginRequest loginRequest);

    String createAdmin();
}
