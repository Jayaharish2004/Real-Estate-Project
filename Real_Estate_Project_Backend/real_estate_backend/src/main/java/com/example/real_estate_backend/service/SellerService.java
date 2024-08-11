package com.example.real_estate_backend.service;

import com.example.real_estate_backend.model.Seller;
import com.example.real_estate_backend.repo.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SellerService {

    @Autowired
    private SellerRepository sellerRepository;

    // Method to register a new seller
    public Seller registerSeller(Seller seller) {
        // Additional logic can be added here (e.g., password hashing)
        return sellerRepository.save(seller);
    }

    // Method to find a seller by email
    public Optional<Seller> findByEmail(String email) {
        return Optional.ofNullable(sellerRepository.findByEmail(email));
    }

    // Method to update seller details
    public Seller updateSeller(Seller seller) {
        // Ensure seller exists before updating
        if (sellerRepository.existsById(seller.getId())) {
            return sellerRepository.save(seller);
        } else {
            throw new RuntimeException("Seller not found");
        }
    }

    // Method to delete a seller
    public void deleteSeller(Long id) {
        if (sellerRepository.existsById(id)) {
            sellerRepository.deleteById(id);
        } else {
            throw new RuntimeException("Seller not found");
        }
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Seller authenticateSeller(String email, String password) {
        Seller seller = sellerRepository.findByEmail(email);
        if (seller != null && passwordEncoder.matches(password, seller.getPassword())) {
            return seller;
        }
        return null; // Authentication failed
    }
}
