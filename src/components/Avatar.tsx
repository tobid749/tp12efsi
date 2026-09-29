interface Props {
    src: string;
    alt: string;
    tam?: number;
    /** Anillo con el degradé de "historia sin ver". */
    anillo?: boolean;
    visto?: boolean;
}

export default function Avatar({ src, alt, tam = 32, anillo = false, visto = false }: Props) {
    const img = <img className="avatar" src={src} alt={alt} width={tam} height={tam} style={{ width: tam, height: tam }} />;
    if (!anillo) return img;
    return <span className={`anillo ${visto ? 'visto' : ''}`}>{img}</span>;
}
