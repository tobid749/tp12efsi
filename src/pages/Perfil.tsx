import { useContext, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { PublicacionesContext } from '../context/PublicacionesContext';
import { TemaContext } from '../context/TemaContext';
import { sinArroba } from '../Data/Usuarios';
import Avatar from '../components/Avatar';
import BarraSuperior from '../components/BarraSuperior';
import GrillaPublicaciones from '../components/GrillaPublicaciones';
import Hoja from '../components/Hoja';
import Icono, { type NombreIcono } from '../components/Icono';
import TemaToggle from '../components/TemaToggle';

type Pestaña = 'publicaciones' | 'guardadas' | 'meGusta';

export default function Perfil() {
    const { usuario, cerrarSesion, actualizarPerfil } = useContext(AuthContext);
    const { publicaciones, guardadas, totales } = useContext(PublicacionesContext);
    const { esOscuro } = useContext(TemaContext);
    const navigate = useNavigate();

    const [pestaña, setPestaña] = useState<Pestaña>('publicaciones');
    const [editando, setEditando] = useState(false);

    if (!usuario) return null;

    const propias = publicaciones.filter((p) => p.usuario === usuario.usuario);
    const meGusta = publicaciones.filter((p) => p.meGusta);
    const listas = { publicaciones: propias, guardadas, meGusta };

    const pestañas: { id: Pestaña; icono: NombreIcono; texto: string; n: number }[] = [
        { id: 'publicaciones', icono: 'grilla', texto: 'Posts', n: propias.length },
        { id: 'guardadas', icono: 'guardar', texto: 'Guardados', n: totales.guardadas },
        { id: 'meGusta', icono: 'corazon', texto: 'Me gusta', n: totales.meGusta }
    ];

    const salir = () => {
        cerrarSesion();
        navigate('/login', { replace: true });
    };

    return (
        <>
            <BarraSuperior
                izquierda={<h1 className="perfil-handle">{sinArroba(usuario.usuario)}</h1>}
                derecha={
                    <button type="button" className="icono-btn" onClick={salir} aria-label="Cerrar sesión" title="Cerrar sesión">
                        <Icono nombre="salir" tam={22} />
                    </button>
                }
            />

            <section className="perfil-hero">
                <div className="perfil-top">
                    <Avatar src={usuario.foto} alt={usuario.nombre} tam={88} anillo />
                    <dl className="perfil-stats">
                        <div>
                            <dt>{propias.length}</dt>
                            <dd>posts</dd>
                        </div>
                        <div>
                            <dt>{usuario.seguidores}</dt>
                            <dd>seguidores</dd>
                        </div>
                        <div>
                            <dt>{usuario.seguidos}</dt>
                            <dd>seguidos</dd>
                        </div>
                    </dl>
                </div>
                <p className="perfil-nombre">{usuario.nombre}</p>
                {usuario.bio && <p className="perfil-bio">{usuario.bio}</p>}

                <div className="perfil-acciones">
                    <button type="button" className="btn btn-suave" onClick={() => setEditando(true)}>
                        <Icono nombre="editar" tam={16} /> Editar perfil
                    </button>
                </div>

                <div className="ajuste">
                    <span className="ajuste-icono">
                        <Icono nombre={esOscuro ? 'luna' : 'sol'} tam={18} />
                    </span>
                    <span className="ajuste-texto">
                        <strong>Modo oscuro</strong>
                        <span>{esOscuro ? 'Activado' : 'Desactivado'} · se aplica a toda la app</span>
                    </span>
                    <TemaToggle />
                </div>
            </section>

            <div className="pestañas" role="tablist">
                {pestañas.map((p) => (
                    <button
                        key={p.id}
                        type="button"
                        role="tab"
                        aria-selected={pestaña === p.id}
                        className={`pestaña ${pestaña === p.id ? 'activa' : ''}`}
                        onClick={() => setPestaña(p.id)}
                    >
                        <Icono nombre={p.icono} tam={17} relleno={pestaña === p.id && p.id !== 'publicaciones'} />
                        {p.texto}
                        <span className="pestaña-n">{p.n}</span>
                    </button>
                ))}
            </div>

            {listas[pestaña].length > 0 ? (
                <GrillaPublicaciones publicaciones={listas[pestaña]} />
            ) : (
                <div className="vacio chico">
                    <p>
                        {pestaña === 'publicaciones'
                            ? 'Todavía no compartiste ningún momento.'
                            : pestaña === 'guardadas'
                              ? 'No guardaste publicaciones todavía.'
                              : 'Todavía no le diste me gusta a nada.'}
                    </p>
                </div>
            )}

            {editando && (
                <EditarPerfil
                    nombre={usuario.nombre}
                    bio={usuario.bio}
                    alGuardar={(cambios) => {
                        actualizarPerfil(cambios);
                        setEditando(false);
                    }}
                    alCerrar={() => setEditando(false)}
                />
            )}
        </>
    );
}

interface EditarProps {
    nombre: string;
    bio: string;
    alGuardar: (cambios: { nombre: string; bio: string }) => void;
    alCerrar: () => void;
}

function EditarPerfil({ nombre: nombreInicial, bio: bioInicial, alGuardar, alCerrar }: EditarProps) {
    const [nombre, setNombre] = useState(nombreInicial);
    const [bio, setBio] = useState(bioInicial);

    const enviar = (e: FormEvent) => {
        e.preventDefault();
        if (!nombre.trim()) return;
        alGuardar({ nombre: nombre.trim(), bio: bio.trim() });
    };

    return (
        <Hoja titulo="Editar perfil" alCerrar={alCerrar}>
            <form className="form-hoja" onSubmit={enviar}>
                <label className="campo">
                    <span>Nombre</span>
                    <input value={nombre} onChange={(e) => setNombre(e.target.value)} maxLength={40} autoFocus />
                </label>
                <label className="campo">
                    <span>Presentación</span>
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} maxLength={150} rows={3} />
                    <small>{bio.length}/150</small>
                </label>
                <button type="submit" className="btn btn-primario" disabled={!nombre.trim()}>
                    Guardar cambios
                </button>
            </form>
        </Hoja>
    );
}
