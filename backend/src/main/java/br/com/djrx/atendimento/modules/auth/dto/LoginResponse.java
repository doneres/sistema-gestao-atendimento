package br.com.djrx.atendimento.modules.auth.dto;

import java.time.LocalDate;
import java.util.UUID;

import br.com.djrx.atendimento.modules.pessoas.TipoPessoa;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para resposta de login
 * Contém o token JWT e informações do usuário autenticado
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginResponse {
    
    private String token;
    private UUID id;
    private String nome;
    private String username;
    private String email;
    private TipoPessoa tipo;
    private String telefone;
    private LocalDate dataNascimento;
    private String message;
}
