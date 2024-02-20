import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { submitUserData } from '../redux/actions/index';
import styles from './Login.module.css';

const INITIAL_STATE = {
  email: '',
  password: '',
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, setLogin] = useState(INITIAL_STATE);
  const { email, password } = login;

  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name: targetName, value } = target;
    setLogin({ ...login, [targetName]: value });
  };

  const isEmailValid = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = () => {
    const passwordCharacters = 6;
    return password.length >= passwordCharacters;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(submitUserData(login));
    navigate('/carteira');
  };

  return (
    <form className={ styles.formContainer } onSubmit={ handleSubmit }>
      <div className={ styles.containerInputs }>
        <div className={ styles.inputWrapper }>
          <input
            className={ styles.input }
            type="text"
            id="email"
            name="email"
            value={ email }
            onChange={ handleChange }
            data-testid="email-input"
            required
          />
          <label className={ styles.label } htmlFor="email">
            E-mail:
          </label>
        </div>
        <div className={ styles.inputWrapper }>
          <input
            className={ styles.input }
            type="password"
            id="Senha"
            name="password"
            value={ password }
            onChange={ handleChange }
            data-testid="password-input"
            required
          />
          <label className={ styles.label } htmlFor="password">
            Senha:
          </label>
        </div>
        <button
          type="submit"
          disabled={ !isEmailValid() || !isPasswordValid() }
          onClick={ handleSubmit }
        >
          Entrar
        </button>
      </div>
    </form>
  );
}

export default Login;
