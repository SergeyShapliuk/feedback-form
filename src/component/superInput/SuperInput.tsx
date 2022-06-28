import React, {useState} from "react";
import s from "./SuperInput.module.css"

type SuperInputProps = {
    id: any
    name: string
    type: string
    value: any
    placeholder: string
    label: string
    pattern: any
    onChange: (e: any) => void
    errorMessage: any

}

function SuperInput({name, type, value, placeholder, id, label, pattern, onChange, errorMessage}: SuperInputProps) {
    const [focused, setFocused] = useState<boolean>(false)

    function handleFocus(e: any) {
        if (e.currentTarget.value.trim() !== "") {
            setFocused(true)
        } else {
            setFocused(false)
        }
    }

    return (
        <div className={s.superInput}>
            <label>{label}*</label>
            <input id={id}
                   name={name}
                   type={type}
                   value={value[name]}
                   placeholder={placeholder}
                   pattern={pattern}
                   onChange={onChange}
                   onBlur={handleFocus}
                   autoFocus={focused}
                   className={`${s.input} ${focused ? s.errorInput : s.input}`}
                   required/>
            {focused && <span>{errorMessage}</span>}
        </div>
    )
}

export default SuperInput;