import { useContext, useState } from 'react';
import { PublicacionesContext } from '../context/PublicacionesContext';
import { categorias } from '../Data/Publicaciones';
import { buscarUsuario } from '../Data/Usuarios';
import type { Categoria } from '../Types/Index';
import BarraSuperior from '../components/BarraSuperior';
import GrillaPublicaciones from '../components/GrillaPublicaciones';
import Icono from '../components/Icono';

const normalizar = (s: string) =>
    s
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

export default function Explorar() {
    const { publicaciones } = useContext(PublicacionesContext);
    const [busqueda, setBusqueda] = useState('');
    const [categoria, setCategoria] = useState<Categoria | null>(null);

    const q = normalizar(busqueda.trim());
    const resultados = publicaciones.filter((p) => {
        if (categoria && p.categoria !== categoria) return false;
        if (!q) return true;
        const autor = buscarUsuario(p.usuario);
        return normalizar(`${p.descripcion} ${p.ubicacion ?? ''} ${autor.usuario} ${autor.nombre}`).includes(q);
    });

    return (
        <>
            <BarraSuperior
                izquierda={
                    <label className="buscador">
                        <Icono nombre="buscar" tam={18} />
                        <input
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="Buscar personas, lugares…"
                            aria-label="Buscar"
                        />
                        {busqueda && (
                            <button type="button" onClick={() => setBusqueda('')} aria-label="Borrar búsqueda">
                                <Icono nombre="cerrar" tam={16} />
                            </button>
                        )}
                    </label>
                }
            />

            <div className="chips" role="toolbar" aria-label="Categorías">
                <button type="button" className={`chip ${categoria === null ? 'activo' : ''}`} onClick={() => setCategoria(null)}>
                    Para vos
                </button>
                {categorias.map((c) => (
                    <button
                        key={c}
                        type="button"
                        className={`chip ${categoria === c ? 'activo' : ''}`}
                        onClick={() => setCategoria(categoria === c ? null : c)}
                    >
                        {c[0].toUpperCase() + c.slice(1)}
                    </button>
                ))}
            </div>

            {resultados.length > 0 ? (
                <GrillaPublicaciones publicaciones={resultados} mosaico />
            ) : (
                <div className="vacio">
                    <span className="vacio-icono">
                        <Icono nombre="buscar" tam={34} />
                    </span>
                    <h3>Sin resultados</h3>
                    <p>Probá con otra palabra o sacá el filtro de categoría.</p>
                </div>
            )}
        </>
    );
}
