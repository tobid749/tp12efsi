import { useContext, useRef, useState, type FormEvent } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PublicacionesContext } from '../context/PublicacionesContext';
import { buscarUsuario, sinArroba } from '../Data/Usuarios';
import type { PublicacionConEstado } from '../Types/Index';
import Avatar from './Avatar';
import Icono from './Icono';

const LARGO_MAX = 90;

export default function TarjetaPublicacion({ publicacion }: { publicacion: PublicacionConEstado }) {
    const { usuario } = useContext(AuthContext);
    const { alternarMeGusta, darMeGusta, alternarGuardado, comentar } = useContext(PublicacionesContext);

    const [corazones, setCorazones] = useState(0);
    const [expandida, setExpandida] = useState(false);
    const [verTodos, setVerTodos] = useState(false);
    const [borrador, setBorrador] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const autor = buscarUsuario(publicacion.usuario);
    const { descripcion, comentarios } = publicacion;
    const larga = descripcion.length > LARGO_MAX;
    const visibles = verTodos ? comentarios : comentarios.slice(-2);

    const dobleTap = () => {
        darMeGusta(publicacion.id);
        setCorazones((n) => n + 1);
    };

    const enviar = (e: FormEvent) => {
        e.preventDefault();
        if (!borrador.trim()) return;
        comentar(publicacion.id, borrador);
        setBorrador('');
    };

    return (
        <article className="post">
            <header className="post-cabecera">
                <Avatar src={autor.foto} alt={autor.nombre} tam={36} anillo />
                <div className="post-autor">
                    <strong>{sinArroba(autor.usuario)}</strong>
                    {publicacion.ubicacion && (
                        <span>
                            <Icono nombre="ubicacion" tam={12} /> {publicacion.ubicacion}
                        </span>
                    )}
                </div>
                <time>{publicacion.tiempo}</time>
            </header>

            <div className="post-media" onDoubleClick={dobleTap}>
                <img src={publicacion.imagen} alt={descripcion} loading="lazy" draggable={false} />
                {corazones > 0 && (
                    <span key={corazones} className="corazon-estallido">
                        <Icono nombre="corazon" relleno tam={110} strokeWidth={0} />
                    </span>
                )}
            </div>

            <div className="post-acciones">
                <button
                    type="button"
                    className={`accion me-gusta ${publicacion.meGusta ? 'activa' : ''}`}
                    onClick={() => alternarMeGusta(publicacion.id)}
                    aria-pressed={publicacion.meGusta}
                    aria-label="Me gusta"
                >
                    <Icono key={String(publicacion.meGusta)} nombre="corazon" relleno={publicacion.meGusta} tam={26} />
                </button>
                <button type="button" className="accion" onClick={() => inputRef.current?.focus()} aria-label="Comentar">
                    <Icono nombre="comentario" tam={25} />
                </button>
                <span className="relleno" />
                <button
                    type="button"
                    className={`accion guardar ${publicacion.guardada ? 'activa' : ''}`}
                    onClick={() => alternarGuardado(publicacion.id)}
                    aria-pressed={publicacion.guardada}
                    aria-label="Guardar"
                >
                    <Icono key={String(publicacion.guardada)} nombre="guardar" relleno={publicacion.guardada} tam={25} />
                </button>
            </div>

            <div className="post-cuerpo">
                <p className="post-likes">{publicacion.likes.toLocaleString('es-AR')} Me gusta</p>
                <p className="post-descripcion">
                    <strong>{sinArroba(autor.usuario)}</strong>{' '}
                    {larga && !expandida ? descripcion.slice(0, LARGO_MAX).trimEnd() + '… ' : descripcion}
                    {larga && !expandida && (
                        <button type="button" className="link-suave" onClick={() => setExpandida(true)}>
                            más
                        </button>
                    )}
                </p>

                {comentarios.length > 2 && !verTodos && (
                    <button type="button" className="link-suave ver-comentarios" onClick={() => setVerTodos(true)}>
                        Ver los {comentarios.length} comentarios
                    </button>
                )}
                {visibles.map((c) => (
                    <p key={c.id} className={`comentario ${c.usuario === usuario?.usuario ? 'mio' : ''}`}>
                        <strong>{sinArroba(c.usuario)}</strong> {c.texto}
                    </p>
                ))}
            </div>

            {usuario && (
                <form className="compositor" onSubmit={enviar}>
                    <Avatar src={usuario.foto} alt={usuario.nombre} tam={28} />
                    <input
                        ref={inputRef}
                        value={borrador}
                        onChange={(e) => setBorrador(e.target.value)}
                        placeholder={`Comentá como ${sinArroba(usuario.usuario)}…`}
                        aria-label="Agregar un comentario"
                        maxLength={220}
                    />
                    <button type="submit" disabled={!borrador.trim()}>
                        Publicar
                    </button>
                </form>
            )}
        </article>
    );
}
