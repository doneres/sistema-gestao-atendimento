package br.com.djrx.atendimento.modules.tipoAtendimento;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class TipoAtendimentoServiceTest {

    private TipoAtendimentoRepository repository;
    private TipoAtendimentoService service;

    @BeforeEach
    void setup() {
        repository = mock(TipoAtendimentoRepository.class);
        service = new TipoAtendimentoService();
        // injetar mock via reflexão (campo @Autowired)
        try {
            var f = TipoAtendimentoService.class.getDeclaredField("tipoAtendimentoRepository");
            f.setAccessible(true);
            f.set(service, repository);
        } catch (Exception e) {
            fail(e);
        }
    }

    @Test
    void buscarPorIdRetornaItemQuandoExiste() {
        UUID id = UUID.randomUUID();
        TipoAtendimento ta = new TipoAtendimento();
        ta.setId(id);
        ta.setNomeServico("Atendimento Geral");
        when(repository.findById(id)).thenReturn(Optional.of(ta));

        TipoAtendimento result = service.buscarAtendimentoPorId(id);
        assertEquals(id, result.getId());
        assertEquals("Atendimento Geral", result.getNomeServico());
    }

    @Test
    void buscarPorIdLancaExcecaoQuandoNaoExiste() {
        UUID id = UUID.randomUUID();
        when(repository.findById(id)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class, () -> service.buscarAtendimentoPorId(id));
        assertTrue(ex.getMessage().contains(id.toString()));
    }

    @Test
    void atualizarTipoAtendimentoAlteraCamposENaoTrocaId() {
        UUID id = UUID.randomUUID();
        TipoAtendimento existente = new TipoAtendimento();
        existente.setId(id);
        existente.setNomeServico("Antigo");
        existente.setDescricao("Desc antiga");
        existente.setIniciaisServico("AG");

        TipoAtendimento novo = new TipoAtendimento();
        novo.setNomeServico("Novo");
        novo.setDescricao("Desc nova");
        novo.setIniciaisServico("NV");

        when(repository.findById(id)).thenReturn(Optional.of(existente));
        when(repository.save(any(TipoAtendimento.class))).thenAnswer(inv -> inv.getArgument(0, TipoAtendimento.class));

        TipoAtendimento atualizado = service.atualizarTipoAtendimento(id, novo);
        assertEquals(id, atualizado.getId());
        assertEquals("Novo", atualizado.getNomeServico());
        assertEquals("Desc nova", atualizado.getDescricao());
        assertEquals("NV", atualizado.getIniciaisServico());
    }
}
