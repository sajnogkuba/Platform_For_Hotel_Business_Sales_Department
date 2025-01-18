import React from 'react';
import Input from '../Input/Input.jsx';
import Button from '../Button/Button.jsx';
import './Form.css';

const Form = ({ inputs, button, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            {inputs.map((input, index) => (
                <Input
                    key={index}
                    label={input.label}
                    id={input.id}
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    required={input.required}
                />
            ))}
            <Button text={button.text} type={button.type || 'submit'} />
        </form>
    );
};

export default Form;
