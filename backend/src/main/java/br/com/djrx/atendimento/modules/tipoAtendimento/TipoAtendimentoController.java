package br.com.djrx.atendimento.modules.tipoAtendimento;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/tipos-de-atendimentos")
public class TipoAtendimentoController {

    @Autowired
    private TipoAtendimentoService tipoAtendimentoService;

    @GetMapping
    public ResponseEntity<List<TipoAtendimento>> BuscarTodosTiposAtendimentos(){
        List<TipoAtendimento> tiposAtendimentos = tipoAtendimentoService.listarTodosTiposAtendimento();
        return ResponseEntity.ok(tiposAtendimentos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TipoAtendimento> buscarTipoAtendimentoPorId(@PathVariable UUID id){
        TipoAtendimento tipoAtendimento = tipoAtendimentoService.buscarAtendimentoPorId(id);

        return ResponseEntity.ok(tipoAtendimento);
    }

    @PostMapping
    public ResponseEntity<TipoAtendimento> cadastrarTipoAtendimento(@Valid @RequestBody TipoAtendimento tipoAtendimento){
        TipoAtendimento novoTipoAtendimento = tipoAtendimentoService.cadastrarTipoAtendimento(tipoAtendimento);

        return ResponseEntity.status(HttpStatus.CREATED).body(tipoAtendimento);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TipoAtendimento> atualizarTipoAtendimento(@PathVariable UUID id, @RequestBody TipoAtendimento tipoAtendimento){
        TipoAtendimento tipoAtendimentoAtulizado = tipoAtendimentoService.atualizarTipoAtendimento(id, tipoAtendimento);
        return ResponseEntity.ok(tipoAtendimentoAtulizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarTipoAtendimento(@PathVariable UUID id){
        tipoAtendimentoService.deletarTipoAtendimento(id);
        return ResponseEntity.noContent().build();
    }   
}
