package br.com.djrx.atendimento.modules.pessoas.Funcionario;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import br.com.djrx.atendimento.modules.pessoas.Pessoa;

@Entity
@Table(name = "funcionarios")
@Data
@EqualsAndHashCode(callSuper = true) 
@AllArgsConstructor
@NoArgsConstructor
public class Funcionario extends Pessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    private Long matricula;
    private String funcao;
}