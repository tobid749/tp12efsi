import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { sinArroba } from '../Data/Usuarios';
import type { Usuario } from '../Types/Index';
import Avatar from './Avatar';
import Icono from './Icono';

const DURACION = 4500;
const imagenes = [1016, 1019, 1036, 1047, 1069, 1084];

interface Props {
    usuarios: Usuario[];
    inicio: number;
    alVer: (handle: string) => void;
    alCerrar: () => void;
}

export default function VisorHistoria({ usuarios, inicio, alVer, alCerrar }: Props) {
    const [indice, setIndice] = useState(inicio);
    const actual = usuarios[indice];

    const siguiente = () => (indice < usuarios.length - 1 ? setIndice(indice + 1) : alCerrar());
    const anterior = () => setIndice(Math.max(0, indice - 1));

    useEffect(() => {
        alVer(actual.usuario);
        const t = setTimeout(() => {
            if (indice < usuarios.length - 1) setIndice(indice + 1);
            else alCerrar();
        }, DURACION);
        return () => clearTimeout(t);
    }, [indice, actual.usuario, usuarios.length, alVer, alCerrar]);

    const destino = document.getElementById('capa-telefono') ?? document.body;

    return createPortal(
        <div className="visor-historia" role="dialog" aria-modal="true" aria-label={`Historia de ${actual.nombre}`}>
            <img
                key={actual.usuario}
                className="visor-imagen"
                src={`https://picsum.photos/id/${imagenes[indice % imagenes.length]}/720/1280`}
                alt=""
            />
            <div className="visor-barras">
                {usuarios.map((u, i) => (
                    <span key={u.usuario} className="visor-barra">
                        <span
                            key={i === indice ? `activa-${indice}` : u.usuario}
                            className={i < indice ? 'llena' : i === indice ? 'activa' : ''}
                            style={{ animationDuration: `${DURACION}ms` }}
                        />
                    </span>
                ))}
            </div>
            <header className="visor-cabecera">
                <Avatar src={actual.foto} alt={actual.nombre} tam={34} />
                <strong>{sinArroba(actual.usuario)}</strong>
                <span>{indice + 2} h</span>
                <button type="button" className="icono-btn" onClick={alCerrar} aria-label="Cerrar historia">
                    <Icono nombre="cerrar" tam={26} />
                </button>
            </header>
            <button type="button" className="visor-zona izq" onClick={anterior} aria-label="Historia anterior" />
            <button type="button" className="visor-zona der" onClick={siguiente} aria-label="Historia siguiente" />
        </div>,
        destino
    );
}
