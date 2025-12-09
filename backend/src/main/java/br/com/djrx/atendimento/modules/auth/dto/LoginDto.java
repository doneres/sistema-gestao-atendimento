package br.com.djrx.atendimento.modules.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para requisição de login
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto {
    
    @NotBlank(message = "Username é obrigatório")
    private String username;
    
    @NotBlank(message = "Senha é obrigatória")
    private String password;
}
