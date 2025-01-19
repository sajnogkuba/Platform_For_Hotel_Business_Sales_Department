import React, {useState} from 'react';
import Input from '../Input/Input.jsx';
import Button from '../Button/Button.jsx';
import './Form.css';

const Form = ({ inputs, button, onSubmit }) => {
    const [formData, setFormData] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {inputs.map((input, index) => (
                <Input
                    key={index}
                    label={input.label}
                    id={input.id}
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    required={input.required}
                    onChange={handleInputChange}
                />
            ))}
            <Button text={button.text} type={button.type || 'submit'} />
        </form>
    );
};

export default Form;
