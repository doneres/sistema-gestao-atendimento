package br.com.djrx.atendimento.modules.ficha;

import java.time.LocalDateTime;
import java.util.UUID;

import br.com.djrx.atendimento.modules.pessoas.Funcionario.Funcionario;
import br.com.djrx.atendimento.modules.tipoAtendimento.TipoAtendimento;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "fichas")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Ficha {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tipo_servico_id", nullable = false)
    private TipoAtendimento tipoServicoPrestado;

    @Column(name = "data_hora_entrada_fila")
    private LocalDateTime dataHoraEntradaFila;

    @Column(name = "data_hora_inicio_atendimento")
    private LocalDateTime dataHoraInicioAtendimento;

    @Column(name = "data_hora_fim_atendimento")
    private LocalDateTime dataHoraFimAtendimento;

    @Column(name = "status")
    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "funcionario_id")
    private Funcionario funcionario;
}