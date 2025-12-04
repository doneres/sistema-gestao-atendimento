package br.com.djrx.atendimento.modules.pessoas.Cliente;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> listarTodosClientes(){
        return clienteRepository.findAll();
    }

    public Cliente buscarClientePorID(UUID id){
        return clienteRepository.findById(id).orElseThrow(() -> new RuntimeException("Cliente não encontrado com ID: " + id));
    }

    public Cliente criarCliente(Cliente cliente){
        return clienteRepository.save(cliente);
    }

    public Cliente atualizarCliente(UUID id,Cliente cliente){
        Cliente usuario = buscarClientePorID(id);

        usuario.setUsername(cliente.getUsername());
        usuario.setEmail(cliente.getEmail());
        usuario.setNome(cliente.getNome());
        usuario.setTelefone(cliente.getTelefone());
        usuario.setSenha(cliente.getSenha());
        usuario.setDataNascimento(cliente.getDataNascimento());

        return clienteRepository.save(usuario);
    }

    public void deletarUsuario(UUID id){
        clienteRepository.deleteById(id);
    }
}
