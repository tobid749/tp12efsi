import type { Usuario } from '../Types/Index';
import usuario from './Usuario';

export const usuarios: Usuario[] = [
    usuario,
    {
        nombre: 'Sofía Ramos',
        usuario: '@sofi.ramos',
        foto: 'https://i.pravatar.cc/200?img=47',
        seguidores: '12,4K',
        seguidos: '318',
        publicaciones: 3,
        bio: 'Fotógrafa analógica · Buenos Aires 📷'
    },
    {
        nombre: 'Lucía Benítez',
        usuario: '@lu.viaja',
        foto: 'https://i.pravatar.cc/200?img=45',
        seguidores: '23,1K',
        seguidos: '780',
        publicaciones: 2,
        bio: 'Mochila, mapas y atardeceres 🌅'
    },
    {
        nombre: 'Martín Ferreyra',
        usuario: '@martin.cocina',
        foto: 'https://i.pravatar.cc/200?img=59',
        seguidores: '5.120',
        seguidos: '210',
        publicaciones: 2,
        bio: 'Cocina de autor · recetas los domingos'
    },
    {
        nombre: 'Camila Ortiz',
        usuario: '@cami.draws',
        foto: 'https://i.pravatar.cc/200?img=32',
        seguidores: '17,8K',
        seguidos: '640',
        publicaciones: 2,
        bio: 'Ilustradora · encargos por DM ✏️'
    },
    {
        nombre: 'Nicolás Paz',
        usuario: '@nico.runs',
        foto: 'https://i.pravatar.cc/200?img=68',
        seguidores: '3.900',
        seguidos: '420',
        publicaciones: 1,
        bio: 'Corro, entreno, repito.'
    }
];

/** Busca un usuario por su @. Si no existe (ej. alguien que se registró), arma uno genérico. */
export function buscarUsuario(handle: string): Usuario {
    const encontrado = usuarios.find((u) => u.usuario === handle);
    if (encontrado) return encontrado;
    const limpio = handle.replace(/^@/, '');
    return {
        nombre: limpio,
        usuario: handle,
        foto: `https://i.pravatar.cc/200?u=${encodeURIComponent(limpio)}`,
        seguidores: '0',
        seguidos: '0',
        publicaciones: 0,
        bio: ''
    };
}

/** "@tobi.dev" -> "tobi.dev" (como se muestra en posts y comentarios). */
export const sinArroba = (handle: string) => handle.replace(/^@/, '');
