package br.com.djrx.atendimento.modules.tipoAtendimento;

import java.util.UUID;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "TipoServico")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TipoAtendimento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank(message = "Necessário ter um nome de serviço - APENAS PALAVRAS")
    @Pattern(
        regexp = "^[A-Za-zÀ-ÿ\\s]+$",
        message = "O campo deve conter apenas letras!"
    )
    private String nomeServico;

    @NotBlank(message = "Necessário ter uma descrição do serviço")
    private String descricao;

    @Column(length = 10)
    private String iniciaisServico;

    private static String obterIniciaisServico(String nomeServico) {
        if (nomeServico == null || nomeServico.isBlank()) {
            return "";
        }
        
        String[] palavras = nomeServico.trim().split("\\s+");
        StringBuilder iniciais = new StringBuilder();
        
        for (String palavra : palavras) {
            if (!palavra.isEmpty()) {
                int tamanho = Math.min(2, palavra.length());
                iniciais.append(palavra.substring(0, tamanho));
            }
        }
        
        return iniciais.toString().toUpperCase();
    }
    
    @PrePersist
    @PreUpdate
    public void gerarIniciais() {
        this.iniciaisServico = obterIniciaisServico(this.nomeServico);
    }
}