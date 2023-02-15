export interface Cliente {
    cpf: string,
    nome: string,
    email: string,
    telefone: string,
    endereco: number | string,
    erroAoSalvarCliente: boolean 
}