import type { SVGProps } from 'react';

const trazos = {
    inicio: <path d="M3.5 10.2 12 3.5l8.5 6.7V19a1.5 1.5 0 0 1-1.5 1.5h-4.2v-6h-5.6v6H5A1.5 1.5 0 0 1 3.5 19z" />,
    buscar: (
        <>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.6-3.6" />
        </>
    ),
    corazon: (
        <path d="M12 20.3s-7.6-4.6-9.3-9.3C1.5 7.8 3.5 4.3 7 4.3c2.1 0 3.6 1.1 5 3 1.4-1.9 2.9-3 5-3 3.5 0 5.5 3.5 4.3 6.7-1.7 4.7-9.3 9.3-9.3 9.3z" />
    ),
    comentario: <path d="M20.5 11.6a8.5 8.5 0 0 1-12.4 7.6l-4.6 1.3 1.4-4.4a8.5 8.5 0 1 1 15.6-4.5z" />,
    enviar: (
        <>
            <path d="M21.5 2.5 10.6 13.4" />
            <path d="m21.5 2.5-6.8 19-4.1-8.1-8.1-4.1z" />
        </>
    ),
    guardar: <path d="M18.5 20.5 12 16l-6.5 4.5V5A1.5 1.5 0 0 1 7 3.5h10A1.5 1.5 0 0 1 18.5 5z" />,
    sol: (
        <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2.5v2M12 19.5v2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M2.5 12h2M19.5 12h2M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
        </>
    ),
    luna: <path d="M20.3 14.6A8.3 8.3 0 0 1 9.4 3.7a8.5 8.5 0 1 0 10.9 10.9z" />,
    salir: (
        <>
            <path d="M15 3.5h3A2.5 2.5 0 0 1 20.5 6v12a2.5 2.5 0 0 1-2.5 2.5h-3" />
            <path d="m10 16.5-4.5-4.5L10 7.5M5.5 12H15" />
        </>
    ),
    grilla: (
        <>
            <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
            <path d="M3.5 9.2h17M3.5 14.8h17M9.2 3.5v17M14.8 3.5v17" />
        </>
    ),
    cerrar: <path d="M6 6l12 12M18 6 6 18" />,
    ubicacion: (
        <>
            <path d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0 1 13 0c0 5.2-6.5 11-6.5 11z" />
            <circle cx="12" cy="10" r="2.3" />
        </>
    ),
    mas: <path d="M12 5v14M5 12h14" />,
    flecha: <path d="M5 12h14M13 6l6 6-6 6" />,
    usuario: (
        <>
            <circle cx="12" cy="8" r="4" />
            <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
        </>
    ),
    candado: (
        <>
            <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
            <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
        </>
    ),
    check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
    editar: (
        <>
            <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z" />
            <path d="m13.5 6.5 4 4" />
        </>
    ),
    destello: <path d="M12 3c.6 4.4 2.6 6.4 7 7-4.4.6-6.4 2.6-7 7-.6-4.4-2.6-6.4-7-7 4.4-.6 6.4-2.6 7-7z" />
};

export type NombreIcono = keyof typeof trazos;

interface Props extends SVGProps<SVGSVGElement> {
    nombre: NombreIcono;
    tam?: number;
    relleno?: boolean;
}

export default function Icono({ nombre, tam = 24, relleno = false, ...resto }: Props) {
    return (
        <svg
            width={tam}
            height={tam}
            viewBox="0 0 24 24"
            fill={relleno ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...resto}
        >
            {trazos[nombre]}
        </svg>
    );
}
