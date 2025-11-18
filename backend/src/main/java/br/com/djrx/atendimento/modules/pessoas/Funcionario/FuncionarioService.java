package br.com.djrx.atendimento.modules.pessoas.Funcionario;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRespository;

    public List<Funcionario> listarTodosFuncionarios(){
        return funcionarioRespository.findAll();
    }

    public Funcionario buscarFuncionarioPorId(UUID id){
        return funcionarioRespository.findById(id).orElseThrow(() -> new RuntimeException("Funcionario não encontrado com ID: " + id));
    }

    public Funcionario criarFuncionario(Funcionario funcionario){
        return funcionarioRespository.save(funcionario);
    }

    public Funcionario atualizarFuncionario(UUID id, Funcionario funcionario){
        Funcionario funcionarioAtualizado = buscarFuncionarioPorId(id);

        funcionarioAtualizado.setNome(funcionario.getNome());
        funcionarioAtualizado.setDataNascimento(funcionario.getDataNascimento());
        funcionarioAtualizado.setEmail(funcionario.getEmail());
        funcionarioAtualizado.setFuncao(funcionario.getFuncao());
        funcionarioAtualizado.setMatricula(funcionario.getMatricula());
        funcionarioAtualizado.setTelefone(funcionario.getTelefone());
        funcionarioAtualizado.setUsername(funcionario.getUsername());

        return funcionarioRespository.save(funcionarioAtualizado);
    }

    public void deletarFuncionario(UUID id){
        funcionarioRespository.deleteById(id);
    }
}
