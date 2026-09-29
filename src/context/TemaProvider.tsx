import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { TemaContext } from './TemaContext';
import type { Tema } from '../Types/Index';

const CLAVE = 'momentos:tema';

function temaInicial(): Tema {
    try {
        const guardado = localStorage.getItem(CLAVE);
        if (guardado === 'claro' || guardado === 'oscuro') return guardado;
    } catch {
        /* sin storage */
    }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'oscuro' : 'claro';
}

export function TemaProvider({ children }: { children: ReactNode }) {
    const [tema, setTema] = useState<Tema>(temaInicial);

    // Los colores viven en variables CSS: alcanza con marcar el <html>
    useEffect(() => {
        document.documentElement.dataset.tema = tema;
        try {
            localStorage.setItem(CLAVE, tema);
        } catch {
            /* sin storage */
        }
    }, [tema]);

    const alternarTema = useCallback(() => setTema((t) => (t === 'oscuro' ? 'claro' : 'oscuro')), []);

    const value = useMemo(() => ({ tema, esOscuro: tema === 'oscuro', alternarTema }), [tema, alternarTema]);

    return <TemaContext.Provider value={value}>{children}</TemaContext.Provider>;
}
