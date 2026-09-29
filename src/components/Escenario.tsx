import { useEffect, useState, type ReactNode } from 'react';
import InspectorContext from './InspectorContext';

function horaActual() {
    return new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function BarraEstado() {
    const [hora, setHora] = useState(horaActual);
    useEffect(() => {
        const t = setInterval(() => setHora(horaActual()), 15000);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="barra-estado" aria-hidden="true">
            <span>{hora}</span>
            <span className="barra-estado-iconos">
                <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
                    <rect x="0" y="8" width="3" height="4" rx="1" />
                    <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
                    <rect x="10" y="3" width="3" height="9" rx="1" />
                    <rect x="15" y="0" width="3" height="12" rx="1" />
                </svg>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
                    <path d="M8 2.4c2.3 0 4.4.9 6 2.4l1.2-1.3A10.3 10.3 0 0 0 8 .6C5.2.6 2.6 1.7.8 3.5L2 4.8a8.5 8.5 0 0 1 6-2.4zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.3-1.3A6.6 6.6 0 0 0 8 4.2c-1.8 0-3.5.7-4.7 1.8l1.3 1.3C5.5 6.5 6.7 6 8 6zm0 3.5-2 2 2 2 2-2-2-2z" />
                </svg>
                <span className="bateria">
                    <span />
                </span>
            </span>
        </div>
    );
}

/** Marco de iPhone + paneles laterales. En pantallas chicas la app ocupa todo y el marco desaparece. */
export default function Escenario({ children }: { children: ReactNode }) {
    return (
        <div className="escenario">
            <div className="escenario-luces" aria-hidden="true" />
            <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
                <defs>
                    <linearGradient id="degrade-corazon" x1="0" y1="1" x2="1" y2="0">
                        <stop offset="0" stopColor="#ff8a3d" />
                        <stop offset=".5" stopColor="#ff3d77" />
                        <stop offset="1" stopColor="#8b3dff" />
                    </linearGradient>
                </defs>
            </svg>

            <section className="intro">
                <span className="etiqueta">TP · EFSI — React Context</span>
                <h1>
                    Un estado,
                    <br />
                    <em>todas</em> las pantallas.
                </h1>
                <p>
                    Clon de Instagram donde la sesión, el tema y tus interacciones viven en <b>React Context</b> y se comparten
                    entre pantallas sin pasar props de mano en mano.
                </p>
                <ol className="arbol">
                    <li>
                        <code>&lt;TemaProvider&gt;</code>
                    </li>
                    <li>
                        <code>&lt;AuthProvider&gt;</code>
                    </li>
                    <li>
                        <code>&lt;PublicacionesProvider&gt;</code>
                    </li>
                    <li>
                        <code>&lt;App /&gt;</code>
                    </li>
                </ol>
                <p className="intro-tip">
                    <b>Probá:</b> dale doble click a una foto, guardala y cambiá de pantalla. El contador, tu perfil y el
                    inspector se actualizan solos.
                </p>
            </section>

            <div className="telefono">
                <div className="telefono-pantalla">
                    <BarraEstado />
                    <span className="isla" aria-hidden="true" />
                    <div className="telefono-contenido">{children}</div>
                    <div id="capa-telefono" />
                    <span className="indicador-inicio" aria-hidden="true" />
                </div>
            </div>

            <InspectorContext />
        </div>
    );
}
