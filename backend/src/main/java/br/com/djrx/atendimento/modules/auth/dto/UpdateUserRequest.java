package br.com.djrx.atendimento.modules.auth.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para atualização de dados do usuário
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequest {
    
    private String nome;
    
    @Email(message = "Email deve ser válido")
    private String email;
    
    @Pattern(
        regexp = "^[0-9]{10,11}$",
        message = "Telefone deve conter 10 ou 11 dígitos (apenas números)"
    )
    private String telefone;
    
    private LocalDate dataNascimento;
    
    // Campos específicos para Funcionário
    private Long matricula;
    private String funcao;
}
