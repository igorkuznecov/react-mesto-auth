import React from 'react';
import { useNavigate } from 'react-router-dom';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { register } from '../../utils/auth';

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(false);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    register(password, email)
      .then((res) => {
        console.log(res);
        if (res.data) {
          setIsRegisterSuccess(true);
          setIsInfoPopupOpen(true);
        } else {
          setIsRegisterSuccess(false);
          setIsInfoPopupOpen(true);
        }
      })
      .catch((res) => console.log(`catch err ${res}`));
  }

  function goToLogin() {
    navigate('/sign-in', { replace: false });
  }

  function closeInfoPopup() {
    setIsInfoPopupOpen(false);
    if (isRegisterSuccess) {
      setTimeout(() => {
        navigate('/sign-in', { replace: true });
      }, 500);
    }
  }

  return (
    <>
      <InfoTooltip
        isOpen={isInfoPopupOpen}
        success={isRegisterSuccess}
        onClose={closeInfoPopup}
      />
      <section className='register'>
        <h2 className='register__title'>Регистрация</h2>
        <form
          name='register-form'
          className='form register-form'
          onSubmit={handleSubmit}
        >
          <input
            required
            minLength='6'
            maxLength='40'
            placeholder='Email'
            type='email'
            className='form__input form__input_theme-black form__input_register-email'
            name='register-form-email'
            value={email}
            onChange={handleEmailChange}
          />
          <input
            required
            minLength='4'
            maxLength='200'
            placeholder='Пароль'
            type='password'
            className='form__input form__input_theme-black form__input_register-password'
            name='register-form-password'
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            type='submit'
            className='form__save-button form__save-button_theme-white'
            name='register-form-save-button'
          >
            Зарегистрироваться
          </button>
          <span className='register__text'>
            Уже зарегистрированы?{' '}
            <a className='register__link' onClick={goToLogin}>
              Войти
            </a>
          </span>
        </form>
      </section>
    </>
  );
}
