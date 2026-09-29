import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { sinArroba, usuarios } from '../Data/Usuarios';
import Avatar from './Avatar';
import Icono from './Icono';
import VisorHistoria from './VisorHistoria';

export default function Historias() {
    const { usuario } = useContext(AuthContext);
    const [abierta, setAbierta] = useState<number | null>(null);
    const [vistas, setVistas] = useState<string[]>([]);

    // Las historias son de los DEMÁS: el usuario logueado sale del Context
    const otros = usuarios.filter((u) => u.usuario !== usuario?.usuario);

    const marcarVista = useCallback(
        (handle: string) => setVistas((v) => (v.includes(handle) ? v : [...v, handle])),
        []
    );
    const cerrar = useCallback(() => setAbierta(null), []);

    return (
        <>
            <div className="historias">
                {usuario && (
                    <div className="historia">
                        <span className="historia-propia">
                            <Avatar src={usuario.foto} alt={usuario.nombre} tam={62} />
                            <span className="historia-mas">
                                <Icono nombre="mas" tam={13} strokeWidth={3} />
                            </span>
                        </span>
                        <span className="historia-nombre">Tu historia</span>
                    </div>
                )}
                {otros.map((u, i) => (
                    <button key={u.usuario} type="button" className="historia" onClick={() => setAbierta(i)}>
                        <Avatar src={u.foto} alt={u.nombre} tam={62} anillo visto={vistas.includes(u.usuario)} />
                        <span className="historia-nombre">{sinArroba(u.usuario)}</span>
                    </button>
                ))}
            </div>

            {abierta !== null && (
                <VisorHistoria
                    usuarios={otros}
                    inicio={abierta}
                    alVer={marcarVista}
                    alCerrar={cerrar}
                />
            )}
        </>
    );
}
