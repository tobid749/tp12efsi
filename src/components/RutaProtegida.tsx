import { useContext, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/** Sin sesión no hay feed: cualquier pantalla privada redirige al login. */
export default function RutaProtegida({ children }: { children: ReactNode }) {
    const { usuario } = useContext(AuthContext);
    if (!usuario) return <Navigate to="/login" replace />;
    return children;
}
