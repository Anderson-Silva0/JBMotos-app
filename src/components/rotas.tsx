import { FC } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CadastroClientes } from "../pages/cadastroClientes"

export const Rotas: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/cadastro-clientes" element={<CadastroClientes />}/>
            </Routes>
        </BrowserRouter>
    )
}