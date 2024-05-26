// import './LoginForm.css';
const { useState, useEffect, useRef, StrictMode, ChangeEvent } = React
const { createRoot, } = ReactDOM

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

const App = () => {
    const initialState = {
        email: '',
        password: ''
    }

    const [formValue, setFormValue] = useState(initialState)

    const email = useRef(null)
    const smallsEmail = useRef(null)
    const password = useRef(null)
    const smallsPass = useRef(null)
    const button = useRef(null)
    const handleChange = ({ target: { name, value } }) => {
        setFormValue({ ...formValue, [name]: value })
    }
    const handleBlur = ({ target: { name, value } }, input) => {
        if (input.current.name === 'email') {
            if (!isEmail(input.current.value.trim())) {
                setErrorFor(input, 'Did not enter a valid email', smallsEmail.current);
            } else {
                setSuccessFor(input);
            }
        }
        if (input.current.name === 'password') {
            isPass(input)
        }
    }

    const handleSumit = (e) => {
        e.preventDefault();

        checkInputs()
        if (isEmail(email.current.value.trim()) && isPass2(password)) {
            const spiner = document.createElement("i")
            spiner.classList.add("fa", "fa-spinner", "fa-spin")
            console.log(spiner)
            button.current.appendChild(spiner)

            setFormValue({
                email: '',
                password: '',
            })

            email.current.value = '',
                password.current.value = ''
        }
    }

    const handleKeyUp = ({ target: { name, value } }, input) => {

        if (input.current.name === 'email') {
            if (!isEmail(input.current.value.trim())) {
                setErrorFor(input, 'Did not enter a valid email', smallsEmail.current);
            } else {
                setSuccessFor(input);
            }
        }
        if (input.current.name === 'password') {
            isPass(input)
        }

    }

    function checkInputs() {
        // trim to remove the whitespaces

        const emailValue = email.current.value.trim();
        const passwordValue = password.current.value.trim();

        if (emailValue === '') {
            setErrorFor(email, 'You cannot leave the email blank', smallsEmail.current);
        } else if (!isEmail(emailValue)) {
            setErrorFor(email, 'Did not enter a valid email', smallsEmail.current);
            return
        } else {
            setSuccessFor(email);
        }

        if (passwordValue === '') {
            setErrorFor(password, 'Password must not be entered blank.', smallsPass.current);
            return
        } else {
            isPass(password)
        }

    }

    function setErrorFor(input, message, small) {
        const formControl = input.current.parentElement;
        formControl.classList.remove("form__success")
        formControl.classList.add("form__error");
        small.innerHTML = message
    }

    function isPass(password) {
        const isLowerCase = /(?=[a-z])/.test(password.current.value);
        const isUpperCase = /(?=[A-Z])/.test(password.current.value);
        const isNumber = /(?=\d)/.test(password.current.value);
        const isSpecialChar = /(?=\W)/.test(password.current.value);
        const isLongEnough = /.{8,}/.test(password.current.value);

        if (!isNumber) {
            setErrorForPass(password, 'The field must contain numbers', smallsPass.current);
            return
        } else {
            setSuccessForPass(password);
        }
        if (!isLowerCase) {
            setErrorForPass(password, 'The field must contain lowercase', smallsPass.current);
            return
        } else {
            setSuccessForPass(password);
        }
        if (!isUpperCase) {
            setErrorForPass(password, 'The Field must Contain Capital Letters', smallsPass.current);
            return
        } else {
            setSuccessForPass(password);
        }
        if (!isSpecialChar) {
            setErrorForPass(password, 'The field must contain Special characters', smallsPass.current);
            return
        } else {
            setSuccessForPass(password);
        }
        if (!isLongEnough) {
            setErrorForPass(password, 'The field must contain more than 8 characters', smallsPass.current);
            return
        } else {
            setSuccessForPass(password);
        }
    }

    function setSuccessFor(input) {
        const formControl = input.current.parentElement;
        formControl.classList.remove("form__error");
        formControl.classList.add("form__success");
    }

    function setErrorForPass(input, message, small) {
        const formControl = input.current.parentElement;
        formControl.classList.remove("form__success")
        formControl.classList.add("form__error");
        small.innerHTML = message
    }

    function setSuccessForPass(input) {
        const formControl = input.current.parentElement;
        formControl.classList.remove("form__error");
        formControl.classList.add("form__success");
    }

    function isEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }
    function isPass2(password) {
        const isLowerCase = /(?=[a-z])/.test(password.current.value);
        const isUpperCase = /(?=[A-Z])/.test(password.current.value);
        const isNumber = /(?=\d)/.test(password.current.value);
        const isSpecialChar = /(?=\W)/.test(password.current.value);
        const isLongEnough = /.{8,}/.test(password.current.value);
        if (!isLowerCase) {
            return false
        }
        if (!isUpperCase) {
            return
        }
        if (!isNumber) {
            return false
        }
        if (!isSpecialChar) {
            return
        }
        if (!isLongEnough) {
            return false
        }
        return true
    }

    return (
        <div className="container">
            <h2 className="container__header">Login</h2>
            <form action="" className="form" onSubmit={handleSumit}>
                <div className="form__group">
                    <label htmlFor="email" className="form__label">Email</label>
                    <input
                        type="text"
                        className="form__input form__username"
                        name="email"
                        id="username"
                        placeholder="Create a username"
                        autoComplete="off"
                        onChange={handleChange}
                        onKeyUp={(e) => handleKeyUp(e, email)}
                        onBlur={(e) => handleBlur(e, email)}
                        ref={email}

                    />
                    <svg className="form__successicon" viewBox="0 0 512 512" width="100" title="check-circle">
                        <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
                    </svg>
                    <svg className="form__erroricon" viewBox="0 0 512 512" width="100" title="exclamation-circle">
                        <path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" />
                    </svg>
                    <p ref={smallsEmail} className="form__message"></p>
                </div>

                <div className="form__group">
                    <label htmlFor="password" className="form__label">Password</label>
                    <input
                        type="password"
                        className="form__input form__password"
                        name="password"
                        id="form__password"
                        placeholder="Create a password"
                        ref={password}
                        onChange={handleChange}
                        onBlur={(e) => handleBlur(e, password)}
                        onKeyUp={(e) => handleKeyUp(e, password)}
                        autoComplete="off"
                    />
                    <svg className="form__successicon" viewBox="0 0 512 512" width="100" title="check-circle">
                        <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
                    </svg>
                    <svg className="form__erroricon" viewBox="0 0 512 512" width="100" title="exclamation-circle">
                        <path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" />
                    </svg>
                    <p ref={smallsPass} className="form__message"></p>
                </div>

                <button ref={button} className="form__button">Submit  </button>
            </form>
        </div>
    )
}

root.render(
    <StrictMode>
        <App />
    </StrictMode>
)
