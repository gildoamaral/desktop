import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import api from '../../services/api';
import styles from './Cadastro.module.css';
import logo from '../../assets/LogoAuto_1.png';

function Cadastro() {
    const navigate = useNavigate();
    const nameRef = useRef();
    const emailRef = useRef();
    const senhaRef = useRef();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await api.post('/cadastro', {
                name: nameRef.current.value,
                email: emailRef.current.value,
                senha: senhaRef.current.value
            });
            alert("Usuário cadastrado");
            navigate('/');
        } catch (err) {
            alert("Erro ao cadastrar usuário");
        }
    }

    return (
        <div className={styles.cadastroContainer}>
            <div className="welcome-text">
                <img src={logo} alt="Logo AutoCare" className={styles.logo} />
                <h1>Crie agora sua conta Auto<span className="highlight">Care</span></h1>
                <h2>e aproveite tudo que nosso app tem a oferecer!</h2>
            </div>
            <form onSubmit={handleSubmit} className={styles.cadastroForm}>
                <h2 className="login-title">Cadastre-se</h2>
                <input ref={nameRef} placeholder="Nome" type="text" className={styles.cadastroInput} />
                <input ref={emailRef} placeholder="E-mail" type="email" className={styles.cadastroInput} />
                <input ref={senhaRef} placeholder="Senha" type="password" className={styles.cadastroInput} />
                <button className={styles.cadastroButton}>Cadastrar</button>
                <Link to="/" className={styles.loginLink}>Já tem uma conta? Faça login</Link>
            </form>
        </div>
    );
}

export default Cadastro;
