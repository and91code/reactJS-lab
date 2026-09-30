import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./FormTodo-BjK4fEa7.js";import{n as r,t as i}from"./useTodoStore-vfE1uXbB.js";var a,o,s,c,l,u,d,f;function p(){return(p=e((()=>{i(),t(),{expect:a,fn:o,userEvent:s,within:c}=__STORYBOOK_MODULE_TEST__,l={title:`Components/FormTodo`,component:n,tags:[`autodocs`],args:{onSubmit:o()},loaders:[()=>(r.setState({language:`pt-BR`}),{})]},u={},d={play:async({canvasElement:e})=>{let t=c(e),n=s.setup();await n.click(t.getByRole(`button`,{name:`Adicionar tarefa`})),await a(t.getByText(`O título é obrigatório.`)).toBeInTheDocument(),await a(t.getByText(`A categoria é obrigatória.`)).toBeInTheDocument(),await n.type(t.getByRole(`textbox`,{name:`Título`}),`ab`),await n.click(t.getByRole(`button`,{name:`Adicionar tarefa`})),await a(t.getByText(`O título deve ter pelo menos 3 caracteres.`)).toBeInTheDocument()}},f=[`Default`,`ValidationError`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}}})))()}p();export{u as Default,d as ValidationError,f as __namedExportsOrder,l as default};