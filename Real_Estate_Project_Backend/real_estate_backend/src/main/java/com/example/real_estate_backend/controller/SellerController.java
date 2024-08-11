package com.example.real_estate_backend.controller;

import com.example.real_estate_backend.dto.request.LoginRequest;
import com.example.real_estate_backend.dto.response.LoginResponse;
import com.example.real_estate_backend.model.Seller;
import com.example.real_estate_backend.service.SellerService;
import com.example.real_estate_backend.utils.JwtToken;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/sellers")
public class SellerController {

    @Autowired
    private SellerService sellerService;

    // Endpoint to register a new seller
    @PostMapping("/register")
    public ResponseEntity<Seller> registerSeller(@RequestBody Seller seller) {
        Seller registeredSeller = sellerService.registerSeller(seller);
        return ResponseEntity.ok(registeredSeller);
    }

    // Endpoint to get a seller by email
    @GetMapping("/email/{email}")
    public ResponseEntity<Seller> getSellerByEmail(@PathVariable String email) {
        Optional<Seller> seller = sellerService.findByEmail(email);
        return seller.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint to update seller details
    @PutMapping("/update")
    public ResponseEntity<Seller> updateSeller(@RequestBody Seller seller) {
        Seller updatedSeller = sellerService.updateSeller(seller);
        return ResponseEntity.ok(updatedSeller);
    }

    // Endpoint to delete a seller
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteSeller(@PathVariable Long id) {
        sellerService.deleteSeller(id);
        return ResponseEntity.noContent().build();
    }

     @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Seller seller = sellerService.authenticateSeller(loginRequest.getEmail(), loginRequest.getPassword());
        if (seller != null) {
            // Generate the token (make sure `generateToken` matches your logic)
            String accessToken = JwtToken.generateToken(seller.getEmail(), null);
            // Optionally generate a refresh token if your logic requires it
            String refreshToken = ""; // Set an appropriate value if needed
            
            // Build the LoginResponse object using Lombok's builder
            LoginResponse loginResponse = LoginResponse.builder()
                                                      .accessToken(accessToken)
                                                      .refreshToken(refreshToken)
                                                      .tokenType("Bearer")
                                                      .build();
            return ResponseEntity.ok(loginResponse);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
