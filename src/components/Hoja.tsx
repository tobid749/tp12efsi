import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Icono from './Icono';

interface Props {
    titulo?: string;
    alCerrar: () => void;
    children: ReactNode;
}

/** Bottom sheet que se abre "dentro del celular" (portal a #capa-telefono). */
export default function Hoja({ titulo, alCerrar, children }: Props) {
    useEffect(() => {
        const alTeclear = (e: KeyboardEvent) => e.key === 'Escape' && alCerrar();
        window.addEventListener('keydown', alTeclear);
        return () => window.removeEventListener('keydown', alTeclear);
    }, [alCerrar]);

    const destino = document.getElementById('capa-telefono') ?? document.body;

    return createPortal(
        <div className="hoja-capa" role="dialog" aria-modal="true" aria-label={titulo}>
            <div className="hoja-fondo" onClick={alCerrar} />
            <div className="hoja">
                <div className="hoja-manija" />
                <div className="hoja-cabecera">
                    <h2>{titulo}</h2>
                    <button type="button" className="icono-btn" onClick={alCerrar} aria-label="Cerrar">
                        <Icono nombre="cerrar" tam={22} />
                    </button>
                </div>
                {children}
            </div>
        </div>,
        destino
    );
}
