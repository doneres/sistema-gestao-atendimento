package br.com.djrx.atendimento.modules.pessoas.Cliente;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository para a entidade Cliente
 */
@Repository
public interface ClienteRepository extends JpaRepository<Cliente, UUID> {
    
    /**
     * Busca um cliente pelo username
     * @param username Username do cliente
     * @return Optional contendo o cliente se encontrado
     */
    Optional<Cliente> findByUsername(String username);
    
    /**
     * Verifica se existe um cliente com o username fornecido
     * @param username Username a verificar
     * @return true se existe, false caso contrário
     */
    boolean existsByUsername(String username);
}
