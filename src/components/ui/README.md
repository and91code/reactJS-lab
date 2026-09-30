# Primitivos de interface

Esta pasta é a fonte única da verdade dos primitivos de interface do projeto e forma o Design System interno. Componentes genéricos usados por funcionalidades distintas devem ser criados ou mantidos aqui para compartilhar comportamento, acessibilidade e apresentação.

Cada componente deve ficar em sua própria pasta e seguir a estrutura SDD:

- `Nome.types.ts`: contrato fortemente tipado das props.
- `Nome.tsx`: implementação acessível e reutilizável, sem lógica específica de domínio.
- `Nome.test.tsx`: testes de comportamento com React Testing Library e Vitest.
- `Nome.stories.tsx`: documentação de estados e variantes no Storybook.

Antes de criar um primitivo, verifique se um componente existente pode ser estendido sem comprometer sua responsabilidade. Mantenha os componentes consumidores livres de cópias locais da apresentação dos controles.
