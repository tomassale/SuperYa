# SuperYa

App móvil en Expo / React Native para cargar productos durante la compra, ver el total, consultar las compras recientes y llevar una lista de compras. No usa cuenta, backend ni red: los datos viven en el celular.

## Puesta en marcha

Requisitos: Bun (el lockfile es `bun.lock`), Node y, para compilar, EAS CLI >= 16.18.0. `bun run android` y el build local además necesitan el SDK de Android.

Todos los comandos se corren en la raíz del repositorio.

```bash
bun install
bun run start     # expo start (Metro)
bun run android   # expo run:android; genera android/, ignorada por git
bun run web       # expo start --web
bun run lint      # expo lint
bunx tsc --noEmit # chequeo de tipos; no tiene script propio
```

No hay tests versionados ni runner de tests.

`bun run ios` existe (`expo run:ios`), pero `app.json` no define `ios.bundleIdentifier` y los scripts de build solo apuntan a Android.

### Builds de Android

| Script | Perfil | Dónde compila |
|---|---|---|
| `bun run build:apk` | `preview` | Servidores de EAS |
| `bun run build:apk:local` | `preview` | Máquina local (`--local`) |
| `bun run build:apk:prod` | `production` | Servidores de EAS |

| Perfil | Salida | ABIs | Notas |
|---|---|---|---|
| `development` | Sin `buildType` propio | `arm64-v8a`, `x86_64` | `developmentClient: true`; `expo-dev-client` no está en `package.json` |
| `preview` | APK, distribución interna | `arm64-v8a` | |
| `production` | APK (no AAB) | `arm64-v8a` | `autoIncrement: true`; la versión la lleva EAS (`appVersionSource: remote`) |

**Compatibilidad:** los APK de `preview` y `production` solo se instalan en dispositivos de 64 bits con `arm64-v8a`. No sirven para dispositivos de 32 bits ni para emuladores `x86_64`; para esos emuladores está `development`. El `minSdk` es 24 (Android 7.0), el valor por defecto de React Native 0.81, y `app.json` no lo cambia.

## Variables de entorno

La app no lee variables de entorno ni usa `.env`. La única variable se define por perfil en `eas.json`:

| Nombre | Propósito | Obligatoria |
|---|---|---|
| `ORG_GRADLE_PROJECT_reactNativeArchitectures` | ABIs que compila Gradle | Opcional |

## Arquitectura

```text
UI (app/, components/)
 |-- estado del carrito --> context/CartContext.tsx  (solo memoria)
 |-- calculadora -------> hooks/useCalculator.ts + utils/CalculatorUtils.tsx
 |-- lista --------------> utils/NotesUtils.ts   --+
 '-- historial ----------> utils/HistoryUtils.tsx -+
                                                   v
            database/connection.ts  apertura unica y cola de escritura
            database/queries.ts     inserts compartidos
            database/migrations.ts  esquema e importacion unica
            database/legacyStorage.ts  lectura de AsyncStorage
                                                   |
                                                   v
                                         SQLite: superya.db
```

| Ruta | Dónde vive | Qué hace |
|---|---|---|
| `/` | `app/index.tsx` | Formulario, historial, lista de compras, calculadora y acceso al carrito |
| `/Cart` | `app/Cart.tsx` | Edición del carrito, total y botón de finalizar |
| `/Finish` | `app/(tabs)/Finish.tsx` | Vacía el carrito, muestra la confirmación unos 3 s y vuelve a `/` |

| Carpeta | Contenido |
|---|---|
| `components/index/` | `form`, `history`, `shoppingList`, `calculator`, `cartIcon`, `notification` |
| `components/cart/` | Filas del carrito, total y botón de finalizar |
| `utils/` | Persistencia por función, operaciones del carrito, parseo y formato de números, escalado responsive |
| `constants/` | Colores, tamaños de fuente y vida útil de las compras |
| `interfaces/` | Tipos `Product`, `ArrayCart`, `History`, `NewPurchase` y `Note` |

### Modelo de datos

Base `superya.db`, esquema versionado con `PRAGMA user_version` (versión actual: 1).

| Tabla | Columnas | Observaciones |
|---|---|---|
| `notes` | `id`, `text`, `done`, `quantity` | Lista de compras; se lee en orden de inserción (`rowid`) |
| `purchases` | `id`, `date`, `hour`, `final_price`, `expires_at` | Índice sobre `expires_at` |
| `purchase_items` | `id`, `purchase_id`, `product_id`, `name`, `quantity`, `price` | `ON DELETE CASCADE` hacia `purchases`; índice sobre `purchase_id` |

## Stack

| Paquete | Versión | Para qué |
|---|---|---|
| `expo` | ~54.0.37 | SDK y herramientas |
| `react-native` | 0.81.5 | Runtime móvil |
| `react` | 19.1.0 | UI |
| `expo-router` | ~6.0.24 | Rutas por archivos |
| `expo-sqlite` | ~16.0.10 | Persistencia |
| `@react-native-async-storage/async-storage` | ^2.2.0 | Solo para importar datos viejos |
| `expo-build-properties` | ~1.0.10 | R8 y reducción de recursos en release |
| `react-native-keyboard-aware-scroll-view` | ^0.9.5 | Formulario y lista con teclado abierto |
| `react-native-web` | ^0.21.2 | Target web |
| `typescript` | ~5.9.3 | Tipado estricto |

