package br.com.djrx.atendimento.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * Configuração de segurança do Spring Security
 * Define políticas de autenticação, CORS e endpoints públicos
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * Configura a cadeia de filtros de segurança
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Desabilita CSRF (usando JWT, não precisa)
            .csrf(csrf -> csrf.disable())
            
            // Configura CORS
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            
            // Configura autorização de requisições
            .authorizeHttpRequests(auth -> auth
                // Endpoints de autenticação públicos
                .requestMatchers("/auth/**").permitAll()
                
                // Swagger/OpenAPI públicos
                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html", "/api-docs/**").permitAll()
                
                // Endpoints de health check públicos
                .requestMatchers("/actuator/**").permitAll()
                
                // Qualquer outra requisição requer autenticação
                .anyRequest().authenticated()
            )
            
            // Configura política de sessão como STATELESS (JWT não usa sessão)
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            );

        return http.build();
    }

    /**
     * Configuração CORS
     * Permite requisições de origens específicas
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Origens permitidas (desenvolvimento)
        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:3000",
            "http://localhost:5173",
            "http://localhost:5371",
            "http://127.0.0.1:5371"
        ));
        
        // Métodos HTTP permitidos
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        
        // Headers permitidos
        configuration.setAllowedHeaders(List.of("*"));
        
        // Permite credenciais
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        
        return source;
    }

    /**
     * Bean do encoder de senha BCrypt
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
