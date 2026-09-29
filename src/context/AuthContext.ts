import { createContext } from 'react';
import type { Usuario } from '../Types/Index';

export interface AuthContextValue {
    /** Usuario logueado, o null si no hay sesión. */
    usuario: Usuario | null;
    iniciarSesion: (handle: string) => void;
    cerrarSesion: () => void;
    actualizarPerfil: (cambios: Partial<Pick<Usuario, 'nombre' | 'bio'>>) => void;
}

export const AuthContext = createContext<AuthContextValue>({
    usuario: null,
    iniciarSesion: () => {},
    cerrarSesion: () => {},
    actualizarPerfil: () => {}
});
