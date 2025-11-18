package br.com.djrx.atendimento.modules.ficha;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FichaService {

    @Autowired
    private FichaRepository fichaRepository;

    public List<Ficha> listarTodosAsFichas(){
        return fichaRepository.findAll();
    }

    public Ficha buscarUmaFichaPorID(UUID id){
        return fichaRepository.findById(id).orElseThrow(() -> new RuntimeException("Ficha não encontrado com ID: " + id));
    }

    public Ficha criarFicha(Ficha ficha){
        return fichaRepository.save(ficha);
    }

    public Ficha atualizarUmaFicha(UUID id, Ficha ficha){
        Ficha fichaAserAtualizada = buscarUmaFichaPorID(id);

        fichaAserAtualizada.setTipoServicoPrestado(ficha.getTipoServicoPrestado());

        return fichaRepository.save(fichaAserAtualizada);
    }

    public void deletarFichaPorId(UUID id){
        fichaRepository.deleteById(id);
    }
}
