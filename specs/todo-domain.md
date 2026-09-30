# Funcionalidade: Contratos do domínio de To-Do

## Problema

Os formulários de To-Do e o código de domínio precisam de um contrato de entidade compartilhado e de validação de entrada consistente.

## Objetivos

- Definir a entidade `Todo` com `id`, `title`, `category`, `completed` e `createdAt`.
- Validar os valores do formulário de To-Do de acordo com as regras acordadas para título e categoria.

## Fora do escopo

- Persistência, operações sobre tarefas e comportamento da interface.

## Cenários de uso

- Como pessoa desenvolvedora, quero entidades de To-Do tipadas e valores de formulário validados para que os consumidores compartilhem as mesmas regras de domínio.

## Critérios de aceitação

- Um `Todo` tem `id` e `title` do tipo string, `category` permitida, `completed` do tipo boolean e `createdAt` do tipo `Date`.
- O campo `title` do formulário é obrigatório e contém de 3 a 50 caracteres, incluindo os limites.
- O campo `category` do formulário é obrigatório e aceita `pessoal`, `trabalho` ou `estudos`.
- O tipo dos valores do formulário é inferido a partir do schema Zod.

## Restrições e decisões

- A lista de categorias é compartilhada pelo tipo de domínio TypeScript e pelo schema Zod.
- `createdAt` é representado como um `Date` do JavaScript no modelo de domínio.

## Plano de implementação

- [x] Adicionar a entidade `Todo` e o tipo compartilhado de categoria.
- [x] Adicionar o schema Zod do formulário e o tipo inferido.

## Verificação

- [x] Testar campos obrigatórios, limites de tamanho do título e categorias permitidas.
