# 🚀 Guia Completo - Requisições no Postman

Este guia contém todas as requisições da API para testar no Postman.

---

## 📌 Configuração Inicial

### **Base URL**

```
http://localhost:8080
```

### **Criar Environment no Postman (Opcional)**

1. Clique em "Environments" no Postman
2. Crie um novo environment chamado "Local"
3. Adicione as variáveis:
   - `baseUrl`: `http://localhost:8080`
   - `token`: (deixe vazio, será preenchido automaticamente)

Assim você pode usar `{{baseUrl}}` nas requisições.

---

## 🔐 AUTENTICAÇÃO (se implementada)

Se você tiver autenticação JWT configurada, precisa:

### 1. Registrar/Login

```http
POST {{baseUrl}}/auth/register
Content-Type: application/json

{
  "nome": "Teste User",
  "username": "teste",
  "email": "teste@example.com",
  "password": "senha123",
  "tipo": "ADMIN"
}
```

### 2. Copiar o Token da Resposta

### 3. Configurar Headers nas Próximas Requisições

```
Authorization: Bearer SEU_TOKEN_AQUI
```

---

## 👥 FUNCIONÁRIOS

### **1. Listar Todos os Funcionários**

```http
GET http://localhost:8080/api/funcionarios
```

**Resposta Esperada:**

```json
[
  {
    "id": "uuid-123",
    "nome": "João Silva",
    "matricula": 1001,
    "funcao": "Atendente",
    "telefone": "11987654321",
    "email": "joao@example.com"
  }
]
```

---

### **2. Buscar Funcionário por ID**

```http
GET http://localhost:8080/api/funcionarios/{id}
```

**Exemplo:**

```http
GET http://localhost:8080/api/funcionarios/123e4567-e89b-12d3-a456-426614174000
```

---

### **3. Criar Novo Funcionário**

```http
POST http://localhost:8080/api/funcionarios
Content-Type: application/json

{
  "nome": "Maria Santos",
  "matricula": 1002,
  "funcao": "Gerente",
  "telefone": "11998765432",
  "email": "maria@example.com",
  "dataNascimento": "1990-05-15",
  "username": "maria.santos",
  "password": "senha123"
}
```

---

### **4. Atualizar Funcionário**

```http
PUT http://localhost:8080/api/funcionarios/{id}
Content-Type: application/json

{
  "nome": "Maria Santos Silva",
  "matricula": 1002,
  "funcao": "Gerente Senior",
  "telefone": "11998765432",
  "email": "maria.santos@example.com"
}
```

---

### **5. Deletar Funcionário**

```http
DELETE http://localhost:8080/api/funcionarios/{id}
```

---

## 📋 TIPOS DE ATENDIMENTO

### **1. Listar Todos os Tipos**

```http
GET http://localhost:8080/api/tipos-de-atendimentos
```

**Resposta Esperada:**

```json
[
  {
    "id": "uuid-456",
    "nome": "Consulta Geral",
    "descricao": "Atendimento de rotina",
    "tempoMedioMinutos": 30,
    "ativo": true
  }
]
```

---

### **2. Buscar Tipo por ID**

```http
GET http://localhost:8080/api/tipos-de-atendimentos/{id}
```

---

### **3. Criar Tipo de Atendimento**

```http
POST http://localhost:8080/api/tipos-de-atendimentos
Content-Type: application/json

{
  "nome": "Consulta Especializada",
  "descricao": "Atendimento com especialista",
  "tempoMedioMinutos": 45,
  "ativo": true
}
```

---

### **4. Atualizar Tipo de Atendimento**

```http
PUT http://localhost:8080/api/tipos-de-atendimentos/{id}
Content-Type: application/json

{
  "nome": "Consulta Especializada Premium",
  "descricao": "Atendimento VIP",
  "tempoMedioMinutos": 60,
  "ativo": true
}
```

---

### **5. Deletar Tipo de Atendimento**

```http
DELETE http://localhost:8080/api/tipos-de-atendimentos/{id}
```

---

## 🎫 FICHAS DE ATENDIMENTO

### **1. Listar Todas as Fichas**

