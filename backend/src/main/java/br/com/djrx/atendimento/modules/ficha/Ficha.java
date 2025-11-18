package br.com.djrx.atendimento.modules.ficha;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

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
    
    @Column(name = "data_hora_atendimento")
    @CreationTimestamp
    private LocalDateTime dataHoraAtendimento;
}