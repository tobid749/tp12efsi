import { useContext, useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { sinArroba, usuarios } from '../Data/Usuarios';
import { Logo } from '../components/BarraSuperior';
import Avatar from '../components/Avatar';
import Icono from '../components/Icono';
import TemaToggle from '../components/TemaToggle';

const cuentasDemo = usuarios.slice(0, 3);

export default function Login() {
    const { usuario, iniciarSesion } = useContext(AuthContext);
    const navigate = useNavigate();
    const [handle, setHandle] = useState('');
    const [clave, setClave] = useState('');
    const [error, setError] = useState('');

    if (usuario) return <Navigate to="/" replace />;

    const entrar = (h: string) => {
        iniciarSesion(h);
        navigate('/', { replace: true });
    };

    const enviar = (e: FormEvent) => {
        e.preventDefault();
        const limpio = handle.trim().replace(/^@/, '');
        if (!/^[a-zA-Z0-9._]{3,24}$/.test(limpio)) {
            setError('El usuario debe tener entre 3 y 24 caracteres (letras, números, punto o guion bajo).');
            return;
        }
        if (clave.length < 4) {
            setError('La contraseña debe tener al menos 4 caracteres.');
            return;
        }
        entrar(limpio);
    };

    return (
        <div className="login">
            <div className="login-fondo" aria-hidden="true">
                <span className="mancha m1" />
                <span className="mancha m2" />
                <span className="mancha m3" />
            </div>

            <div className="login-tema">
                <TemaToggle />
            </div>

            <div className="login-marca">
                <Logo grande />
                <p>Guardá lo que te gusta. Compartí lo que vivís.</p>
            </div>

            <form className="login-tarjeta" onSubmit={enviar} noValidate>
                <label className="campo-icono">
                    <Icono nombre="usuario" tam={19} />
                    <input
                        value={handle}
                        onChange={(e) => {
                            setHandle(e.target.value);
                            setError('');
                        }}
                        placeholder="Usuario"
                        autoComplete="username"
                        aria-label="Usuario"
                    />
                </label>
                <label className="campo-icono">
                    <Icono nombre="candado" tam={19} />
                    <input
                        type="password"
                        value={clave}
                        onChange={(e) => {
                            setClave(e.target.value);
                            setError('');
                        }}
                        placeholder="Contraseña"
                        autoComplete="current-password"
                        aria-label="Contraseña"
                    />
                </label>
                {error && (
                    <p className="login-error" role="alert">
                        {error}
                    </p>
                )}
                <button type="submit" className="btn btn-primario">
                    Iniciar sesión <Icono nombre="flecha" tam={18} strokeWidth={2.2} />
                </button>
            </form>

            <div className="separador">
                <span>o entrá con una cuenta demo</span>
            </div>

            <div className="cuentas-demo">
                {cuentasDemo.map((u) => (
                    <button key={u.usuario} type="button" className="cuenta-demo" onClick={() => entrar(u.usuario)}>
                        <Avatar src={u.foto} alt={u.nombre} tam={40} anillo />
                        <span className="cuenta-demo-texto">
                            <strong>{u.nombre}</strong>
                            <span>{sinArroba(u.usuario)}</span>
                        </span>
                        <Icono nombre="flecha" tam={18} />
                    </button>
                ))}
            </div>
        </div>
    );
}
