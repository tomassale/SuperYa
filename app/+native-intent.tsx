// La app no usa deep links: cualquier enlace externo abre la home, así un enlace a
// /Finish no puede vaciar el carrito.
export function redirectSystemPath() {
  return '/'
}
