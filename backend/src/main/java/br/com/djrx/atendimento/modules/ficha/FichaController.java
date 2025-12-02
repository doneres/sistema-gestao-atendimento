package br.com.djrx.atendimento.modules.ficha;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PutMapping;

import br.com.djrx.atendimento.modules.ficha.dto.FichaResponseDTO;

@Controller
@RequestMapping("/api/fichas")
public class FichaController {

    @Autowired
    private FichaService fichaService;

    @GetMapping
    public ResponseEntity<List<FichaResponseDTO>> buscarTodasAsFichas(){
        List<FichaResponseDTO> listaDeFichas = fichaService.listarTodosAsFichas();
        
        return ResponseEntity.ok(listaDeFichas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FichaResponseDTO> buscarUmaFichaPorId(@PathVariable UUID id) {
        FichaResponseDTO fichaBuscada = fichaService.buscarUmaFichaPorID(id);
        
        return ResponseEntity.ok(fichaBuscada);
    }

    @PostMapping
    public ResponseEntity<FichaResponseDTO> criarUmaFicha(@Valid @RequestBody Ficha ficha){
        FichaResponseDTO novaFicha = fichaService.criarFicha(ficha);

        return ResponseEntity.status(HttpStatus.CREATED).body(novaFicha);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FichaResponseDTO> atualiarFicha(@PathVariable UUID id, @Valid @RequestBody Ficha ficha){

        FichaResponseDTO fichaAtualizada = fichaService.atualizarUmaFicha(id, ficha);
        return ResponseEntity.ok(fichaAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Ficha> deletarUmaFicha(@PathVariable UUID id){
        fichaService.deletarFichaPorId(id);
        return ResponseEntity.noContent().build();
    }
    
}
