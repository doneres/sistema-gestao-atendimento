package br.com.djrx.atendimento.modules.pessoas;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass
public class Pessoa {
    @NotBlank(message = "O nome é obrigatório!")
    private String nome;

    @NotBlank(message = "O username é obrigatório")
    @Pattern(regexp = "^\\S+$", message = "O campo não deve conter espaços!")
    @Column(unique = true)
    private String username;

    @NotBlank(message = "O email é obrigatório!")
    @Email(message = "O campo precisa ter um e-mail válido!")
    private String email;

    // Senha será armazenada como hash (não usar validação de padrão aqui)
    @NotBlank(message = "A senha é obrigatória!")
    @Column(nullable = false)
    private String senha;

    // Salt individual para cada usuário (usado no hash da senha)
    @Column(nullable = false)
    private String salt;

    // Token JWT armazenado para validação de sessão
    @Column(length = 500)
    private String token;

    // Data de criação do token
    private LocalDateTime tokenCreationDate;

    // Tipo de pessoa (CLIENTE, FUNCIONARIO, ADMIN)
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TipoPessoa tipo;

    // Controle de sessão
    private LocalDateTime loginTime;
    private LocalDateTime logoutTime;
    
    @NotBlank(message = "O telefone é obrigatório!")
    @Pattern(
        regexp = "^[0-9]{10,11}$",
        message = "Telefone deve conter 10 ou 11 dígitos (apenas números)"
    )
    private String telefone;
    
    @NotNull(message = "Data de nascimento é obrigatória!")
    @Past(message = "Data de nascimento precisa ser no passado!")
    private LocalDate dataNascimento;

    @CreationTimestamp
    private LocalDateTime dataCadastro;

    @PrePersist
    public void prePersist() {
        dataCadastro = LocalDateTime.now();
    }

    /**
     * Marca o usuário como logado, armazenando o token e o horário de login
     */
    public void login(String jwtToken) {
        this.token = jwtToken;
        this.loginTime = LocalDateTime.now();
        this.tokenCreationDate = LocalDateTime.now();
        this.logoutTime = null; // Limpa logout anterior
    }

    /**
     * Marca o usuário como deslogado, limpando o token e registrando horário de logout
     */
    public void logout() {
        this.token = null;
        this.logoutTime = LocalDateTime.now();
    }

    /**
     * Verifica se o usuário está com sessão ativa (não fez logout após o último login)
     */
    public boolean isSessionActive() {
        if (loginTime == null) return false;
        if (logoutTime == null) return true;
        return loginTime.isAfter(logoutTime);
    }
}
