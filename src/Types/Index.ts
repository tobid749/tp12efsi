export interface Usuario {
    nombre: string;
    usuario: string;
    foto: string;
    seguidores: string;
    seguidos: string;
    publicaciones: number;
    bio: string;
}

export interface Comentario {
    id: string;
    usuario: string;
    texto: string;
}

export type Categoria = 'viajes' | 'foto' | 'comida' | 'diseño' | 'arte' | 'deporte';

export interface Publicacion {
    id: string;
    imagen: string;
    usuario: string;
    descripcion: string;
    likes: number;
    comentarios: Comentario[];
    ubicacion?: string;
    tiempo: string;
    categoria: Categoria;
}

/** Publicación "enriquecida" con el estado del usuario logueado (sale del PublicacionesContext). */
export interface PublicacionConEstado extends Publicacion {
    meGusta: boolean;
    guardada: boolean;
}

export type Tema = 'claro' | 'oscuro';
