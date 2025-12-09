package br.com.djrx.atendimento.modules.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para validação de token
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ValidateTokenRequest {
    
    @NotBlank(message = "Token é obrigatório")
    private String token;
}
