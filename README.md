# Momentos — Clon de Instagram con React Context

TP de EFSI: **Gestión del estado global con React Context**, hecho sobre el TP 6 (Clon de Instagram).
React 19 + TypeScript + Vite + React Router.

```bash
npm install
npm run dev
```

Para entrar, usá una de las **cuentas demo** o cualquier usuario (3+ caracteres) y cualquier contraseña (4+ caracteres).

En pantallas de escritorio la app se muestra dentro de un iPhone y a la derecha hay un **Context Inspector** que muestra en vivo el valor de cada Context. Así se ve cómo un like o un cambio de tema impacta en toda la app al mismo tiempo. En el celular, la app ocupa toda la pantalla.

**Pantallas:** Login · Inicio (historias + feed) · Explorar (buscador + filtros) · Guardados · Perfil (editar perfil, modo oscuro, cerrar sesión).

---

## 1. Qué información se comparte a través de Context

La app tiene **tres Contexts**, cada uno con una responsabilidad:

| Context | Qué comparte |
|---|---|
| **AuthContext** | El **usuario logueado** (`usuario`: nombre, @, foto, bio, seguidores…) y las acciones `iniciarSesion`, `cerrarSesion` y `actualizarPerfil`. |
| **TemaContext** | La **preferencia de tema** (`tema: 'claro' \| 'oscuro'`, `esOscuro`) y la acción `alternarTema`. |
| **PublicacionesContext** | El **estado de las publicaciones para el usuario logueado**: a qué le dio me gusta, qué guardó (favoritos) y qué comentó. Expone `publicaciones`, `guardadas`, `totales` y las acciones `alternarMeGusta`, `darMeGusta` (doble tap), `alternarGuardado` y `comentar`. |

Todo se persiste en `localStorage`: la sesión y el tema sobreviven a un F5, y los likes/guardados se guardan **por usuario**.

## 2. Ruta y nombre de los archivos donde se crearon los Context

Cada Context está separado en dos archivos: donde se **crea** con `createContext` y donde vive el **Provider** con el estado.

| Context | `createContext` | Provider |
|---|---|---|
| AuthContext | [`src/context/AuthContext.ts`](src/context/AuthContext.ts) | [`src/context/AuthProvider.tsx`](src/context/AuthProvider.tsx) |
| TemaContext | [`src/context/TemaContext.ts`](src/context/TemaContext.ts) | [`src/context/TemaProvider.tsx`](src/context/TemaProvider.tsx) |
| PublicacionesContext | [`src/context/PublicacionesContext.ts`](src/context/PublicacionesContext.ts) | [`src/context/PublicacionesProvider.tsx`](src/context/PublicacionesProvider.tsx) |

## 3. Componente contenedor donde se ubicó el Provider

Los tres Providers están en **[`src/App.tsx`](src/App.tsx)** y envuelven **toda la aplicación** (router, pantallas y panel inspector):

```tsx
<TemaProvider>
  <AuthProvider>
    <PublicacionesProvider>
      <HashRouter>
        <Escenario>
          <Routes>…</Routes>
        </Escenario>
      </HashRouter>
    </PublicacionesProvider>
  </AuthProvider>
</TemaProvider>
```

El orden importa: `PublicacionesProvider` está **adentro** de `AuthProvider` porque él mismo hace `useContext(AuthContext)` para saber de qué usuario son los likes y guardados. Cuando cambia el usuario logueado, carga automáticamente sus interacciones.

## 4. Componentes que consumen la información con `useContext`

**AuthContext**
- `pages/Login.tsx`: llama a `iniciarSesion` y, si ya hay sesión, redirige al inicio.
- `components/RutaProtegida.tsx`: si `usuario` es `null`, manda a `/login`.
- `components/Historias.tsx`: muestra "Tu historia" con la foto del usuario y excluye su propia historia.
- `components/TarjetaPublicacion.tsx`: avatar y placeholder "Comentá como …" en el campo de comentario, y resalta tus comentarios.
- `components/NavInferior.tsx`: la foto del usuario en la pestaña de perfil.
- `pages/Perfil.tsx`: datos del perfil, `actualizarPerfil` (editar nombre/bio) y `cerrarSesion`.
- `context/PublicacionesProvider.tsx`: asocia las interacciones al usuario logueado.
- `components/InspectorContext.tsx`: muestra el valor en vivo.

**TemaContext**
- `components/TemaToggle.tsx`: el switch sol/luna (se usa en Login, Inicio y Perfil).
- `pages/Perfil.tsx`: la fila de ajuste "Modo oscuro · Activado/Desactivado".
- `components/InspectorContext.tsx`.

**PublicacionesContext**
- `pages/Inicio.tsx`: lista del feed.
- `components/TarjetaPublicacion.tsx`: me gusta, doble tap, guardar y comentar.
- `pages/Explorar.tsx`: búsqueda y filtro por categoría sobre las publicaciones.
- `pages/Guardados.tsx`: la colección de guardados.
- `pages/Perfil.tsx`: pestañas Posts / Guardados / Me gusta con sus contadores.
- `components/NavInferior.tsx`: la insignia con la cantidad de guardados.
- `components/GrillaPublicaciones.tsx`: abre la publicación "viva" en el modal.
- `components/InspectorContext.tsx`.

## 5. Por qué era necesario usar Context en este caso

- **Los mismos datos se usan en ramas muy distintas del árbol.** El usuario logueado lo necesitan el Login, la ruta protegida, las historias, cada tarjeta del feed, la barra de navegación y el perfil. Sin Context habría que bajarlo desde `App` por props atravesando `Layout`, `Inicio`, `Historias`, etc., componentes que **no lo usan** y solo lo pasarían (*prop drilling*).
- **Una acción en una pantalla tiene que reflejarse en otras al instante.** Si guardás una foto en el feed, tienen que actualizarse a la vez la insignia de la barra inferior, la pantalla Guardados, la pestaña Guardados del perfil y la marca en la grilla de Explorar. Con el estado en un único `PublicacionesContext` hay **una sola fuente de verdad** y todos se re-renderizan juntos, sin copiar estado entre pantallas.
- **Es estado que sobrevive a la navegación.** Cada pantalla se desmonta al cambiar de ruta. Si los likes vivieran en el estado local de `Inicio`, se perderían al ir a Explorar. Como los Providers están por encima del router, el estado persiste mientras navegás.
- **El tema es global por naturaleza.** Afecta a toda la interfaz. El Provider marca `data-tema` en `<html>` y los colores cambian vía variables CSS, así que solo los componentes que *controlan* el tema necesitan leerlo.
- **Separar en tres Contexts evita renders innecesarios y ordena responsabilidades.** Cambiar el tema no toca la sesión, y dar like no toca el tema. Los `value` están memorizados con `useMemo` y las acciones con `useCallback`, así los consumidores solo se re-renderizan cuando cambia lo que usan.

---

## Estructura

```
src/
├── App.tsx                 ← Providers + rutas
├── context/                ← createContext (*.ts) y Providers (*.tsx)
├── components/             ← TarjetaPublicacion, Historias, NavInferior, TemaToggle, Hoja, InspectorContext…
├── pages/                  ← Login, Inicio, Explorar, Guardados, Perfil
├── Data/                   ← Usuario (Tobias), Usuarios, Publicaciones
└── Types/Index.ts          ← Usuario, Publicacion, Comentario, Tema
```
