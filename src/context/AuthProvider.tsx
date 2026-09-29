import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { AuthContext, type AuthContextValue } from './AuthContext';
import { buscarUsuario } from '../Data/Usuarios';
import type { Usuario } from '../Types/Index';

const CLAVE = 'momentos:sesion';

function leerSesion(): Usuario | null {
    try {
        const guardada = localStorage.getItem(CLAVE);
        return guardada ? (JSON.parse(guardada) as Usuario) : null;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(leerSesion);

    // La sesión sobrevive a un F5
    useEffect(() => {
        try {
            if (usuario) localStorage.setItem(CLAVE, JSON.stringify(usuario));
            else localStorage.removeItem(CLAVE);
        } catch {
            /* modo incógnito / storage bloqueado: la app sigue funcionando */
        }
    }, [usuario]);

    const iniciarSesion = useCallback((handle: string) => {
        const normalizado = '@' + handle.trim().replace(/^@/, '').toLowerCase();
        setUsuario(buscarUsuario(normalizado));
    }, []);

    const cerrarSesion = useCallback(() => setUsuario(null), []);

    const actualizarPerfil = useCallback<AuthContextValue['actualizarPerfil']>((cambios) => {
        setUsuario((actual) => (actual ? { ...actual, ...cambios } : actual));
    }, []);

    const value = useMemo(
        () => ({ usuario, iniciarSesion, cerrarSesion, actualizarPerfil }),
        [usuario, iniciarSesion, cerrarSesion, actualizarPerfil]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
