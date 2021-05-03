import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import GoogleLoginButton from '../components/GoogleLoginButton';
import ProfileImage from '../components/ProfileImage';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import IconButton from '../components/IconButton';
import styles from '../styles/page/Login.module.css';

const LoginPage = ({ onLogin }) => {
  return (
    <>
      <div className={styles.title}>
        <p className={styles.sub__top}>당신을 위한 단 하나의 일정 관리</p>
        <h1 className={styles.logo}>WantoDo</h1>
        <p className={styles.sub__bottom}>지금 이 순간, 당신이 원하던 삶이 펼쳐집니다.</p>
      </div>
      <div className={styles.login}>
        <GoogleLoginButton onLogin={onLogin} />
      </div>
    </>
  );
};

const RegisterPage = () => {
  const [imageUrl] = useState('');
  return (
    <form className={styles.form}>
      <ul className={styles.list}>
        <li className={styles.profile}>
          <ProfileImage imageURL={imageUrl} styleName="registerPage" />
          <IconButton Icon={FaPlus} styleName="registerPage__image" />
        </li>
        <li className={styles.textBox}>
          <InputBox labelText="이름" inputName="name" styleName="registerPage" maxLength="10" />
          <InputBox
            inputType="textarea"
            labelText="좌우명"
            inputName="motto"
            rows="3"
            cols="15"
            maxLength="30"
            styleName="registerPage"
          />
        </li>
      </ul>
      <div className={styles.buttons}>
        <Button styleName="registerPage__cancel">취소</Button>
        <Button type="submit" styleName="registerPage">
          가입
        </Button>
      </div>
    </form>
  );
};

const Login = () => {
  const [registerPage, setRegisterPage] = useState(true);

  const history = useHistory();
  const onLogin = (registerFlag) => {
    if (registerFlag) {
      setRegisterPage(true);
      return;
    }

    history.push('/');
  };

  return (
    <section className={styles.container}>
      {registerPage ? <RegisterPage /> : <LoginPage onLogin={onLogin} />}
    </section>
  );
};

export default Login;
