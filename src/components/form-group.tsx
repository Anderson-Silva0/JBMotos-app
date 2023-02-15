import { FC, ReactNode } from "react"

interface values {
    label: string,
    htmlFor: string,
    children?: ReactNode
}

export const FormGroup: FC<values> = ({ label, htmlFor, children }) => {

    return (
        <div className="form-group">
            <label htmlFor={htmlFor}>{label}</label>
            {children}
        </div>
    )
}