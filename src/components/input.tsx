import React from "react";
import InputMask from "react-input-mask"

interface propst {
    value?: string | number | readonly string[] | undefined,
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
}

export const InputCep = (props: propst) => (
    <InputMask mask="99999-999" value={props.value} onChange={props.onChange} />
)


export const InputCpf = (props: propst) => (
        <InputMask mask="999.999.999-99" value={props.value} onChange={props.onChange} />
    )


export const InputTelefone = (props: propst) => (
    <InputMask mask="(99) 99999-9999" value={props.value} onChange={props.onChange} />
)

