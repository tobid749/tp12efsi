import { createContext } from 'react';
import type { Tema } from '../Types/Index';

export interface TemaContextValue {
    tema: Tema;
    esOscuro: boolean;
    alternarTema: () => void;
}

export const TemaContext = createContext<TemaContextValue>({
    tema: 'claro',
    esOscuro: false,
    alternarTema: () => {}
});
