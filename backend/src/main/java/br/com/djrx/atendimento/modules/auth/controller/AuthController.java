package br.com.djrx.atendimento.modules.auth.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.djrx.atendimento.modules.auth.dto.LoginDto;
import br.com.djrx.atendimento.modules.auth.dto.LoginResponse;
import br.com.djrx.atendimento.modules.auth.dto.LogoutRequest;
import br.com.djrx.atendimento.modules.auth.dto.RegisterRequest;
import br.com.djrx.atendimento.modules.auth.dto.UpdateUserRequest;
import br.com.djrx.atendimento.modules.auth.dto.ValidateTokenRequest;
import br.com.djrx.atendimento.modules.auth.service.AuthService;
import br.com.djrx.atendimento.modules.pessoas.TipoPessoa;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

/**
 * Controller de autenticação
 * Gerencia endpoints de registro, login, logout e operações de usuários
 */
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
@Tag(name = "Autenticação", description = "Endpoints para autenticação e gerenciamento de usuários")
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * Registra um novo usuário (Cliente ou Funcionário)
     */
    @PostMapping("/register")
    @Operation(summary = "Registrar novo usuário", description = "Cria um novo Cliente ou Funcionário no sistema")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            LoginResponse response = authService.register(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    /**
     * Realiza login do usuário
     */
    @PostMapping("/login")
    @Operation(summary = "Login", description = "Autentica usuário e retorna token JWT")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto loginDto) {
        try {
            LoginResponse response = authService.login(loginDto);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

    /**
     * Realiza logout do usuário
     */
    @PostMapping("/logout")
    @Operation(summary = "Logout", description = "Invalida o token do usuário e registra logout")
    public ResponseEntity<?> logout(@Valid @RequestBody LogoutRequest request) {
        try {
            String message = authService.logout(request.getToken());
            Map<String, String> response = new HashMap<>();
            response.put("message", message);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    /**
     * Valida se o token está ativo
     */
    @PostMapping("/validate-token")
    @Operation(summary = "Validar token", description = "Verifica se o token JWT está válido e a sessão ativa")
    public ResponseEntity<?> validateToken(@Valid @RequestBody ValidateTokenRequest request) {
        try {
            boolean isValid = authService.validateToken(request.getToken());
            Map<String, Object> response = new HashMap<>();
            response.put("valid", isValid);
            response.put("message", isValid ? "Token válido" : "Token inválido ou expirado");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("valid", false);
            response.put("message", "Erro ao validar token");
            return ResponseEntity.ok(response);
        }
    }

    /**
     * Lista todos os usuários
     */
    @GetMapping("/users")
    @Operation(summary = "Listar usuários", description = "Retorna lista de todos os usuários (Clientes e Funcionários)")
    public ResponseEntity<List<LoginResponse>> getAllUsers() {
        try {
            List<LoginResponse> users = authService.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Busca usuário por ID
     */
    @GetMapping("/users/{id}")
    @Operation(summary = "Buscar usuário por ID", description = "Retorna dados de um usuário específico")
    public ResponseEntity<?> getUserById(
            @PathVariable UUID id,
            @RequestParam TipoPessoa tipo) {
        try {
            return authService.getUserById(id, tipo)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    /**
     * Atualiza dados do usuário
     */
    @PutMapping("/users/{id}")
    @Operation(summary = "Atualizar usuário", description = "Atualiza dados de um usuário existente")
    public ResponseEntity<?> updateUser(
            @PathVariable UUID id,
            @RequestParam TipoPessoa tipo,
            @Valid @RequestBody UpdateUserRequest request) {
        try {
            LoginResponse response = authService.updateUser(id, tipo, request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    /**
     * Deleta usuário
     */
    @DeleteMapping("/users/{id}")
    @Operation(summary = "Deletar usuário", description = "Remove um usuário do sistema")
    public ResponseEntity<?> deleteUser(
            @PathVariable UUID id,
            @RequestParam TipoPessoa tipo) {
        try {
            authService.deleteUser(id, tipo);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Usuário deletado com sucesso");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
}
