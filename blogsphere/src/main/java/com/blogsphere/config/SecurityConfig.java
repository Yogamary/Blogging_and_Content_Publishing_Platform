package com.blogsphere.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            // Enable CORS
            .cors(cors -> {})

            // Disable CSRF for our API
            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth

                // Image upload
                .requestMatchers(
                    HttpMethod.POST,
                    "/api/upload",
                    "/api/upload/**"
                ).permitAll()

                // Uploaded images
                .requestMatchers(
                    "/uploads/**"
                ).permitAll()

                // All BlogSphere APIs
                .requestMatchers(
                    "/api/users/**",
                    "/api/blogs/**",
                    "/api/comments/**",
                    "/api/likes/**",
                    "/api/bookmarks/**",
                    "/api/admin/**",
                    "/api/reports/**"
                ).permitAll()

                .anyRequest()
                .authenticated()
            );

        return http.build();
    }
}