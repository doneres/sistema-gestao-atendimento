# ⚡ Início Rápido - Postman

## 🚀 Como Importar a Collection

### **Passo 1: Abrir o Postman**

- Se não tiver, baixe em: https://www.postman.com/downloads/

### **Passo 2: Importar Collection**

1. Abra o Postman
2. Clique em **"Import"** (canto superior esquerdo)
3. Arraste o arquivo `Sistema-Gestao-Atendimento.postman_collection.json`
4. Clique em **"Import"**

✅ Pronto! A collection aparecerá no menu lateral esquerdo.

---

## 🎯 Primeiras Requisições

### **1. Verificar se o Backend está Rodando**

```
GET http://localhost:8080/api/funcionarios
```

**Como fazer:**

1. Navegue até: `Health Check` → `Verificar API`
2. Clique em **"Send"**

**Resultado esperado:**

- Status: `200 OK`
- Body: `[]` (lista vazia se não houver funcionários)

---

### **2. Criar Primeiro Funcionário**

```
POST http://localhost:8080/api/funcionarios
```

**Como fazer:**

1. Vá em: `Funcionários` → `Criar Funcionário`
2. Clique em **"Send"**

**Já está pré-configurado com este JSON:**

```json
{
  "nome": "Maria Santos",
  "matricula": 1002,
  "funcao": "Atendente",
  "telefone": "11998765432",
  "email": "maria.santos@example.com",
  "dataNascimento": "1990-05-15",
  "username": "maria.santos",
  "password": "senha123"
}
```

**Resultado esperado:**

- Status: `201 Created` ou `200 OK`
- Body: Retorna o funcionário criado com ID

---

### **3. Listar Funcionários**

```
GET http://localhost:8080/api/funcionarios
```

**Como fazer:**

1. Vá em: `Funcionários` → `Listar Todos os Funcionários`
2. Clique em **"Send"**

**Resultado esperado:**

- Lista com o funcionário que você acabou de criar

---

## 📝 Testando o Fluxo Completo

### **Cenário: Criar e Atender uma Ficha**

Execute na ordem:

#### **1. Criar Tipo de Atendimento**

```
Tipos de Atendimento → Criar Tipo de Atendimento
```

#### **2. Criar Cliente**

```
Clientes → Criar Cliente
```

#### **3. Criar Funcionário** (se ainda não criou)

```
Funcionários → Criar Funcionário
```

#### **4. Criar Ficha**

```
Fichas de Atendimento → Criar Ficha
```

⚠️ **Importante:** Você precisará copiar os IDs das respostas anteriores e colar na requisição de criar ficha:

- `clienteId`
- `tipoAtendimentoId`

#### **5. Ver Estimativa de Espera**

```
Fichas de Atendimento → Estimativa de Espera
```

#### **6. Atualizar Status da Ficha**

```
Fichas de Atendimento → Atualizar Ficha
```

---

## 🔧 Configuração de Variáveis (Opcional mas Recomendado)

### **Criar Environment:**

1. Clique em **"Environments"** (menu lateral)
2. Clique em **"+"** para criar novo environment
3. Nomeie como **"Local"**
4. Adicione as variáveis:

| Variable            | Initial Value           | Current Value           |
| ------------------- | ----------------------- | ----------------------- |
| `baseUrl`           | `http://localhost:8080` | `http://localhost:8080` |
| `funcionarioId`     | (vazio)                 | (vazio)                 |
| `clienteId`         | (vazio)                 | (vazio)                 |
| `tipoAtendimentoId` | (vazio)                 | (vazio)                 |
| `fichaId`           | (vazio)                 | (vazio)                 |

5. Clique em **"Save"**
6. Selecione o environment **"Local"** no dropdown (canto superior direito)

**Benefício:** Os IDs serão salvos automaticamente após criar recursos!

---

## 💡 Dicas Úteis

### **Ver Response Bonito**

- Após enviar requisição, clique em **"Pretty"** na área de resposta

### **Salvar Requisição Customizada**

1. Modifique uma requisição
2. Clique em **"Save As"**
3. Dê um nome descritivo

### **Duplicar Requisição**

- Clique nos 3 pontinhos ao lado da requisição
- Selecione **"Duplicate"**

### **Ver Histórico**

- Menu lateral → **"History"**
- Veja todas as requisições já feitas

### **Organizar em Pastas**

- Arraste requisições entre pastas
- Crie novas pastas com botão direito na collection

---

## 🐛 Troubleshooting

### ❌ Erro: "Could not get any response"

**Problema:** Backend não está rodando

**Solução:**

```powershell
cd c:\Users\USER\source\repos\sistema-gestao-atendimento\backend
.\mvnw.cmd spring-boot:run
```

---

### ❌ Erro: "404 Not Found"

**Problema:** URL incorreta

**Solução:**

- Verifique se a URL está: `http://localhost:8080/api/...`
- Confirme que a rota existe no backend

---

### ❌ Erro: "500 Internal Server Error"

**Problema:** Erro no backend (dados inválidos, banco, etc.)

**Solução:**

1. Olhe os logs do terminal onde o backend está rodando
2. Verifique se os campos obrigatórios estão preenchidos
3. Confirme se IDs referenciados existem

---

### ❌ Response vazia ou `[]`

**Não é erro!** Significa que não há dados cadastrados ainda.

**Solução:**

- Use as requisições de POST para criar dados primeiro

---

## 📊 Atalhos do Postman

| Atalho         | Ação                     |
| -------------- | ------------------------ |
| `Ctrl + Enter` | Enviar requisição        |
| `Ctrl + S`     | Salvar requisição        |
| `Ctrl + K`     | Buscar requisição        |
| `Ctrl + /`     | Mostrar/esconder sidebar |

---

## 🎯 Próximos Passos

1. ✅ Importe a collection
2. ✅ Teste a requisição de Health Check
3. ✅ Crie seu primeiro funcionário
4. ✅ Teste o fluxo completo
5. 📚 Leia o `GUIA-POSTMAN.md` para detalhes avançados

---

**Precisa de ajuda? Só perguntar! 🚀**