## Decisiones no obvias

### Persistencia

- **Vencimiento**: cada compra vence a los 3 días de guardada (`PURCHASE_LIFETIME_MS`). Se purga al iniciar la app, antes de leer el historial y antes de guardar una compra. La lista de compras no vence.
- **Carrito**: vive solo en memoria y se pierde al cerrar la app.
- **Sin backup**: `allowBackup: false` desactiva el backup de Google, así que ni la lista ni el historial se restauran desde ahí. Si se cambia de celular, se pierden los dos.
- **Cola de escritura**: toda escritura pasa por `enqueueWrite`, porque Android ejecuta cada llamada en un pool de hilos y una podría entrar en medio de la transacción de otra. Las lecturas no pasan por la cola.
- **Conexión**: `getDatabase` comparte una sola apertura y reintenta en el próximo pedido si falla. Cada conexión activa `foreign_keys`, sin el cual no funciona la cascada, además de WAL y `synchronous = NORMAL`.
- **Importación única**: si `user_version` es menor a 1, se leen las claves `shoppingNotes` y `purchase` de AsyncStorage. Esquema, datos y versión entran en una sola transacción; si falla, se reintenta en el próximo arranque con los datos viejos intactos. AsyncStorage se limpia después del commit. Las compras ya vencidas no se importan.
- **Fallos**: un error de lectura o escritura se registra con `console.log` y la app sigue. La lectura devuelve una lista vacía y la pantalla de compra finalizada aparece aunque el guardado haya fallado.
- **Forma del historial**: `History.cart` sigue siendo una lista con un solo grupo, formada al leer desde las dos tablas.

### Interfaz y validación

- **Navegación**: el `Slot` de `app/_layout.tsx` renderiza solo la ruta activa. Al ir a `/Cart` se desmonta la home: se borra lo escrito en el formulario, y al volver se recargan lista e historial. Por eso el historial muestra la compra nueva sin refresco manual.
- **Vaciado del carrito**: se hace al montar `/Finish`, no en el botón. Si se vaciara en el botón, `Cart` lo desmontaría y cancelaría la navegación del `Link`.
- **Doble toque**: un `useRef` en `ButtonFinish` guarda la compra una sola vez.
- **Validación**: `ButtonAdd` exige nombre no vacío y cantidad y precio finitos mayores a 0. Marca en rojo cada campo inválido. Evita que un `NaN` rompa el total o el guardado.
- **Contextos separados**: `useCart` expone los datos y `useSetCartItems` el setter estable, para que quien solo modifica el carrito no se re-renderice cuando este cambia.
- **Formato de precios**: `utils/FormatPrice.ts` reutiliza instancias de `Intl.NumberFormat` con `es-AR`, porque crearlas por fila es caro.

### Seguridad y configuración

- **Deep links**: `app/+native-intent.tsx` redirige todo enlace externo a `/`. El esquema `superya` existe, pero un enlace a `/Finish` no puede vaciar el carrito.
- **Permisos bloqueados**: `SYSTEM_ALERT_WINDOW`, `READ_EXTERNAL_STORAGE` y `WRITE_EXTERNAL_STORAGE`.
- **Release de Android**: `expo-build-properties` activa R8 (`enableMinifyInReleaseBuilds`) y la reducción de recursos (`enableShrinkResourcesInReleaseBuilds`).
- **Override**: `package.json` fija `expo-constants` en `~18.0.14` mediante `overrides`.
- **Web**: `metro.config.js` agrega `wasm` y los headers COEP y COOP que `expo-sqlite` necesita en web. Solo aplican al servidor de Metro; un hosting del build estático tiene que enviarlos por su cuenta.

## Problemas conocidos

- **React Native sin soporte**: la tabla oficial de versiones de React Native marca 0.81.x como `Unsupported` y las ramas activas son 0.87 y 0.88 (noviembre de 2026). Expo SDK 54 está atado a 0.81, y la documentación de Expo lista como vigentes los SDK 56 a 58. Conviene migrar el SDK.
- **Editar un precio con decimales lo altera**: `handleFinishEdit`, en `components/cart/items/ItemDetails.tsx`, borra todos los puntos del texto. El campo abre con `String(price)`, así que `1200.5` pasa a `12005` con solo tocarlo y salir. Mientras tanto, el valor se corrige reescribiéndolo con coma.
- **El punto significa cosas distintas**: al agregar (`utils/ComaReplace.tsx`) es separador decimal, así que `1.200` se guarda como `1.2` y `1.200,5` se rechaza. Al editar en el carrito es separador de miles.
- **Sin validación en dispositivo**: a noviembre de 2026, la persistencia en SQLite, la importación de datos viejos y los perfiles de build actuales no se probaron en un dispositivo Android.
