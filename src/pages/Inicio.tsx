import { useContext } from 'react';
import { PublicacionesContext } from '../context/PublicacionesContext';
import BarraSuperior, { Logo } from '../components/BarraSuperior';
import Historias from '../components/Historias';
import Icono from '../components/Icono';
import TarjetaPublicacion from '../components/TarjetaPublicacion';
import TemaToggle from '../components/TemaToggle';

export default function Inicio() {
    const { publicaciones } = useContext(PublicacionesContext);

    return (
        <>
            <BarraSuperior izquierda={<Logo />} derecha={<TemaToggle />} />
            <Historias />
            <section className="feed">
                {publicaciones.map((p) => (
                    <TarjetaPublicacion key={p.id} publicacion={p} />
                ))}
            </section>
            <div className="fin-feed">
                <span className="fin-feed-icono">
                    <Icono nombre="check" tam={26} strokeWidth={2.4} />
                </span>
                <strong>Estás al día</strong>
                <p>Ya viste todas las publicaciones nuevas.</p>
            </div>
        </>
    );
}
