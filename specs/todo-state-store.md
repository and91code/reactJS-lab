# Funcionalidade: Store persistida de To-Do

## Problema

O estado mantido na raiz da aplicação não sobrevive a recarregamentos e dificulta o reaproveitamento das alterações de tarefas.

## Objetivos

- Centralizar o estado e as alterações de To-Do em uma store Zustand.
- Persistir as tarefas no `localStorage` do navegador e restaurá-las ao iniciar a aplicação.

## Fora do escopo

- Sincronização em nuvem, compartilhamento entre dispositivos e persistência no servidor.

## Cenários de uso

- Como pessoa usuária, quero que minhas tarefas permaneçam após recarregar o aplicativo.
- Como pessoa desenvolvedora, quero ações reutilizáveis na store para adicionar, alternar, remover e limpar tarefas concluídas.

## Critérios de aceitação

- A store expõe `todos`, `addTodo`, `toggleTodo`, `removeTodo` e `clearCompleted`.
- Novos `Todo` têm IDs únicos, o título e a categoria selecionados, `completed: false` e uma data de criação do tipo `Date`.
- Os `Todo` são persistidos com a chave `@todo-app:store-v1` e reidratados a partir do `localStorage`.
- Os valores reidratados de `createdAt` continuam sendo instâncias de `Date` do JavaScript.
- `App` lê os `Todo` e as ações por meio de seletores Zustand.
- `addTodo` aguarda `TodoAPI.createTodo` e insere na store a entidade retornada pelo serviço.
- Os testes da store cobrem estado inicial, alterações, persistência e reidratação; os testes de interação de `App` continuam passando.

## Restrições e decisões

- As categorias válidas são a união compartilhada `TodoCategory`: `pessoal`, `trabalho` e `estudos`.
- O reviver do armazenamento JSON do Zustand converte as strings persistidas de `createdAt` novamente em instâncias de `Date`.
- O serviço de API simulado converte DTOs para tipos de domínio antes de retornar dados à store.
- A persistência do estado é local ao navegador atual.

## Plano de implementação

- [x] Adicionar Zustand e implementar a store persistida.
- [x] Adicionar testes unitários para as ações da store e a reidratação.
- [x] Migrar a aplicação para usar seletores da store.

## Verificação

- [x] Executar os testes da store e de integração, e gerar o build da aplicação.
