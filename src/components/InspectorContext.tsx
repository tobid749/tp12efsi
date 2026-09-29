import { useContext, type CSSProperties } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PublicacionesContext } from '../context/PublicacionesContext';
import { TemaContext } from '../context/TemaContext';

interface Fila {
    clave: string;
    valor: string;
}

interface TarjetaProps {
    nombre: string;
    archivo: string;
    color: string;
    filas: Fila[];
    consumidores: string[];
}

function Tarjeta({ nombre, archivo, color, filas, consumidores }: TarjetaProps) {
    return (
        <article className="insp-tarjeta" style={{ '--ctx': color } as CSSProperties}>
            <header>
                <span className="insp-nombre">
                    <span className="insp-punto" />
                    {nombre}
                </span>
                <code>{archivo}</code>
            </header>
            <div className="insp-filas">
                {filas.map((f) => (
                    <div key={f.clave} className="insp-fila">
                        <span>{f.clave}</span>
                        {/* key = valor: cada cambio re-dispara el destello */}
                        <b key={f.valor} className="destello">
                            {f.valor}
                        </b>
                    </div>
                ))}
            </div>
            <footer>
                <span>useContext en</span>
                {consumidores.map((c) => (
                    <em key={c}>{c}</em>
                ))}
            </footer>
        </article>
    );
}

/** Panel lateral (solo escritorio) que muestra en vivo lo que hay adentro de cada Context. */
export default function InspectorContext() {
    const { usuario } = useContext(AuthContext);
    const { tema } = useContext(TemaContext);
    const { totales } = useContext(PublicacionesContext);

    return (
        <aside className="inspector" aria-label="Estado de los Context en vivo">
            <div className="insp-titulo">
                <span>Context inspector</span>
                <span className="en-vivo">
                    <i /> en vivo
                </span>
            </div>

            <Tarjeta
                nombre="AuthContext"
                archivo="context/AuthContext.ts"
                color="#ff3d77"
                filas={[
                    { clave: 'usuario', valor: usuario ? `"${usuario.usuario}"` : 'null' },
                    { clave: 'nombre', valor: usuario ? `"${usuario.nombre}"` : '—' },
                    { clave: 'logueado', valor: String(Boolean(usuario)) }
                ]}
                consumidores={['Login', 'RutaProtegida', 'Historias', 'TarjetaPublicacion', 'NavInferior', 'Perfil', 'PublicacionesProvider']}
            />

            <Tarjeta
                nombre="TemaContext"
                archivo="context/TemaContext.ts"
                color="#8b3dff"
                filas={[{ clave: 'tema', valor: `"${tema}"` }]}
                consumidores={['TemaToggle', 'Perfil']}
            />

            <Tarjeta
                nombre="PublicacionesContext"
                archivo="context/PublicacionesContext.ts"
                color="#ff8a3d"
                filas={[
                    { clave: 'meGusta', valor: String(totales.meGusta) },
                    { clave: 'guardadas', valor: String(totales.guardadas) },
                    { clave: 'comentarios', valor: String(totales.comentarios) }
                ]}
                consumidores={['Inicio', 'TarjetaPublicacion', 'Explorar', 'Guardados', 'Perfil', 'NavInferior', 'GrillaPublicaciones']}
            />
        </aside>
    );
}
