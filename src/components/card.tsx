import {FC, ReactNode} from "react"
import '../styles/card.css'

interface values {
    children?: ReactNode,
    titulo: string
}

export const Card: FC<values> = ({children, titulo}) => {
    return(
        <div className="card">
            <h3 className="card-header">{titulo}</h3>
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}