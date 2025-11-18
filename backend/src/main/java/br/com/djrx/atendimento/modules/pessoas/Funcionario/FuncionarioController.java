package br.com.djrx.atendimento.modules.pessoas.Funcionario;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/funcionarios")
public class FuncionarioController {

    @Autowired
    private FuncionarioService funcionarioService;

    @GetMapping
    public ResponseEntity<List<Funcionario>> listarTodosFuncionarios(){
        List<Funcionario> funcionarios = funcionarioService.listarTodosFuncionarios();
        return ResponseEntity.ok(funcionarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Funcionario> buscarFuncionarioPorId(@PathVariable UUID id){
        Funcionario funcionario = funcionarioService.buscarFuncionarioPorId(id);
        return ResponseEntity.ok(funcionario);
    }
    
    @PostMapping
    public ResponseEntity<Funcionario> criarFuncionario(@Valid @RequestBody Funcionario funcionario){
        Funcionario novoFuncionario = funcionarioService.criarFuncionario(funcionario);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoFuncionario);
    }
    
    @PatchMapping("/{id}")
    public ResponseEntity<Funcionario> atualizarFuncionario(@PathVariable UUID id, @RequestBody Funcionario funcionario){
        Funcionario funcionarioAtualizado = funcionarioService.atualizarFuncionario(id, funcionario);
        return ResponseEntity.ok(funcionarioAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Funcionario> deletarFuncionario(@PathVariable UUID id){
        funcionarioService.deletarFuncionario(id);
        return ResponseEntity.noContent().build();
    }
    
}
