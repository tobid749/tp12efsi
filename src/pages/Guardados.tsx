import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PublicacionesContext } from '../context/PublicacionesContext';
import BarraSuperior from '../components/BarraSuperior';
import GrillaPublicaciones from '../components/GrillaPublicaciones';
import Icono from '../components/Icono';

export default function Guardados() {
    const { guardadas } = useContext(PublicacionesContext);

    return (
        <>
            <BarraSuperior
                izquierda={
                    <div className="titulo-pantalla">
                        <h1>Guardados</h1>
                        <span>
                            {guardadas.length} {guardadas.length === 1 ? 'publicación' : 'publicaciones'}
                        </span>
                    </div>
                }
            />

            {guardadas.length > 0 ? (
                <>
                    <div className="coleccion-portada">
                        {guardadas.slice(0, 3).map((p) => (
                            <img key={p.id} src={p.imagen.replace('/900/1125', '/400/400')} alt="" />
                        ))}
                        <div className="coleccion-texto">
                            <span>Colección</span>
                            <strong>Todo lo guardado</strong>
                        </div>
                    </div>
                    <GrillaPublicaciones publicaciones={guardadas} />
                </>
            ) : (
                <div className="vacio">
                    <span className="vacio-icono">
                        <Icono nombre="guardar" tam={34} />
                    </span>
                    <h3>Guardá lo que te inspira</h3>
                    <p>Tocá el marcador de cualquier publicación y va a aparecer acá, en tu perfil y en el contador.</p>
                    <Link to="/" className="btn btn-primario">
                        Ir al inicio
                    </Link>
                </div>
            )}
        </>
    );
}
