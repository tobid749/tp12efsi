import { createContext } from 'react';
import type { PublicacionConEstado } from '../Types/Index';

export interface PublicacionesContextValue {
    /** Todas las publicaciones, con meGusta/guardada/comentarios del usuario logueado aplicados. */
    publicaciones: PublicacionConEstado[];
    /** Publicaciones guardadas, de la más reciente a la más vieja. */
    guardadas: PublicacionConEstado[];
    totales: { meGusta: number; guardadas: number; comentarios: number };
    alternarMeGusta: (id: string) => void;
    /** Solo suma el like (doble tap): nunca lo saca. */
    darMeGusta: (id: string) => void;
    alternarGuardado: (id: string) => void;
    comentar: (id: string, texto: string) => void;
}

export const PublicacionesContext = createContext<PublicacionesContextValue>({
    publicaciones: [],
    guardadas: [],
    totales: { meGusta: 0, guardadas: 0, comentarios: 0 },
    alternarMeGusta: () => {},
    darMeGusta: () => {},
    alternarGuardado: () => {},
    comentar: () => {}
});
