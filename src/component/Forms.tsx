import React, {ChangeEvent, FormEvent, useState} from "react";
import s from "./Forms.module.css"
import SuperInput from "./superInput/SuperInput";


function Forms() {
    const initial = {
        name: "",
        email: "",
        tel: "",
        date: "",
        message: ""
    }
    const [values, setValues] = useState<any>(initial)
    const objValues = Object.values(values)

    const inputs = [
        {
            id: 1,
            name: "name",
            type: "text",
            placeholder: "Введите Имя и Фамилию",
            errorMessage: "Должно быть не менее 3 и максимум 30 символов латинского алфавита.Между словами допускается один пробел. ",
            label: "Имя Фамилия",
            pattern: "^([a-zA-Z]{3,30}) ([a-zA-Z]{3,30})$",
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Введите ваш E-mail",
            errorMessage: "Введите правильный ****@example.com электронный адресс",
            label: "E-mail",
            pattern: "[a-zA-Z0-9]+@[a-z]+\\.[a-z]{2,3}",
        },
        {
            id: 3,
            name: "tel",
            type: "tel",
            placeholder: "+7(000)000-00-00",
            errorMessage: "Введите правильный номер",
            label: "Номер телефона",
            pattern: "^\\+7(\\s+)?\\(?([0-9]{3})\\)?(\\s+)?[0-9]{3}-?[0-9]{2}-?[0-9]{2}$"
        },
        {
            id: 4,
            name: "date",
            type: "date",
            placeholder: "Введите вашу дату рождения",
            errorMessage: "Введите пожалуйста данные",
            label: "Дата рождения"
        }
    ]

    const textarea = {
        name: "message",
        placeholder: "Введите ваше сообщение",
        errorMessage: "Сообщение должно быть не менее 10 и максимум 300 символов",
        label: "Сообщение",
    }
    console.log("component")
    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (objValues.every(m => m !== "")) {
            const formData = new FormData()
            formData.append("form", JSON.stringify(values))
            const req = new XMLHttpRequest()
            req.open("POST", "https://httpbin.org/post", true)
            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            req.send('name=' + encodeURIComponent(values.name) + '&email=' + encodeURIComponent(values.email) + '&phone=' + encodeURIComponent(values.tel) + '&birthday=' + encodeURIComponent(values.date) + '&message=' + encodeURIComponent(values.message))
            req.onreadystatechange = function () {
                if (req.readyState == XMLHttpRequest.DONE) {
                    if (req.status == 200 && req.status < 300) {
                        alert("Отправка формы прошла успешно! " + req.response)
                    } else {
                        alert(JSON.stringify("Ошибка " + req.status))
                    }
                }
            }
        } else {
            alert("Проверьте правильность заполнения ")
        }
    }

    const onChange = (e: ChangeEvent<HTMLFormElement>) => {
        if (e.currentTarget.name === "name") {
            let x = e.currentTarget.value
            x = x.match("^([a-zA-Z]{3,30}) ([a-zA-Z]{3,30})$")
            return x ? setValues({...values, [e.currentTarget.name]: e.currentTarget.value.toUpperCase().trim()}) : ""
        }
        if (e.currentTarget.name === "email") {
            let x = e.currentTarget.value
            x = x.match("[a-zA-Z0-9]+@[a-z]+\\.[a-z]{2,3}")
            return x ? setValues({...values, [e.currentTarget.name]: e.currentTarget.value.trim()}) : ""
        }
        if (e.currentTarget.name === "tel") {
            let x = e.currentTarget.value;
            x = x.replace(/^\+7 /, '');
            x = x.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            x = !x[2] ? x[1] : '(' + x[1] + ')' + ' ' + x[2] + (x[3] ? `-${x[3]}` : '') + (x[4] ? `-${x[4]}` : '');
            x = x.startsWith('+7 ') ? x : '+7 ' + x;
            e.currentTarget.value = x
            x = x.match("^\\+7(\\s+)?\\(?([0-9]{3})\\)?(\\s+)?[0-9]{3}-?[0-9]{2}-?[0-9]{2}$")
            return x ? setValues({...values, [e.currentTarget.name]: e.currentTarget.value.trim()}) : ""
        }
        if (e.currentTarget.name === "date") {
            let x = e.currentTarget.value
            return x ? setValues({...values, [e.currentTarget.name]: e.currentTarget.value.trim()}) : ""
        }
        if (e.currentTarget.name === "message") {
            if (e.currentTarget.value.trim() !== "") {
                let x = e.currentTarget.value;
                x = x.match("[a-z0-9_-]{10,300}")
                return x ? setValues({...values, [e.currentTarget.name]: e.currentTarget.value.trim()}) : ""
            }
        }
    }
    return (
        <div className={s.container}>
            <form id={"f"} onSubmit={handleFormSubmit} noValidate className={s.form}>
                <div className={s.title}>
                    <h2>Форма обратной связи</h2>
                </div>
                {inputs.map(input =>
                    <SuperInput key={input.id}
                                id={input.id}
                                name={input.name}
                                type={input.type}
                                value={values[input.name]}
                                placeholder={input.placeholder}
                                errorMessage={input.errorMessage}
                                label={input.label}
                                pattern={input.pattern}
                                onChange={onChange}
                    />)}
                <label>Сообщение*</label>
                <textarea id={"t"} name="message" placeholder="Введите ваше сообщение"
                          onChange={(e: any) => onChange(e)} required
                          minLength={10} maxLength={300}/>
                <span>{textarea.errorMessage}</span>
                <button type="submit">Отправить</button>
            </form>

        </div>
    )
}

export default Forms