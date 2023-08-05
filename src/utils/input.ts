export function sanitizeInput(route?: string | string[]) {
  if (!route) return null;
  let sanitizedRoute = "";
  if (Array.isArray(route)) {
    const [first] = route;
    if (!first) return null;
    sanitizedRoute = first;
  } else {
    sanitizedRoute = route;
  }
  return sanitizedRoute;
}