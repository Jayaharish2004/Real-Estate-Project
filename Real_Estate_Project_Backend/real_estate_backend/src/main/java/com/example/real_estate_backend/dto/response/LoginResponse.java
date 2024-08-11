package com.example.real_estate_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    private String accessToken;
    private String refreshToken;
    private String tokenType;

    // Optional: If you need default values, you can initialize them here.
    // Uncomment if required
    // @Builder.Default
    // private String accessToken = "";
    // @Builder.Default
    // private String refreshToken = "";
    // @Builder.Default
    // private String tokenType = "Bearer";
}
