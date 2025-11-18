package br.com.djrx.atendimento.modules.pessoas.Funcionario;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FuncionarioRepository extends JpaRepository<Funcionario, UUID>{

}
