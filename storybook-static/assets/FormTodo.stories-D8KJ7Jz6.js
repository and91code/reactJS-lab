import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./FormTodo-Dl4oO1sS.js";var r,i,a,o,s,c,l,u;function d(){return(d=e((()=>{t(),{expect:r,fn:i,userEvent:a,within:o}=__STORYBOOK_MODULE_TEST__,s={title:`Components/FormTodo`,component:n,tags:[`autodocs`],args:{onSubmit:i()}},c={},l={play:async({canvasElement:e})=>{let t=o(e),n=a.setup();await n.click(t.getByRole(`button`,{name:`Adicionar tarefa`})),await r(t.getByText(`O título é obrigatório.`)).toBeInTheDocument(),await r(t.getByText(`A categoria é obrigatória.`)).toBeInTheDocument(),await n.type(t.getByRole(`textbox`,{name:`Título`}),`ab`),await n.click(t.getByRole(`button`,{name:`Adicionar tarefa`})),await r(t.getByText(`O título deve ter pelo menos 3 caracteres.`)).toBeInTheDocument()}},u=[`Default`,`ValidationError`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    await user.click(canvas.getByRole('button', {
      name: 'Adicionar tarefa'
    }));
    await expect(canvas.getByText('O título é obrigatório.')).toBeInTheDocument();
    await expect(canvas.getByText('A categoria é obrigatória.')).toBeInTheDocument();
    await user.type(canvas.getByRole('textbox', {
      name: 'Título'
    }), 'ab');
    await user.click(canvas.getByRole('button', {
      name: 'Adicionar tarefa'
    }));
    await expect(canvas.getByText('O título deve ter pelo menos 3 caracteres.')).toBeInTheDocument();
  }
}`,...l.parameters?.docs?.source}}}})))()}d();export{c as Default,l as ValidationError,u as __namedExportsOrder,s as default};