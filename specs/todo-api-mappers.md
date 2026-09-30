# Funcionalidade: Integração de API e mapeadores de To-Do

## Problema

O formato externo da API usa convenções e códigos diferentes dos tipos limpos usados pelo domínio e pela interface.

## Objetivos

- Definir um DTO de API em snake_case e mapear seus dados para a entidade `Todo`.
- Converter dados de domínio para o payload esperado pelo backend.
- Isolar a simulação do serviço de API e os mapeadores do formulário por responsabilidade.
- Integrar a criação de tarefas à store sem expor DTOs à interface.

## Fora do escopo

- Comunicação com um backend remoto real, autenticação e tratamento de erros HTTP.
- Edição de tarefas pela interface.

## Cenários de uso

- Como pessoa desenvolvedora, quero converter respostas e payloads sem propagar snake_case para o domínio.
- Como pessoa usuária, quero que o formulário gere dados de domínio limpos e continue criando tarefas pela store.

## Critérios de aceitação

- `TodoApiDTO` representa `task_id`, `task_title`, `category_code`, `is_completed` e `created_at_utc`.
- `toDomain` converte DTOs para `Todo`, incluindo códigos de categoria e `created_at_utc` para `Date`.
- `toPayload` converte título, categoria e conclusão para os campos snake_case correspondentes.
- `TodoAPI.fetchTodos` e `TodoAPI.createTodo` recebem e retornam apenas tipos de domínio.
- A implementação simulada da API usa DTOs internamente e não exige um servidor externo.
- `toInput` seleciona título e categoria de um `Todo`; `toOutput` gera os campos de domínio do formulário com `completed: false`.
- O formulário usa `toOutput` antes de chamar seu callback.
- Os testes cobrem os mapeamentos, o serviço e os utilitários do formulário, sem regressões na store ou no fluxo integrado.

## Restrições e decisões

- Os códigos externos são `PERS`, `WORK` e `STUDY`; os valores do domínio continuam `pessoal`, `trabalho` e `estudos`.
- O serviço usa um adaptador simulado em memória até existir um backend configurado.
- A store aguarda `TodoAPI.createTodo` e persiste o `Todo` retornado.

## Plano de implementação

- [x] Criar contratos DTO, mapeadores e serviço de API simulado.
- [x] Criar utilitários de entrada e saída do formulário.
- [x] Integrar o formulário e a store à camada de API.
- [x] Adicionar testes unitários e validar os fluxos existentes.

## Verificação

- [x] Executar testes de mapeadores, serviço, utilitários, store e integração.
- [x] Executar o build de produção.
