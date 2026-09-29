import { useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { PublicacionesContext } from './PublicacionesContext';
import { AuthContext } from './AuthContext';
import { publicaciones as publicacionesBase } from '../Data/Publicaciones';
import type { Comentario, PublicacionConEstado } from '../Types/Index';

/** Lo que hizo el usuario logueado sobre las publicaciones. */
interface Interacciones {
    dueño: string | null;
    meGusta: string[];
    guardadas: string[];
    comentarios: Record<string, Comentario[]>;
}

const clave = (dueño: string) => `momentos:interacciones:${dueño}`;

function cargar(dueño: string | null): Interacciones {
    const vacio: Interacciones = { dueño, meGusta: [], guardadas: [], comentarios: {} };
    if (!dueño) return vacio;
    try {
        const guardado = localStorage.getItem(clave(dueño));
        if (guardado) return { ...vacio, ...(JSON.parse(guardado) as Omit<Interacciones, 'dueño'>), dueño };
    } catch {
        /* sin storage */
    }
    return vacio;
}

const alternar = (lista: string[], id: string) =>
    lista.includes(id) ? lista.filter((x) => x !== id) : [...lista, id];

export function PublicacionesProvider({ children }: { children: ReactNode }) {
    // Este Provider consume otro Context: las interacciones son de CADA usuario
    const { usuario } = useContext(AuthContext);
    const dueño = usuario?.usuario ?? null;

    const [estado, setEstado] = useState<Interacciones>(() => cargar(dueño));

    // Si cambia quién está logueado, cargamos sus likes/guardados
    if (estado.dueño !== dueño) {
        setEstado(cargar(dueño));
    }

    useEffect(() => {
        if (!estado.dueño) return;
        const { meGusta, guardadas, comentarios } = estado;
        try {
            localStorage.setItem(clave(estado.dueño), JSON.stringify({ meGusta, guardadas, comentarios }));
        } catch {
            /* sin storage */
        }
    }, [estado]);

    const alternarMeGusta = useCallback((id: string) => {
        setEstado((e) => ({ ...e, meGusta: alternar(e.meGusta, id) }));
    }, []);

    const darMeGusta = useCallback((id: string) => {
        setEstado((e) => (e.meGusta.includes(id) ? e : { ...e, meGusta: [...e.meGusta, id] }));
    }, []);

    const alternarGuardado = useCallback((id: string) => {
        setEstado((e) => ({ ...e, guardadas: alternar(e.guardadas, id) }));
    }, []);

    const comentar = useCallback(
        (id: string, texto: string) => {
            const limpio = texto.trim();
            if (!limpio || !dueño) return;
            const nuevo: Comentario = { id: `c-${Date.now()}`, usuario: dueño, texto: limpio };
            setEstado((e) => ({
                ...e,
                comentarios: { ...e.comentarios, [id]: [...(e.comentarios[id] ?? []), nuevo] }
            }));
        },
        [dueño]
    );

    const publicaciones = useMemo<PublicacionConEstado[]>(
        () =>
            publicacionesBase.map((p) => {
                const meGusta = estado.meGusta.includes(p.id);
                return {
                    ...p,
                    meGusta,
                    guardada: estado.guardadas.includes(p.id),
                    likes: p.likes + (meGusta ? 1 : 0),
                    comentarios: [...p.comentarios, ...(estado.comentarios[p.id] ?? [])]
                };
            }),
        [estado]
    );

    const guardadas = useMemo(
        () =>
            [...estado.guardadas]
                .reverse()
                .map((id) => publicaciones.find((p) => p.id === id))
                .filter((p): p is PublicacionConEstado => Boolean(p)),
        [estado.guardadas, publicaciones]
    );

    const totales = useMemo(
        () => ({
            meGusta: estado.meGusta.length,
            guardadas: estado.guardadas.length,
            comentarios: Object.values(estado.comentarios).reduce((n, lista) => n + lista.length, 0)
        }),
        [estado]
    );

    const value = useMemo(
        () => ({ publicaciones, guardadas, totales, alternarMeGusta, darMeGusta, alternarGuardado, comentar }),
        [publicaciones, guardadas, totales, alternarMeGusta, darMeGusta, alternarGuardado, comentar]
    );

    return <PublicacionesContext.Provider value={value}>{children}</PublicacionesContext.Provider>;
}
