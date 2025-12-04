package br.com.djrx.atendimento.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {
    
    // Permite configurar via application.properties
    @Value("${cors.allowed-origins:http://localhost:5371,http://localhost:3000}")
    private String allowedOrigins;
    
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        
        // ✅ Permite credenciais (cookies, autenticação)
        config.setAllowCredentials(true);
        
        // ✅ Origens permitidas - específicas por ambiente
        // Em produção, trocar por domínios reais
        List<String> origins = Arrays.asList(allowedOrigins.split(","));
        config.setAllowedOrigins(origins);
        
        // ✅ Apenas métodos HTTP necessários
        config.setAllowedMethods(Arrays.asList(
            "GET",      // Leitura
            "POST",     // Criação
            "PUT",      // Atualização completa
            "PATCH",    // Atualização parcial
            "DELETE",   // Remoção
            "OPTIONS"   // Preflight CORS
        ));
        
        // ✅ Headers permitidos - apenas os necessários
        config.setAllowedHeaders(Arrays.asList(
            "Content-Type",
            "Authorization", 
            "X-Requested-With",
            "Accept",
            "Origin",
            "Access-Control-Request-Method",
            "Access-Control-Request-Headers"
        ));
        
        // ✅ Headers expostos ao frontend
        config.setExposedHeaders(Arrays.asList(
            "Authorization",
            "Content-Type",
            "Content-Disposition"  // Para downloads de arquivos
        ));
        
        // ✅ Cache da configuração CORS (1 hora)
        // Reduz requisições OPTIONS preflight
        config.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        
        return new CorsFilter(source);
    }
}