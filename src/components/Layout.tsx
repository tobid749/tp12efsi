import { Outlet, useLocation } from 'react-router-dom';
import NavInferior from './NavInferior';

export default function Layout() {
    const { pathname } = useLocation();

    return (
        <div className="app">
            {/* key: cada pantalla monta de cero (arranca arriba y con su animación de entrada) */}
            <main className="pantalla" key={pathname}>
                <Outlet />
            </main>
            <NavInferior />
        </div>
    );
}
