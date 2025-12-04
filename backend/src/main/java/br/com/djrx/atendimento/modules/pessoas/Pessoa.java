package br.com.djrx.atendimento.modules.pessoas;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.Length;

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
    private String username;

    @NotBlank(message = "O email é obrigatório!")
    @Email(message = "O campo precisa ter um e-mail válido!")
    private String email;

    @NotBlank(message = "A senha é obrigatória!")
    @Pattern(
        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{12,}$",
        message = "A senha deve conter no mínimo 12 caracteres, incluindo: letra maiúscula, minúscula, número e caractere especial (@$!%*?&#)!"
    )
    @Length(min = 12,max = 100, message = "A senha denve conter de 12 a 100 caracteres")
    private String senha;

    
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
}
