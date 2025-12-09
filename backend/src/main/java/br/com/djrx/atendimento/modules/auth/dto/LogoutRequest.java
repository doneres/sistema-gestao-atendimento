package br.com.djrx.atendimento.modules.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para requisição de logout
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LogoutRequest {
    
    @NotBlank(message = "Token é obrigatório")
    private String token;
}
