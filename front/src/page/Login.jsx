import React from 'react';
import GoogleLoginButton from '../components/GoogleLoginButton';
import styles from '../styles/page/Login.module.css';

const Login = () => {
  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <p className={styles.sub__top}>당신을 위한 단 하나의 일정 관리</p>
        <h1 className={styles.logo}>WantoDo</h1>
        <p className={styles.sub__bottom}>지금 이 순간, 당신이 원하던 삶이 펼쳐집니다.</p>
      </div>
      <div className={styles.login}>
        <GoogleLoginButton />
      </div>
    </section>
  );
};

export default Login;
