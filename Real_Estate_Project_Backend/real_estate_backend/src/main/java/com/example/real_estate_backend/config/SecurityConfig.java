package com.example.real_estate_backend.config;

import java.util.Arrays;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpHeaders.CONTENT_TYPE;
import static org.springframework.http.HttpMethod.*;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthenticationProvider adminAuthenticationProvider;
    private final AuthenticationProvider sellerAuthenticationProvider;
    private final JwtAuthenticationFilter adminJwtAuthenticationFilter;
    private final JwtAuthenticationFilter sellerJwtAuthenticationFilter;
    private final LogoutHandler logoutHandler;

    private static final String[] PUBLIC_ENDPOINTS = {
        "/api/auth/**",  // Authentication endpoints
        "/api/web/sites",
        "/swagger-ui/**",
        "/swagger-ui.html/**",
        "/api/admin/default",
        "/v3/api-docs/**",
        "/api/properties/**",
        "/api/admin/login",  // Admin login endpoint
        "/api/seller/login", // Seller login endpoint
        "/api/agents/**"    // Agents endpoints
    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
            .csrf(AbstractHttpConfigurer::disable)  // Disable CSRF for simplicity
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))  // Enable CORS
            .authorizeHttpRequests(authorize -> 
                authorize
                    .requestMatchers(PUBLIC_ENDPOINTS).permitAll()  // Public endpoints
                    .anyRequest().authenticated()  // All other requests require authentication
            )
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // Stateless sessions
            )
            .authenticationProvider(adminAuthenticationProvider)  // Admin authentication
            .authenticationProvider(sellerAuthenticationProvider)  // Seller authentication
            .addFilterBefore(adminJwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)  // Admin JWT filter
            .addFilterBefore(sellerJwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)  // Seller JWT filter
            .logout(logout -> 
                logout
                    .logoutUrl("/api/auth/logout")  // Logout URL
                    .addLogoutHandler(logoutHandler)  // Custom logout handler
                    .logoutSuccessHandler((request, response, authentication) -> {
                        SecurityContextHolder.clearContext();  // Clear the security context on logout
                        response.setStatus(HttpServletResponse.SC_OK);  // Return 200 OK on logout
                    })
            )
            .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));  // Frontend origin
        corsConfiguration.setAllowedHeaders(Arrays.asList(AUTHORIZATION, CONTENT_TYPE));  // Allowed headers
        corsConfiguration.setAllowedMethods(Arrays.asList(GET.name(), POST.name(), PUT.name(), PATCH.name(), DELETE.name(), HEAD.name(), OPTIONS.name()));  // Allowed methods
        corsConfiguration.setAllowCredentials(true);  // Allow credentials
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);  // Apply CORS configuration
        return source;
    }
}
