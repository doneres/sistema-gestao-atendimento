package br.com.djrx.atendimento.modules.auth.dto;

import java.time.LocalDate;

import br.com.djrx.atendimento.modules.pessoas.TipoPessoa;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para registro de novo usuário
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    
    @NotBlank(message = "Nome é obrigatório")
    private String nome;
    
    @NotBlank(message = "Username é obrigatório")
    @Pattern(regexp = "^\\S+$", message = "Username não deve conter espaços")
    private String username;
    
    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email deve ser válido")
    private String email;
    
    @NotBlank(message = "Senha é obrigatória")
    @Pattern(
        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{12,}$",
        message = "Senha deve ter no mínimo 12 caracteres, incluindo: letra maiúscula, minúscula, número e caractere especial (@$!%*?&#)"
    )
    private String password;
    
    @NotBlank(message = "Telefone é obrigatório")
    @Pattern(
        regexp = "^[0-9]{10,11}$",
        message = "Telefone deve conter 10 ou 11 dígitos (apenas números)"
    )
    private String telefone;
    
    @NotNull(message = "Data de nascimento é obrigatória")
    @Past(message = "Data de nascimento deve ser no passado")
    private LocalDate dataNascimento;
    
    @NotNull(message = "Tipo de pessoa é obrigatório")
    private TipoPessoa tipo;
    
    // Campos específicos para Funcionário
    private Long matricula;
    private String funcao;
}
