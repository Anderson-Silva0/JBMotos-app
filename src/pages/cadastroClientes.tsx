import { ChangeEvent, FC, useState } from "react"
import { Card } from "../components/card"
import { FormGroup } from "../components/form-group"
import { InputCep, InputCpf, InputTelefone } from "../components/input"
import '../styles/cadastroClientes.css'
import { mensagemErro, mensagemSucesso } from "../components/toast"
import { Cliente } from "../components/cliente"
import { Endereco } from "../components/endereco"
import { ClienteService } from "../services/clienteService"
import { EnderecoService } from "../services/enderecoService"

export const CadastroClientes: FC = () => {

    const {
        salvarCliente,
        buscarTodosClientes,
        buscarClientePorCpf,
        atualizarCliente,
        deletarCliente
    } = ClienteService()
    const {
        salvarEndereco,
        buscarTodosEnderecos,
        buscarEnderecoPorId,
        atualizarEndereco,
        deletarEndereco
    } = EnderecoService()

    const [cliente, setCliente] = useState<Cliente>({
        cpf: '',
        nome: '',
        email: '',
        telefone: '',
        endereco: 0,
        erroAoSalvarCliente: false
    })

    const setPropsCliente = (key: string, e: ChangeEvent<HTMLInputElement>) => {
        setCliente({ ...cliente, [key]: e.target.value })
    }

    const [endereco, setEndereco] = useState<Endereco>({
        id: null,
        rua: '',
        cep: '',
        numero: '',
        bairro: '',
        cidade: ''
    })

    const setPropsEndereco = (key: string, e: ChangeEvent<HTMLInputElement>) => {
        setEndereco({ ...endereco, [key]: e.target.value })
    }

    const submitCliente = (id?: number | null) => {
        salvarCliente({ ...cliente, endereco: id })
            .then(response => {
                mensagemSucesso("Cliente salvo com sucesso!")
                setCliente({
                    ...cliente, cpf: '', nome: '', email: '', telefone: '', endereco: 0, erroAoSalvarCliente: false
                })
                setEndereco({
                    ...endereco, id: null, rua: '', cep: '', numero: '', bairro: '', cidade: ''
                })
            }).catch(error => {
                if (id) {
                    setCliente({ ...cliente, erroAoSalvarCliente: true })
                }
                const erros = error.response.data
                if (erros.length) {
                    erros.forEach((erro: string) => {
                        mensagemErro(erro)
                    })
                } else {
                    mensagemErro(erros.error)
                }
            })
    }

    const submit = () => {
        if (!cliente.erroAoSalvarCliente) {
            salvarEndereco(endereco)
                .then(response => {
                    setEndereco({ ...endereco, id: response.data.id })
                    submitCliente(response.data.id)
                    mensagemSucesso("Endereço salvo com sucesso!")
                }).catch(error => {
                    submitCliente()
                    const erros = error.response.data
                    if (erros.length) {
                        erros.forEach((erro: string) => {
                            mensagemErro(erro)
                        })
                    } else {
                        mensagemErro(erros.error)
                    }
                })
        } else {
            submitCliente(endereco.id)

        }
    }

    return (
        <div id="div-0">
            <div id="div-1">
                <Card titulo="Dados do Cliente">
                    <FormGroup label="CPF: *" htmlFor="cpf">
                        <InputCpf
                            value={cliente.cpf}
                            onChange={e => setPropsCliente("cpf", e)}
                        />
                    </FormGroup>
                    <FormGroup label="Nome: *" htmlFor="nome">
                        <input
                            value={cliente.nome}
                            onChange={e => setPropsCliente("nome", e)}
                            id="nome"
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup label="Email: *" htmlFor="email">
                        <input
                            value={cliente.email}
                            onChange={e => setPropsCliente("email", e)}
                            id="email"
                            type="email"
                        />
                    </FormGroup>
                    <FormGroup label="Telefone: *" htmlFor="telefone">
                        <InputTelefone
                            value={cliente.telefone}
                            onChange={e => setPropsCliente("telefone", e)}
                        />
                    </FormGroup>
                </Card>
            </div>
            {(!cliente.erroAoSalvarCliente) ?
                <div id="div-2">
                    <Card titulo="Endereço do Cliente">
                        <FormGroup label="Rua: *" htmlFor="rua">
                            <input
                                value={endereco.rua}
                                onChange={e => setPropsEndereco("rua", e)}
                                id="rua"
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup label="CEP: *" htmlFor="cep">
                            <InputCep
                                value={endereco.cep}
                                onChange={e => setPropsEndereco("cep", e)}
                            />
                        </FormGroup>
                        <FormGroup label="Número: *" htmlFor="numero">
                            <input
                                value={endereco.numero}
                                onChange={e => setPropsEndereco("numero", e)}
                                id="numero"
                                type="number"
                            />
                        </FormGroup>
                        <FormGroup label="Bairro: *" htmlFor="bairro">
                            <input
                                value={endereco.bairro}
                                onChange={e => setPropsEndereco("bairro", e)}
                                id="bairro"
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup label="Cidade: *" htmlFor="cidade">
                            <input
                                value={endereco.cidade}
                                onChange={e => setPropsEndereco("cidade", e)}
                                id="cidade"
                                type="text"
                            />
                        </FormGroup>
                    </Card>
                </div>
                :
                <div id="div-3">
                    O Endereço já foi salvo com sucesso.
                    Agora informe os dados corretos para salvar o Cliente.
                </div>
            }
            <div id="div-4">
                <button onClick={submit} type="submit">Cadastrar Cliente</button>
            </div>
        </div>
    )
}