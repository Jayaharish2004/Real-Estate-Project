package com.example.real_estate_backend.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminUpdateRequest {
    private String email;
    private String password; // Ensure to hash this password in the service layer before saving
}
