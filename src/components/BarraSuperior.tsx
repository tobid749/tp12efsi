import type { ReactNode } from 'react';

interface Props {
    izquierda: ReactNode;
    derecha?: ReactNode;
}

export default function BarraSuperior({ izquierda, derecha }: Props) {
    return (
        <header className="barra-superior">
            <div className="barra-superior-izq">{izquierda}</div>
            {derecha && <div className="barra-superior-der">{derecha}</div>}
        </header>
    );
}

export function Logo({ grande = false }: { grande?: boolean }) {
    return (
        <span className={`logo ${grande ? 'grande' : ''}`}>
            Momentos<span className="logo-punto">.</span>
        </span>
    );
}
