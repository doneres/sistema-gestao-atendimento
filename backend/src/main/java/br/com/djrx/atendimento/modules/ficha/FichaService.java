package br.com.djrx.atendimento.modules.ficha;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.djrx.atendimento.modules.pessoas.Funcionario.Funcionario;
import br.com.djrx.atendimento.modules.pessoas.Funcionario.FuncionarioRepository;
import br.com.djrx.atendimento.modules.tipoAtendimento.TipoAtendimento;
import br.com.djrx.atendimento.modules.tipoAtendimento.TipoAtendimentoRepository;
import br.com.djrx.atendimento.modules.ficha.dto.FichaResponseDTO;
import br.com.djrx.atendimento.modules.ficha.dto.FuncionarioResumoDTO;
import br.com.djrx.atendimento.modules.ficha.dto.TipoAtendimentoResumoDTO;

@Service
public class FichaService {

    @Autowired
    private FichaRepository fichaRepository;

    @Autowired
    private TipoAtendimentoRepository tipoAtendimentoRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    private static final String STATUS_DEFAULT = "AGUARDANDO";

    @Transactional(readOnly = true)
    public List<FichaResponseDTO> listarTodosAsFichas(){
        return fichaRepository.findAll()
                .stream()
                .map(this::mapearParaDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public FichaResponseDTO buscarUmaFichaPorID(UUID id){
        Ficha ficha = fichaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ficha não encontrada com ID: " + id));

        return mapearParaDTO(ficha);
    }

    @Transactional(readOnly = true)
    public int calcularPosicaoNaFila(Ficha ficha) {
        List<Ficha> fila = fichaRepository.findByStatusOrderByDataHoraEntradaFilaAsc("AGUARDANDO");

        for (int i = 0; i < fila.size(); i++) {
            if (fila.get(i).getId().equals(ficha.getId())) {
                return i + 1;
            }
        }
        return 0;
    }

    @Transactional
    public FichaResponseDTO criarFicha(Ficha ficha){
        validarCamposObrigatorios(ficha);

        TipoAtendimento tipoAtendimento = carregarTipoAtendimento(ficha);
        Funcionario funcionario = carregarFuncionario(ficha);

        if (ficha.getDataHoraEntradaFila() == null) {
            ficha.setDataHoraEntradaFila(LocalDateTime.now());
        }

        if (ficha.getStatus() == null || ficha.getStatus().isBlank()) {
            ficha.setStatus(STATUS_DEFAULT);
        }

        ficha.setTipoServicoPrestado(tipoAtendimento);
        ficha.setFuncionario(funcionario);

        Ficha fichaSalva = fichaRepository.save(ficha);
        return mapearParaDTO(fichaSalva);
    }

    @Transactional
    public FichaResponseDTO atualizarUmaFicha(UUID id, Ficha ficha){
        Ficha fichaAserAtualizada = fichaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ficha não encontrada com ID: " + id));
        validarCamposObrigatorios(ficha);

        TipoAtendimento tipoAtendimento = carregarTipoAtendimento(ficha);
        Funcionario funcionario = carregarFuncionario(ficha);

        fichaAserAtualizada.setTipoServicoPrestado(tipoAtendimento);
        fichaAserAtualizada.setFuncionario(funcionario);

        if (ficha.getDataHoraEntradaFila() != null) {
            fichaAserAtualizada.setDataHoraEntradaFila(ficha.getDataHoraEntradaFila());
        }

        if (ficha.getDataHoraInicioAtendimento() != null) {
            fichaAserAtualizada.setDataHoraInicioAtendimento(ficha.getDataHoraInicioAtendimento());
        }

        if (ficha.getDataHoraFimAtendimento() != null) {
            fichaAserAtualizada.setDataHoraFimAtendimento(ficha.getDataHoraFimAtendimento());
        }

        if (ficha.getStatus() != null && !ficha.getStatus().isBlank()) {
            fichaAserAtualizada.setStatus(ficha.getStatus());
        }

        Ficha fichaAtualizada = fichaRepository.save(fichaAserAtualizada);
        return mapearParaDTO(fichaAtualizada);
    }

    public void deletarFichaPorId(UUID id){
        fichaRepository.deleteById(id);
    }

    private void validarCamposObrigatorios(Ficha ficha) {
        Objects.requireNonNull(ficha, "Ficha é obrigatória");

        if (ficha.getTipoServicoPrestado() == null || ficha.getTipoServicoPrestado().getId() == null) {
            throw new IllegalArgumentException("Tipo de atendimento é obrigatório e deve conter um ID válido");
        }
    }

    private TipoAtendimento carregarTipoAtendimento(Ficha ficha) {
        UUID tipoId = ficha.getTipoServicoPrestado().getId();
        return tipoAtendimentoRepository.findById(tipoId)
                .orElseThrow(() -> new IllegalArgumentException("Tipo de atendimento não encontrado para o ID: " + tipoId));
    }

    private Funcionario carregarFuncionario(Ficha ficha) {
        if (ficha.getFuncionario() == null) {
            return null;
        }

        UUID funcionarioId = ficha.getFuncionario().getId();
        if (funcionarioId == null) {
            throw new IllegalArgumentException("Funcionario informado precisa conter um ID válido");
        }

        return funcionarioRepository.findById(funcionarioId)
                .orElseThrow(() -> new IllegalArgumentException("Funcionario não encontrado para o ID: " + funcionarioId));
    }

    private FichaResponseDTO mapearParaDTO(Ficha ficha) {
        TipoAtendimento tipo = ficha.getTipoServicoPrestado();
        TipoAtendimentoResumoDTO tipoDTO = null;
        if (tipo != null) {
            tipoDTO = new TipoAtendimentoResumoDTO(
                    tipo.getId(),
                    tipo.getNomeServico(),
                    tipo.getDescricao(),
                    tipo.getIniciaisServico());
        }

        Funcionario funcionario = ficha.getFuncionario();
        FuncionarioResumoDTO funcionarioDTO = null;
        if (funcionario != null) {
            funcionarioDTO = new FuncionarioResumoDTO(
                    funcionario.getId(),
                    funcionario.getNome(),
                    funcionario.getMatricula(),
                    funcionario.getFuncao());
        }

        return new FichaResponseDTO(
                ficha.getId(),
                ficha.getStatus(),
                ficha.getDataHoraEntradaFila(),
                ficha.getDataHoraInicioAtendimento(),
                ficha.getDataHoraFimAtendimento(),
                tipoDTO,
                funcionarioDTO);
    }

        @Transactional(readOnly = true)
    public Ficha buscarFichaEntityPorID(UUID id) {
        return fichaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ficha não encontrada com ID: " + id));
    }

    @Transactional(readOnly = true)
    public int contarFichasAguardando() {
        return fichaRepository.countByStatus(STATUS_DEFAULT); // "AGUARDANDO"
    }

    @Transactional
    public FichaResponseDTO atualizarParcial(UUID id, Map<String, Object> updates) {
        Ficha ficha = fichaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ficha não encontrada"));

        if (updates.containsKey("status")) {
            ficha.setStatus((String) updates.get("status"));

            if ("EM_ANDAMENTO".equals(ficha.getStatus())) {
                ficha.setDataHoraInicioAtendimento(LocalDateTime.now());
            }
            if ("FINALIZADO".equals(ficha.getStatus())) {
                ficha.setDataHoraFimAtendimento(LocalDateTime.now());
            }
        }

    if (updates.containsKey("funcionario")) {
        Map<String, Object> func = (Map<String, Object>) updates.get("funcionario");
        if (func != null && func.get("id") != null) {
            UUID funcionarioId = UUID.fromString(func.get("id").toString());
            Funcionario funcionario = funcionarioRepository.findById(funcionarioId)
                    .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));
            ficha.setFuncionario(funcionario);
        } else {
            ficha.setFuncionario(null);
        }
    }

    Ficha salva = fichaRepository.save(ficha);
    return mapearParaDTO(salva);
}


}
