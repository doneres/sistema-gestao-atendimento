package br.com.djrx.atendimento.modules.pessoas.Funcionario;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository para a entidade Funcionário
 */
@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, UUID> {
    
    /**
     * Busca um funcionário pelo username
     * @param username Username do funcionário
     * @return Optional contendo o funcionário se encontrado
     */
    Optional<Funcionario> findByUsername(String username);
    
    /**
     * Verifica se existe um funcionário com o username fornecido
     * @param username Username a verificar
     * @return true se existe, false caso contrário
     */
    boolean existsByUsername(String username);
}
