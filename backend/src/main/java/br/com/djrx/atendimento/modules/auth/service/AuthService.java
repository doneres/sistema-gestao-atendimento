package br.com.djrx.atendimento.modules.auth.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.djrx.atendimento.modules.auth.dto.LoginDto;
import br.com.djrx.atendimento.modules.auth.dto.LoginResponse;
import br.com.djrx.atendimento.modules.auth.dto.RegisterRequest;
import br.com.djrx.atendimento.modules.auth.dto.UpdateUserRequest;
import br.com.djrx.atendimento.modules.pessoas.Cliente.Cliente;
import br.com.djrx.atendimento.modules.pessoas.Cliente.ClienteRepository;
import br.com.djrx.atendimento.modules.pessoas.Funcionario.Funcionario;
import br.com.djrx.atendimento.modules.pessoas.Funcionario.FuncionarioRepository;
import br.com.djrx.atendimento.modules.pessoas.Pessoa;
import br.com.djrx.atendimento.modules.pessoas.TipoPessoa;

/**
 * Serviço de autenticação
 * Gerencia registro, login, logout e operações de usuários
 */
@Service
public class AuthService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordHasher passwordHasher;

    /**
     * Registra um novo usuário no sistema
     * Cria Cliente ou Funcionário baseado no tipo
     */
    @Transactional
    public LoginResponse register(RegisterRequest request) {
        // Verifica se o username já existe
        if (usernameExists(request.getUsername())) {
            throw new RuntimeException("Username já está em uso");
        }

        // Gera salt e hash da senha
        String salt = passwordHasher.generateSalt();
        String hashedPassword = passwordHasher.hashPassword(request.getPassword(), salt);

        Pessoa pessoa;
        UUID userId;

        // Cria Cliente ou Funcionário baseado no tipo
        if (request.getTipo() == TipoPessoa.CLIENTE) {
            Cliente cliente = new Cliente();
            preencherDadosPessoa(cliente, request, hashedPassword, salt);
            cliente = clienteRepository.save(cliente);
            pessoa = cliente;
            userId = cliente.getId();
        } else {
            // FUNCIONARIO ou ADMIN
            Funcionario funcionario = new Funcionario();
            preencherDadosPessoa(funcionario, request, hashedPassword, salt);
            funcionario.setMatricula(request.getMatricula());
            funcionario.setFuncao(request.getFuncao());
            funcionario = funcionarioRepository.save(funcionario);
            pessoa = funcionario;
            userId = funcionario.getId();
        }

        // Gera token JWT
        String token = jwtService.generateToken(userId, pessoa.getUsername(), pessoa.getTipo().toString());

        // Marca como logado
        pessoa.login(token);
        savePessoa(pessoa);

        return LoginResponse.builder()
                .token(token)
                .id(userId)
                .nome(pessoa.getNome())
                .username(pessoa.getUsername())
                .email(pessoa.getEmail())
                .tipo(pessoa.getTipo())
                .telefone(pessoa.getTelefone())
                .dataNascimento(pessoa.getDataNascimento())
                .message("Usuário registrado e autenticado com sucesso")
                .build();
    }

    /**
     * Realiza login do usuário
     */
    @Transactional
    public LoginResponse login(LoginDto loginDto) {
        // Busca usuário pelo username
        Pessoa pessoa = findByUsername(loginDto.getUsername())
                .orElseThrow(() -> new RuntimeException("Credenciais inválidas"));

        // Verifica senha
        if (!passwordHasher.verifyPassword(loginDto.getPassword(), pessoa.getSenha(), pessoa.getSalt())) {
            throw new RuntimeException("Credenciais inválidas");
        }

        // Gera novo token
        UUID userId = getIdFromPessoa(pessoa);
        String token = jwtService.generateToken(userId, pessoa.getUsername(), pessoa.getTipo().toString());

        // Marca como logado
        pessoa.login(token);
        savePessoa(pessoa);

        return LoginResponse.builder()
                .token(token)
                .id(userId)
                .nome(pessoa.getNome())
                .username(pessoa.getUsername())
                .email(pessoa.getEmail())
                .tipo(pessoa.getTipo())
                .telefone(pessoa.getTelefone())
                .dataNascimento(pessoa.getDataNascimento())
                .message("Login realizado com sucesso")
                .build();
    }

    /**
     * Realiza logout do usuário
     */
    @Transactional
    public String logout(String token) {
        try {
            String username = jwtService.extractUsername(token);
            Pessoa pessoa = findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

            pessoa.logout();
            savePessoa(pessoa);

            return "Logout realizado com sucesso";
        } catch (Exception e) {
            throw new RuntimeException("Erro ao realizar logout: " + e.getMessage());
        }
    }

    /**
     * Valida se o token está ativo
     * Verifica: token não expirado + usuário não fez logout + token no banco confere
     */
    public boolean validateToken(String token) {
        try {
            // Verifica se token está expirado
            if (!jwtService.isTokenValid(token)) {
                return false;
            }

            // Extrai username do token
            String username = jwtService.extractUsername(token);

            // Busca usuário
            Pessoa pessoa = findByUsername(username).orElse(null);
            if (pessoa == null) {
                return false;
            }

            // Verifica se o token armazenado é o mesmo
            if (!token.equals(pessoa.getToken())) {
                return false;
            }

            // Verifica se a sessão está ativa (não fez logout)
            return pessoa.isSessionActive();

        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Lista todos os usuários (Clientes e Funcionários)
     */
    public List<LoginResponse> getAllUsers() {
        List<LoginResponse> users = new ArrayList<>();

        // Adiciona clientes
        clienteRepository.findAll().forEach(cliente -> {
            users.add(buildLoginResponse(cliente, cliente.getId()));
        });

        // Adiciona funcionários
        funcionarioRepository.findAll().forEach(funcionario -> {
            users.add(buildLoginResponse(funcionario, funcionario.getId()));
        });

        return users;
    }

    /**
     * Busca usuário por ID
     */
    public Optional<LoginResponse> getUserById(UUID id, TipoPessoa tipo) {
        if (tipo == TipoPessoa.CLIENTE) {
            return clienteRepository.findById(id)
                    .map(cliente -> buildLoginResponse(cliente, cliente.getId()));
        } else {
            return funcionarioRepository.findById(id)
                    .map(funcionario -> buildLoginResponse(funcionario, funcionario.getId()));
        }
    }

    /**
     * Atualiza dados do usuário
     */
    @Transactional
    public LoginResponse updateUser(UUID id, TipoPessoa tipo, UpdateUserRequest request) {
        Pessoa pessoa;
        UUID userId;

        if (tipo == TipoPessoa.CLIENTE) {
            Cliente cliente = clienteRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
            atualizarDadosPessoa(cliente, request);
            cliente = clienteRepository.save(cliente);
            pessoa = cliente;
            userId = cliente.getId();
        } else {
            Funcionario funcionario = funcionarioRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));
            atualizarDadosPessoa(funcionario, request);
            if (request.getMatricula() != null) {
                funcionario.setMatricula(request.getMatricula());
            }
            if (request.getFuncao() != null) {
                funcionario.setFuncao(request.getFuncao());
            }
            funcionario = funcionarioRepository.save(funcionario);
            pessoa = funcionario;
            userId = funcionario.getId();
        }

        return buildLoginResponse(pessoa, userId);
    }

    /**
     * Deleta usuário
     */
    @Transactional
    public void deleteUser(UUID id, TipoPessoa tipo) {
        if (tipo == TipoPessoa.CLIENTE) {
            if (!clienteRepository.existsById(id)) {
                throw new RuntimeException("Cliente não encontrado");
            }
            clienteRepository.deleteById(id);
        } else {
            if (!funcionarioRepository.existsById(id)) {
                throw new RuntimeException("Funcionário não encontrado");
            }
            funcionarioRepository.deleteById(id);
        }
    }

    // ============ MÉTODOS AUXILIARES ============

    private void preencherDadosPessoa(Pessoa pessoa, RegisterRequest request, String hashedPassword, String salt) {
        pessoa.setNome(request.getNome());
        pessoa.setUsername(request.getUsername());
        pessoa.setEmail(request.getEmail());
        pessoa.setSenha(hashedPassword);
        pessoa.setSalt(salt);
        pessoa.setTelefone(request.getTelefone());
        pessoa.setDataNascimento(request.getDataNascimento());
        pessoa.setTipo(request.getTipo());
    }

    private void atualizarDadosPessoa(Pessoa pessoa, UpdateUserRequest request) {
        if (request.getNome() != null) {
            pessoa.setNome(request.getNome());
        }
        if (request.getEmail() != null) {
            pessoa.setEmail(request.getEmail());
        }
        if (request.getTelefone() != null) {
            pessoa.setTelefone(request.getTelefone());
        }
        if (request.getDataNascimento() != null) {
            pessoa.setDataNascimento(request.getDataNascimento());
        }
    }

    private Optional<Pessoa> findByUsername(String username) {
        Optional<Cliente> cliente = clienteRepository.findByUsername(username);
        if (cliente.isPresent()) {
            return Optional.of(cliente.get());
        }
        Optional<Funcionario> funcionario = funcionarioRepository.findByUsername(username);
        return funcionario.map(f -> f);
    }

    private boolean usernameExists(String username) {
        return clienteRepository.existsByUsername(username) || 
               funcionarioRepository.existsByUsername(username);
    }

    private void savePessoa(Pessoa pessoa) {
        if (pessoa instanceof Cliente) {
            clienteRepository.save((Cliente) pessoa);
        } else if (pessoa instanceof Funcionario) {
            funcionarioRepository.save((Funcionario) pessoa);
        }
    }

    private UUID getIdFromPessoa(Pessoa pessoa) {
        if (pessoa instanceof Cliente) {
            return ((Cliente) pessoa).getId();
        } else if (pessoa instanceof Funcionario) {
            return ((Funcionario) pessoa).getId();
        }
        throw new RuntimeException("Tipo de pessoa desconhecido");
    }

    private LoginResponse buildLoginResponse(Pessoa pessoa, UUID id) {
        return LoginResponse.builder()
                .id(id)
                .nome(pessoa.getNome())
                .username(pessoa.getUsername())
                .email(pessoa.getEmail())
                .tipo(pessoa.getTipo())
                .telefone(pessoa.getTelefone())
                .dataNascimento(pessoa.getDataNascimento())
                .build();
    }
}
