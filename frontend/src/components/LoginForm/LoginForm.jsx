import Button from "../Button/Button.jsx";
import "./LoginForm.css";
import Input from "../Input/Input.jsx";

const LoginForm = () => {
    return (
        <div className="login-form">
            <h2>Customer Login</h2>
            <p>Nice to see you again!</p>
            <form method="post">
                <Input label="Email:" id="email" type="email" name="email" required />
                <Input label="Password:" id="password" type="password" name="password" required />
                <Button text="Login" type="submit" />
            </form>
            <p>Don't have an account yet?</p>
            <a href="/registration" className="register-button">
                <Button text="Register" type="submit"/>
            </a>
        </div>
    );
}

export default LoginForm;