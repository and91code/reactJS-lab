# Funcionalidade: Primitivos compartilhados do Design System

## Problema

Os componentes de interface são implementados localmente em cada funcionalidade, o que duplica estilos, acessibilidade e comportamento.

## Objetivos

- Centralizar os primitivos genéricos em `src/components/ui/`.
- Fornecer Button, Input, Select e Textarea acessíveis, tipados e reutilizáveis.
- Migrar os componentes de To-Do para os primitivos compartilhados.

## Fora do escopo

- Componentes de navegação, layout de página e lógica específica de domínio.
- Refatoração de `DynamicForm`, caso não exista no projeto.

## Cenários de uso

- Como pessoa desenvolvedora, quero reutilizar controles com aparência, estados e acessibilidade consistentes.
- Como pessoa usuária, quero controles previsíveis com labels e erros anunciados corretamente.

## Critérios de aceitação

- Button oferece variantes `primary`, `secondary`, `danger` e `ghost`, tamanhos `sm`, `md` e `lg`, loading e disabled.
- Input e Textarea aceitam props nativas, label, helper text, erro e estado de erro acessível.
- Select aceita opções tipadas, seleção múltipla, placeholder e estado de erro.
- Cada primitivo tem tipos, implementação, story e testes com React Testing Library.
- FormTodo usa Input, Select e Button; TableTodos usa Button.
- As suítes existentes e os novos testes passam, e o build da aplicação e do Storybook conclui.

## Restrições e decisões

- Os estilos dos primitivos são compartilhados pelo CSS global já carregado pela aplicação e pelo preview do Storybook.
- Os controles preservam as props HTML nativas compatíveis com seus recursos adicionais.
- Os controles baseados em elementos HTML encaminham refs para integração com React Hook Form.
- `DynamicForm` não existe no projeto no momento da implementação.

## Plano de implementação

- [x] Documentar a convenção SDD da pasta `components/ui`.
- [x] Criar Button, Input, Select e Textarea com tipos, stories e testes.
- [x] Migrar FormTodo e TableTodos para os primitivos.
- [ ] Executar a suíte completa e os builds.

## Verificação

- [x] Executar testes, build da aplicação e build do Storybook.