```http
GET http://localhost:8080/api/fichas
```

**Resposta Esperada:**

```json
[
  {
    "id": "uuid-789",
    "numeroFicha": "001",
    "clienteId": "uuid-cliente",
    "tipoAtendimentoId": "uuid-tipo",
    "status": "AGUARDANDO",
    "prioridade": "NORMAL",
    "dataHoraCriacao": "2025-12-09T10:30:00"
  }
]
```

---

### **2. Buscar Ficha por ID**

```http
GET http://localhost:8080/api/fichas/{id}
```

---

### **3. Criar Nova Ficha**

```http
POST http://localhost:8080/api/fichas
Content-Type: application/json

{
  "clienteId": "uuid-do-cliente",
  "tipoAtendimentoId": "uuid-do-tipo-atendimento",
  "prioridade": "NORMAL",
  "observacoes": "Cliente preferencial"
}
```

**Valores possíveis para `prioridade`:**

- `BAIXA`
- `NORMAL`
- `ALTA`
- `URGENTE`

**Valores possíveis para `status` (gerado automaticamente):**

- `AGUARDANDO`
- `EM_ATENDIMENTO`
- `CONCLUIDO`
- `CANCELADO`

---

### **4. Atualizar Ficha**

```http
PUT http://localhost:8080/api/fichas/{id}
Content-Type: application/json

{
  "status": "EM_ATENDIMENTO",
  "funcionarioId": "uuid-do-funcionario",
  "observacoes": "Atendimento iniciado"
}
```

---

### **5. Deletar Ficha**

```http
DELETE http://localhost:8080/api/fichas/{id}
```

---

### **6. Obter Estimativa de Espera**

```http
GET http://localhost:8080/api/fichas/{id}/estimativa-espera
```

**Resposta Esperada:**

```json
{
  "fichaId": "uuid-789",
  "posicaoNaFila": 5,
  "tempoEstimadoMinutos": 150,
  "mensagem": "Tempo estimado de espera: 2h 30min"
}
```

---

## 👤 CLIENTES

### **1. Listar Todos os Clientes**

```http
GET http://localhost:8080/api/clientes
```

---

### **2. Buscar Cliente por ID**

```http
GET http://localhost:8080/api/clientes/{id}
```

---

### **3. Criar Novo Cliente**

```http
POST http://localhost:8080/api/clientes
Content-Type: application/json

{
  "nome": "Pedro Oliveira",
  "cpf": "12345678901",
  "telefone": "11987654321",
  "email": "pedro@example.com",
  "dataNascimento": "1995-03-20",
  "endereco": {
    "rua": "Rua das Flores",
    "numero": "123",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01234-567"
  }
}
```

---

### **4. Atualizar Cliente**

```http
PUT http://localhost:8080/api/clientes/{id}
Content-Type: application/json

{
  "nome": "Pedro Oliveira Santos",
  "telefone": "11998765432",
  "email": "pedro.oliveira@example.com"
}
```

---

### **5. Deletar Cliente**

```http
DELETE http://localhost:8080/api/clientes/{id}
```

---

## 🧪 TESTANDO NO POSTMAN - Passo a Passo

### **Método 1: Requisição Manual**

1. Abra o Postman
2. Clique em **"New"** → **"HTTP Request"**
3. Selecione o método (GET, POST, PUT, DELETE)
4. Cole a URL (ex: `http://localhost:8080/api/funcionarios`)
5. Para POST/PUT:
   - Vá na aba **"Body"**
   - Selecione **"raw"**
   - Escolha **"JSON"** no dropdown
   - Cole o JSON de exemplo
6. Clique em **"Send"**

---

### **Método 2: Importar Coleção (Recomendado)**

#### **Criar arquivo JSON da coleção:**

Crie um arquivo `postman-collection.json`:

```json
{
  "info": {
    "name": "Sistema Gestão Atendimento",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Funcionários",
      "item": [
        {
          "name": "Listar Funcionários",
          "request": {
            "method": "GET",
            "url": "http://localhost:8080/api/funcionarios"
          }
        },
        {
          "name": "Criar Funcionário",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"nome\": \"Teste\",\n  \"matricula\": 1001,\n  \"funcao\": \"Atendente\",\n  \"telefone\": \"11987654321\",\n  \"email\": \"teste@example.com\"\n}"
            },
            "url": "http://localhost:8080/api/funcionarios"
          }
        }
      ]
    },
    {
      "name": "Fichas",
      "item": [
        {
          "name": "Listar Fichas",
          "request": {
            "method": "GET",
            "url": "http://localhost:8080/api/fichas"
          }
        }
      ]
    }
  ]
}
```

#### **Importar no Postman:**

1. Abra o Postman
2. Clique em **"Import"**
3. Arraste o arquivo `postman-collection.json`
4. A coleção aparecerá no menu lateral

---

## 🎯 Exemplos de Fluxo Completo

### **Cenário 1: Criar e Atender uma Ficha**

```http
# 1. Criar um tipo de atendimento
POST http://localhost:8080/api/tipos-de-atendimentos
Content-Type: application/json

{
  "nome": "Consulta Médica",
  "descricao": "Consulta geral",
  "tempoMedioMinutos": 30,
  "ativo": true
}

# Copiar o ID retornado (ex: tipo-id-123)

# 2. Criar um cliente
POST http://localhost:8080/api/clientes
Content-Type: application/json

{
  "nome": "João da Silva",
  "cpf": "12345678901",
  "telefone": "11987654321",
  "email": "joao@test.com"
}

# Copiar o ID retornado (ex: cliente-id-456)

# 3. Criar uma ficha
POST http://localhost:8080/api/fichas
Content-Type: application/json

{
  "clienteId": "cliente-id-456",
  "tipoAtendimentoId": "tipo-id-123",
  "prioridade": "NORMAL"
}

# Copiar o ID retornado (ex: ficha-id-789)

# 4. Ver estimativa de espera
GET http://localhost:8080/api/fichas/ficha-id-789/estimativa-espera

# 5. Iniciar atendimento
PUT http://localhost:8080/api/fichas/ficha-id-789
Content-Type: application/json

{
  "status": "EM_ATENDIMENTO",
  "funcionarioId": "funcionario-id-111"
}

# 6. Finalizar atendimento
PUT http://localhost:8080/api/fichas/ficha-id-789
Content-Type: application/json

{
  "status": "CONCLUIDO"
}
```

---

## 🔍 Verificando se o Backend está Rodando

### **Teste Simples:**

```http
GET http://localhost:8080/api/funcionarios
```

**Se retornar `200 OK` ou `[]`**: ✅ Backend funcionando  
**Se retornar erro de conexão**: ❌ Backend não está rodando

---

## ⚠️ Troubleshooting

### **Erro: "Connection refused"**

- Certifique-se que o backend está rodando
- Verifique se está na porta 8080
- Rode: `.\mvnw.cmd spring-boot:run` na pasta backend

### **Erro: 404 Not Found**

- Verifique a URL
- Verifique se a rota existe no controller
- Cheque os logs do backend

### **Erro: 500 Internal Server Error**

- Verifique os logs do backend
- Pode ser erro de validação ou banco de dados

### **Erro: CORS**

- Se estiver testando do navegador, pode ser CORS
- No Postman não há problema de CORS

---

## 📦 Collection Pronta para Download

Vou criar uma collection completa que você pode importar diretamente no Postman!

Salve o conteúdo abaixo como `Sistema-Gestao-Atendimento.postman_collection.json` e importe no Postman.

---

## 💡 Dicas Finais

1. **Use Collections**: Organize suas requisições em pastas
2. **Use Environments**: Crie variáveis para URLs e tokens
3. **Salve Respostas**: Use "Save Response" para referência
4. **Use Tests**: Adicione scripts para validação automática
5. **Pre-request Scripts**: Automatize geração de dados

**Exemplo de Test Script:**

```javascript
// Salvar token automaticamente
pm.test("Status 200", function () {
  pm.response.to.have.status(200);
});

// Salvar ID da resposta
const response = pm.response.json();
pm.environment.set("lastId", response.id);
```

---

**Precisa de ajuda com alguma requisição específica? Me avise! 🚀**
