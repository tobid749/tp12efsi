import type { Publicacion } from '../Types/Index';

const foto = (id: number) => `https://picsum.photos/id/${id}/900/1125`;

export const publicaciones: Publicacion[] = [
    {
        id: 'p1',
        imagen: foto(1015),
        usuario: '@lu.viaja',
        descripcion: 'Hay lugares que te acomodan el alma. Volvería mañana mismo, con la misma mochila y las mismas ganas.',
        likes: 2341,
        ubicacion: 'Patagonia, Argentina',
        tiempo: '2 h',
        categoria: 'viajes',
        comentarios: [
            { id: 'c1', usuario: '@sofi.ramos', texto: 'Qué colores 😍' },
            { id: 'c2', usuario: '@nico.runs', texto: 'Ruta para correr ahí YA' },
            { id: 'c3', usuario: '@tobi.dev', texto: 'Guardadísimo para las vacaciones' }
        ]
    },
    {
        id: 'p2',
        imagen: foto(1060),
        usuario: '@tobi.dev',
        descripcion: 'Café, teclado mecánico y un bug que no se deja encontrar. Lunes de manual ☕',
        likes: 418,
        ubicacion: 'Palermo, CABA',
        tiempo: '4 h',
        categoria: 'foto',
        comentarios: [
            { id: 'c4', usuario: '@cami.draws', texto: 'El bug siempre gana los lunes' },
            { id: 'c5', usuario: '@martin.cocina', texto: '¿Ese café dónde es?' }
        ]
    },
    {
        id: 'p3',
        imagen: foto(1080),
        usuario: '@martin.cocina',
        descripcion: 'Frutillas de estación → tarta del domingo. Receta completa en comentarios 🍓',
        likes: 876,
        ubicacion: 'Villa Crespo',
        tiempo: '6 h',
        categoria: 'comida',
        comentarios: [{ id: 'c6', usuario: '@lu.viaja', texto: 'Paso a buscar una porción' }]
    },
    {
        id: 'p4',
        imagen: foto(1025),
        usuario: '@cami.draws',
        descripcion: 'Modelo del día. No cobró, pero pidió snacks 🐶',
        likes: 3210,
        tiempo: '8 h',
        categoria: 'arte',
        comentarios: [
            { id: 'c7', usuario: '@tobi.dev', texto: 'Contratado inmediatamente' },
            { id: 'c8', usuario: '@sofi.ramos', texto: 'La mirada 😂' }
        ]
    },
    {
        id: 'p5',
        imagen: foto(1011),
        usuario: '@sofi.ramos',
        descripcion: 'Rollo nuevo, luz de las 7 de la tarde. Nada más que agregar.',
        likes: 1184,
        ubicacion: 'Tigre, Buenos Aires',
        tiempo: '10 h',
        categoria: 'foto',
        comentarios: []
    },
    {
        id: 'p6',
        imagen: foto(1018),
        usuario: '@nico.runs',
        descripcion: '21K entre montañas. Piernas: destruidas. Cabeza: nueva.',
        likes: 512,
        ubicacion: 'Bariloche',
        tiempo: '12 h',
        categoria: 'deporte',
        comentarios: [{ id: 'c9', usuario: '@lu.viaja', texto: '¡Crack! 🏃‍♂️' }]
    },
    {
        id: 'p7',
        imagen: foto(1067),
        usuario: '@tobi.dev',
        descripcion: 'La ciudad también tiene su geometría. Caminata post-deploy.',
        likes: 287,
        ubicacion: 'Microcentro, CABA',
        tiempo: '1 d',
        categoria: 'diseño',
        comentarios: []
    },
    {
        id: 'p8',
        imagen: foto(1035),
        usuario: '@lu.viaja',
        descripcion: 'Encontramos esta cascada de casualidad: sin cartel, sin camino, sin nadie.',
        likes: 4120,
        ubicacion: 'Misiones',
        tiempo: '1 d',
        categoria: 'viajes',
        comentarios: [{ id: 'c10', usuario: '@martin.cocina', texto: 'Paraíso' }]
    },
    {
        id: 'p9',
        imagen: foto(1074),
        usuario: '@cami.draws',
        descripcion: 'Estudio de luz para una ilustración nueva. ¿Qué les parece?',
        likes: 2780,
        tiempo: '2 d',
        categoria: 'arte',
        comentarios: []
    },
    {
        id: 'p10',
        imagen: foto(292),
        usuario: '@martin.cocina',
        descripcion: 'Mise en place: el 80% de cocinar bien es esto.',
        likes: 690,
        ubicacion: 'Mi cocina',
        tiempo: '2 d',
        categoria: 'comida',
        comentarios: []
    },
    {
        id: 'p11',
        imagen: foto(1043),
        usuario: '@sofi.ramos',
        descripcion: 'Paseo sin rumbo, que siempre termina siendo el mejor rumbo.',
        likes: 1502,
        ubicacion: 'San Telmo',
        tiempo: '3 d',
        categoria: 'foto',
        comentarios: []
    },
    {
        id: 'p12',
        imagen: foto(1039),
        usuario: '@tobi.dev',
        descripcion: 'Desconectar también es parte del trabajo.',
        likes: 356,
        ubicacion: 'Córdoba',
        tiempo: '4 d',
        categoria: 'viajes',
        comentarios: [{ id: 'c11', usuario: '@nico.runs', texto: 'Bien ahí 🙌' }]
    },
    {
        id: 'p13',
        imagen: foto(1050),
        usuario: '@sofi.ramos',
        descripcion: 'Azul sobre azul.',
        likes: 980,
        ubicacion: 'Mar del Plata',
        tiempo: '5 d',
        categoria: 'foto',
        comentarios: []
    }
];

export const categorias = ['viajes', 'foto', 'comida', 'diseño', 'arte', 'deporte'] as const;
