import { useContext, useState } from 'react';
import { PublicacionesContext } from '../context/PublicacionesContext';
import type { PublicacionConEstado } from '../Types/Index';
import Hoja from './Hoja';
import Icono from './Icono';
import TarjetaPublicacion from './TarjetaPublicacion';

interface Props {
    publicaciones: PublicacionConEstado[];
    /** Mosaico con piezas altas (Explorar) o grilla pareja (Perfil / Guardados). */
    mosaico?: boolean;
}

export default function GrillaPublicaciones({ publicaciones, mosaico = false }: Props) {
    const [abiertaId, setAbiertaId] = useState<string | null>(null);
    // Leemos la versión "viva" desde el Context: si le das like en el modal, la grilla se entera
    const { publicaciones: todas } = useContext(PublicacionesContext);
    const abierta = todas.find((p) => p.id === abiertaId);

    return (
        <>
            <div className={`grilla ${mosaico ? 'mosaico' : ''}`}>
                {publicaciones.map((p, i) => (
                    <button
                        key={p.id}
                        type="button"
                        className={`celda ${mosaico && i % 7 === 1 ? 'alta' : ''}`}
                        onClick={() => setAbiertaId(p.id)}
                        aria-label={`Abrir publicación: ${p.descripcion}`}
                        style={{ animationDelay: `${Math.min(i, 12) * 35}ms` }}
                    >
                        <img src={p.imagen.replace('/900/1125', '/500/500')} alt="" loading="lazy" />
                        <span className="celda-info">
                            <span>
                                <Icono nombre="corazon" relleno tam={15} strokeWidth={0} /> {p.likes.toLocaleString('es-AR')}
                            </span>
                            <span>
                                <Icono nombre="comentario" relleno tam={15} strokeWidth={0} /> {p.comentarios.length}
                            </span>
                        </span>
                        {p.guardada && (
                            <span className="celda-marca" aria-hidden="true">
                                <Icono nombre="guardar" relleno tam={13} strokeWidth={0} />
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {abierta && (
                <Hoja titulo="Publicación" alCerrar={() => setAbiertaId(null)}>
                    <TarjetaPublicacion publicacion={abierta} />
                </Hoja>
            )}
        </>
    );
}
