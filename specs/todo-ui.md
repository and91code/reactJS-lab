# Funcionalidade: Interface do formulário e da lista de To-Do

## Problema

O domínio de To-Do precisa de uma interface acessível para criar tarefas validadas e alterar seu estado de conclusão.

## Objetivos

- Disponibilizar um formulário validado pelo schema Zod compartilhado.
- Exibir as tarefas e permitir que as pessoas usuárias alternem sua conclusão por meio de um callback explícito.
- Integrar o formulário e a lista na raiz da aplicação usando a store persistida de To-Do.

## Fora do escopo

- Sincronização entre sessões ou dispositivos.

## Cenários de uso

- Como pessoa usuária, quero criar uma tarefa categorizada e receber mensagens de validação antes do envio.
- Como pessoa usuária, quero visualizar as tarefas e concluir ou reabrir uma delas.

## Critérios de aceitação

- O formulário apresenta os campos de título e categoria, comunica de forma acessível todos os erros de validação do schema e envia ao callback os dados de domínio validados e mapeados, com `completed: false`.
- O formulário é limpo após o callback de envio ser concluído com sucesso.
- A lista de tarefas apresenta um estado vazio acessível e renderiza o título, a categoria e o status de cada tarefa.
- As tarefas concluídas têm indicação visual de texto riscado e de status.
- O controle de alternância comunica sua ação e seu estado pressionado e chama o callback com o ID da tarefa.
- Os testes dos componentes cobrem campos obrigatórios, limites de tamanho do título, envio válido, lista vazia, linhas renderizadas e alternância de status.
- A aplicação inicia com a lista vazia, adiciona as tarefas enviadas como pendentes e atualiza o status e a contagem de pendências ao alterná-las.
- O teste integrado cobre o estado inicial, a criação e a conclusão por meio das interações da pessoa usuária.

## Restrições e decisões

- As props do formulário expõem `onSubmit(values)` e aceitam callbacks síncronos ou assíncronos.
- As props da lista expõem `todos` e `onToggle(todoId)`.
- As opções de categoria vêm da constante compartilhada do domínio.
- A store cria os IDs e as datas das tarefas; o formulário envia somente os campos validados.
- O estado das tarefas é gerenciado pela store Zustand e persistido no `localStorage`.

## Plano de implementação

- [x] Definir as props dos componentes e implementar o formulário de tarefas validado.
- [x] Definir as props da lista e implementar a tabela acessível de tarefas.
- [x] Adicionar testes dos dois componentes com React Testing Library.
- [x] Integrar o formulário e a lista ao estado da store na raiz da aplicação.
- [x] Adicionar um teste de ponta a ponta das interações entre componentes.

## Verificação

- [x] Executar os testes dos componentes e o build de produção.
- [x] Executar o teste integrado de criação e conclusão por interação.
