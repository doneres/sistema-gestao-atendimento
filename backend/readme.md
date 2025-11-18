# Proposta de Projeto: SGA - Sistema de Gerenciamento de Atendimento
## 1. Nome do Projeto
SGA - Sistema de Gerenciamento de Atendimento

## 2. Integrantes
Douglas Neres Cavalcanti - Matrícula: 20242012000180 - Email: 20242012000180@pucgo.edu.br

João Paulo Alves Farias - Matrícula: 20242012000520 - Email: 20242012000520@pucgo.edu.br

Rodrigo Calaça Caetano - Matrícula: 20242012000300 - Email: 20242012000300@pucgo.edu.br

## 3. Problema a Ser Resolvido
Em inúmeros estabelecimentos de atendimento ao público—sejam eles clínicas, repartições públicas, bancos ou grandes varejistas—a gestão de filas e o acompanhamento da jornada do cliente são processos frequentemente marcados pela ineficiência. Clientes enfrentam longas e desorganizadas filas de espera, sem qualquer visibilidade sobre o tempo estimado para seu atendimento, gerando frustração, ansiedade e uma percepção negativa sobre a qualidade do serviço.

Do ponto de vista dos gestores, a falta de dados estruturados sobre o fluxo de atendimento impede a identificação de gargalos, a avaliação de performance dos atendentes e a tomada de decisões estratégicas para otimizar a operação. A ausência de um canal de feedback imediato e digital também dificulta a medição da satisfação do cliente em tempo real.

O SGA visa solucionar diretamente esses problemas, substituindo o modelo de espera passivo e desinformado por um sistema interativo, transparente e rico em dados, que beneficia tanto o cliente quanto a organização.

## 4. Descrição da Aplicação
### 4.1. Conceito
O SGA é uma plataforma web moderna projetada para digitalizar e otimizar todo o ciclo de atendimento ao cliente. A aplicação permitirá que os usuários entrem em uma fila de atendimento de forma virtual ou por totem, acompanhem sua posição em tempo real através de seus smartphones ou painéis, e forneçam feedback imediato após a conclusão do serviço.

Para os gestores e operadores, o sistema oferecerá um dashboard centralizado para o gerenciamento ativo das filas, chamada de senhas, e acesso a relatórios detalhados e insights gerados por Inteligência Artificial para aprimorar a qualidade e a eficiência do atendimento.

### 4.2. Funcionalidades Principais
Módulo do Cliente:

Entrada na fila via QR Code ou totem.

Acompanhamento da posição na fila e tempo estimado de espera em tempo real.

Notificações (push/sonora) quando sua vez estiver próxima.

Sistema de avaliação do atendimento recebido.

Módulo do Operador:

Interface para chamar o próximo cliente da fila.

Visualização das filas por tipo de serviço.

Registro de início e fim de atendimento.

Módulo do Gestor:

Dashboard com visão geral da operação em tempo real (número de pessoas em espera, tempo médio, etc.).

Geração de relatórios de performance por atendente e por serviço.

Visualização de avaliações e acesso a insights gerados por IA sobre a satisfação do cliente.

## 5. Tecnologias a Serem Utilizadas
A arquitetura do projeto será baseada em tecnologias modernas para garantir escalabilidade, segurança e uma excelente experiência de usuário.

Frontend: 

Backend: Java com Spring Boot.

Banco de Dados: PostgreSQL (Relacional) ou H2

Inteligência Artificial: Python com bibliotecas como Scikit-learn, Pandas, Metaplotlib, **ADICIONAR MAIS INFORMAÇÕES**

Infraestrutura e Deploy: Docker, GitLab CI/CD e Azure

## 6. Escopo de Aplicação
### 6.1. Estrutura de Dados (ED)
As Estruturas de Dados serão a espinha dorsal do sistema para garantir a eficiência no gerenciamento das informações.

Filas (Queues): Será a estrutura central para gerenciar a ordem de chegada dos clientes, operando no princípio FIFO (First-In, First-Out). Implementaremos filas de prioridade para atendimentos preferenciais (idosos, gestantes), garantindo que sejam chamados antes dos demais.

Tabelas Hash (Hash Tables/Maps): Utilizadas para armazenamento e recuperação de dados em tempo O(1), como buscar informações de um cliente ou de um atendimento específico a partir de um ID de ticket, otimizando a performance do sistema.

Árvores (Trees): Poderão ser aplicadas para estruturar a hierarquia de serviços e departamentos. Por exemplo, uma árvore pode organizar os atendimentos em categorias de atendimento, facilitando a filtragem e a geração de relatórios segmentados.

### 6.2. Inteligência Artificial (IA)
A IA será aplicada para transformar dados brutos em inteligência acionável.

Análise de Sentimento: Um modelo de Processamento de Linguagem Natural (PLN) será treinado para analisar os comentários de feedback deixados pelos clientes. O sistema classificará automaticamente cada avaliação como positiva, negativa ou neutra, e identificará palavras-chave que indiquem problemas ou elogios recorrentes.

Previsão de Tempo de Espera: Utilizando modelos de regressão (Machine Learning), o sistema analisará dados históricos (dia da semana, horário, número de atendentes ativos, tipo de serviço) para prever o tempo de espera com maior acurácia, ajustando as estimativas dinamicamente.

Identificação de Anomalias: O sistema monitorará o fluxo de dados para identificar padrões incomuns, como um aumento súbito no tempo de atendimento de um operador específico ou uma queda abrupta nas avaliações de um setor, alertando os gestores para possíveis problemas.

### 6.3. Código Seguro
A segurança será um pilar fundamental do desenvolvimento, com práticas implementadas desde o início do projeto.

Autenticação e Autorização: Implementação de um sistema de controle de acesso baseado em papéis (RBAC - Role-Based Access Control). Operadores terão acesso apenas às funcionalidades de chamada, enquanto gestores terão acesso total aos dashboards e relatórios.

Prevenção contra Injeção de Dados (SQL/NoSQL Injection): Todas as queries ao banco de dados serão construídas utilizando ORMs (Object-Relational Mapping) ou bibliotecas que parametrizam as entradas, prevenindo que dados maliciosos inseridos pelo usuário sejam executados.

Validação e Sanitização de Entradas: Todas as informações recebidas do cliente (formulários, API endpoints) serão rigorosamente validadas no backend para garantir que estejam no formato esperado e sanitizadas para remover scripts maliciosos, prevenindo ataques de Cross-Site Scripting (XSS).

Segurança de Senhas: As senhas dos usuários (operadores e gestores) serão armazenadas no banco de dados utilizando algoritmos de hash robustos e salt, como o bcrypt, tornando impossível a recuperação da senha original.

Comunicação Criptografada: Toda a comunicação entre o cliente e o servidor será obrigatoriamente feita sob o protocolo HTTPS, garantindo a criptografia dos dados em trânsito.