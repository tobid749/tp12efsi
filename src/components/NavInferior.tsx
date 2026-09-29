import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { PublicacionesContext } from '../context/PublicacionesContext';
import Avatar from './Avatar';
import Icono from './Icono';

export default function NavInferior() {
    const { usuario } = useContext(AuthContext);
    const { totales } = useContext(PublicacionesContext);

    const clase = ({ isActive }: { isActive: boolean }) => `nav-item ${isActive ? 'activo' : ''}`;

    return (
        <nav className="nav-inferior" aria-label="Navegación principal">
            <NavLink to="/" end className={clase} aria-label="Inicio">
                {({ isActive }) => <Icono nombre="inicio" relleno={isActive} tam={25} />}
            </NavLink>
            <NavLink to="/explorar" className={clase} aria-label="Explorar">
                {({ isActive }) => <Icono nombre="buscar" tam={25} strokeWidth={isActive ? 2.6 : 1.8} />}
            </NavLink>
            <NavLink to="/guardados" className={clase} aria-label={`Guardados (${totales.guardadas})`}>
                {({ isActive }) => (
                    <>
                        <Icono nombre="guardar" relleno={isActive} tam={24} />
                        {totales.guardadas > 0 && (
                            <span key={totales.guardadas} className="insignia">
                                {totales.guardadas}
                            </span>
                        )}
                    </>
                )}
            </NavLink>
            <NavLink to="/perfil" className={clase} aria-label="Perfil">
                {usuario && <Avatar src={usuario.foto} alt={usuario.nombre} tam={27} />}
            </NavLink>
        </nav>
    );
}
