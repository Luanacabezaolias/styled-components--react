import { useState } from "react";
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers'
import * as yup from 'yup'

const schema = yup.object({
    nome:yup.string().requiried("Campo Nome Obrigatórtio"),
    email:yup.string().email("Digite um email válido").required("Campo email Obrigatório"),
    cpf: yup.string().min(11, "CPF deve conter pelo menos 11 digitos").required("Campo CPF Obrigatório")
})
.required();

function Cliente(){
    const {register,handleSubmit,formState:{erros},setValue,SetFocus,}
    =useForm({resolver:yupResolver(schema),

})}

const [listacliente, setListaClientes] = useState([]);

function inserirCliente(cliente){
    setListaClientes ([...listacliente, cliente]);
}

function buscarCep(e){
    const cep = e.target.value.replace(/\D/g,'');
    fetch(`viacep.com.br/ws/${cep}/json/`)
    .then((res)=>res.json())
    .then((data)=>{
        setValue('rua',data.logradouro);
        setValue('bairro',data.bairro);
        setValue('cidade',data.localidade);
        setValue('estado',data.uf);
        SetFocus('numero');

    })
}

return (
    <>
    <form onSubmit={handleSubmit(inserirCliente)}>

    <fieldset>
        <legend>Dados Pessoais:</legend>
        <label>Nome:
        <input type="text"{...register('nome')}/>
        <span>{erros.nome?.message}</span>
        </label>

        <label>Email:
        <input type="text"{...register('email')}/>
        <span>{erros.email?.message}</span>
        </label>

        <label>CPF:
        <input type="text"{...register('cpf')}/>
        <span>{erros.cpf?.message}</span>
        </label>

    </fieldset>

    <fieldset>
        <legend>Endereço:</legend>
        <label>Cep:
            <input type="text"{...register('cep')} onBlur={buscarCep}/>
        </label>

        <label>Rua:
            <input type="text"{...register('rua')}/>
        </label>

        <label>Número:
            <input type="text"{...register('nuemro')}/>
        </label>

        <label>Bairro:
            <input type="text"{...register('bairro')}/>
        </label>

        
        <label>Cidade:
            <input type="text"{...register('cidade')}/>
        </label>

        
        <label>Estado:
            <input type="text"{...register('estado')}/>
        </label>

    </fieldset>
    </form>
    </>
)
export default Cliente
