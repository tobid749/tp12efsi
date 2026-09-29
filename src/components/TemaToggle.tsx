import { useContext } from 'react';
import { TemaContext } from '../context/TemaContext';
import Icono from './Icono';

export default function TemaToggle() {
    const { esOscuro, alternarTema } = useContext(TemaContext);

    return (
        <button
            type="button"
            className={`tema-toggle ${esOscuro ? 'oscuro' : ''}`}
            onClick={alternarTema}
            role="switch"
            aria-checked={esOscuro}
            aria-label="Modo oscuro"
            title={esOscuro ? 'Pasar a modo claro' : 'Pasar a modo oscuro'}
        >
            <span className="tema-toggle-perilla">
                <Icono nombre={esOscuro ? 'luna' : 'sol'} tam={15} strokeWidth={2.2} />
            </span>
        </button>
    );
}
