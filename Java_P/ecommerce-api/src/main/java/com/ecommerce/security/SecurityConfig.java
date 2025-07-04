package com.ecommerce.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter; // Needed for addFilterBefore

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final com.ecommerce.services.UserDetailsServiceImpl userDetailsService; // Assuming this is your implementation
    private final JwtAuthenticationFilter jwtAuthenticationFilter; // Inject the filter

    public SecurityConfig(com.ecommerce.services.UserDetailsServiceImpl userDetailsService, JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.userDetailsService = userDetailsService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder);
        return new ProviderManager(authenticationProvider);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for stateless APIs (JWT)
                .authorizeHttpRequests(authorize -> authorize
                        // ALLOW PUBLIC ACCESS TO AUTHENTICATION ENDPOINTS FIRST
                        .requestMatchers("/api/auth/**", "/req/signup").permitAll() // Explicitly permit all for auth endpoints
                        // ALL OTHER REQUESTS REQUIRE AUTHENTICATION
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // JWTs imply stateless sessions
                )
                // Add your JWT filter before Spring Security's default UsernamePasswordAuthenticationFilter
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
