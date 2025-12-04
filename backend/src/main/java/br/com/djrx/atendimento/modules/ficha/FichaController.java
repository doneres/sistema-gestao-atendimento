package br.com.djrx.atendimento.modules.ficha;

import java.util.List;
import java.util.Map;          // ✅ IMPORT DO MAP
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// Se quiser, pode trocar para @RestController, mas @Controller também funciona
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;

import br.com.djrx.atendimento.modules.ficha.dto.FichaResponseDTO;
import br.com.djrx.atendimento.modules.ficha.dto.EstimativaTempoResponseDTO;
import jakarta.validation.Valid;

@Controller
@RequestMapping("/api/fichas")
public class FichaController {

    @Autowired
    private FichaService fichaService;

    @Autowired
    private IaServiceClient iaServiceClient;

    @GetMapping
    public ResponseEntity<List<FichaResponseDTO>> buscarTodasAsFichas() {
        List<FichaResponseDTO> listaDeFichas = fichaService.listarTodosAsFichas();
        return ResponseEntity.ok(listaDeFichas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FichaResponseDTO> buscarUmaFichaPorId(@PathVariable UUID id) {
        FichaResponseDTO fichaBuscada = fichaService.buscarUmaFichaPorID(id);
        return ResponseEntity.ok(fichaBuscada);
    }

    @PostMapping
    public ResponseEntity<FichaResponseDTO> criarUmaFicha(@Valid @RequestBody Ficha ficha) {
        FichaResponseDTO novaFicha = fichaService.criarFicha(ficha);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaFicha);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FichaResponseDTO> atualiarFicha(
            @PathVariable UUID id,
            @Valid @RequestBody Ficha ficha
    ) {
        FichaResponseDTO fichaAtualizada = fichaService.atualizarUmaFicha(id, ficha);
        return ResponseEntity.ok(fichaAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Ficha> deletarUmaFicha(@PathVariable UUID id) {
        fichaService.deletarFichaPorId(id);
        return ResponseEntity.noContent().build();
    }

    // 🔹 ENDPOINT DE IA: estimativa de espera
        @GetMapping("/{id}/estimativa-espera")
    public ResponseEntity<EstimativaTempoResponseDTO> estimativaEspera(@PathVariable UUID id) {
        // ficha atual
        Ficha ficha = fichaService.buscarFichaEntityPorID(id);

        // tamanho total da fila (Aguardando)
        int filaAtual = fichaService.contarFichasAguardando();

        // posição dessa ficha dentro da fila (1ª, 2ª, 3ª...)
        int posicaoNaFila = fichaService.calcularPosicaoNaFila(ficha);

        // quantidade de atendentes ativos (pra demo, vamos usar 1 pra ficar bem visível)
        int atendentesAtivos = 1;

        // mapeia tipo de atendimento em um código numérico pro modelo
        int tipoAtendimentoCodigo = 0;
        if (ficha.getTipoServicoPrestado() != null &&
            ficha.getTipoServicoPrestado().getId() != null) {

            tipoAtendimentoCodigo = Math.abs(
                    ficha.getTipoServicoPrestado().getId().hashCode()
            ) % 10;
        }

        // chama a IA pra estimar o tempo médio de atendimento
        EstimativaTempoResponseDTO respostaIa = iaServiceClient.estimarTempoEspera(
                filaAtual,
                atendentesAtivos,
                tipoAtendimentoCodigo
        );

        // IA retorna um tempo médio por atendimento (em minutos)
        double tempoMedioPorAtendimento = respostaIa.getTempoEstimadoMinutos();

        // tempo de espera dessa ficha = média × posição / número de atendentes
        double tempoEstimadoFila = tempoMedioPorAtendimento * posicaoNaFila / atendentesAtivos;

        // sobrescreve o campo com o valor ajustado pela posição na fila
        respostaIa.setTempoEstimadoMinutos(tempoEstimadoFila);

        return ResponseEntity.ok(respostaIa);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<FichaResponseDTO> atualizarParcialmente(
            @PathVariable UUID id,
            @RequestBody Map<String, Object> updates
    ) {
        FichaResponseDTO atualizado = fichaService.atualizarParcial(id, updates);
        return ResponseEntity.ok(atualizado);
    }
}
