import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { PublicacionesProvider } from './context/PublicacionesProvider';
import { TemaProvider } from './context/TemaProvider';
import Escenario from './components/Escenario';
import Layout from './components/Layout';
import RutaProtegida from './components/RutaProtegida';
import Explorar from './pages/Explorar';
import Guardados from './pages/Guardados';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Perfil from './pages/Perfil';

export default function App() {
    return (
        // Los Providers envuelven TODA la app: cualquier pantalla puede leerlos con useContext.
        // PublicacionesProvider va adentro de AuthProvider porque guarda los likes de CADA usuario.
        <TemaProvider>
            <AuthProvider>
                <PublicacionesProvider>
                    <HashRouter>
                        <Escenario>
                            <Routes>
                                <Route path="/login" element={<Login />} />
                                <Route
                                    element={
                                        <RutaProtegida>
                                            <Layout />
                                        </RutaProtegida>
                                    }
                                >
                                    <Route index element={<Inicio />} />
                                    <Route path="explorar" element={<Explorar />} />
                                    <Route path="guardados" element={<Guardados />} />
                                    <Route path="perfil" element={<Perfil />} />
                                </Route>
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                        </Escenario>
                    </HashRouter>
                </PublicacionesProvider>
            </AuthProvider>
        </TemaProvider>
    );
}
