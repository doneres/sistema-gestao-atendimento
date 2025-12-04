package br.com.djrx.atendimento.modules.tipoAtendimento;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TipoAtendimentoService {

    @Autowired
    private TipoAtendimentoRepository tipoAtendimentoRepository;

    public List<TipoAtendimento> listarTodosTiposAtendimento(){
        return tipoAtendimentoRepository.findAll();
    }

    public TipoAtendimento buscarAtendimentoPorId(UUID id){
        return tipoAtendimentoRepository.findById(id).orElseThrow(() -> new RuntimeException("Tipo de Atendimento não encontrado com ID: " + id));
    }

    public TipoAtendimento cadastrarTipoAtendimento(TipoAtendimento tipoAtendimento){
        return tipoAtendimentoRepository.save(tipoAtendimento);
    }

    public TipoAtendimento atualizarTipoAtendimento(UUID id, TipoAtendimento tipoAtendimento){
        TipoAtendimento novoTipoAtendimento = buscarAtendimentoPorId(id);

        novoTipoAtendimento.setIniciaisServico(tipoAtendimento.getIniciaisServico());
        novoTipoAtendimento.setDescricao(tipoAtendimento.getDescricao());
        novoTipoAtendimento.setNomeServico(tipoAtendimento.getNomeServico());

        return tipoAtendimentoRepository.save(novoTipoAtendimento);
    }

    public void deletarTipoAtendimento(UUID id){
        tipoAtendimentoRepository.deleteById(id);
    }
}
