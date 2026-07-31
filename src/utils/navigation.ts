import { getSeoEnv } from '../config/seo.config';

export type RouteKey = 'home' | 'drones' | 'energia' | 'servicios-ti';

/**
 * Returns the correct relative path for internal navigation given a route key or clean path.
 * Respects VITE_BASE_PATH (e.g., '/crtech/' in preview, '/' in production).
 */
export function getRouteUrl(path: string): string {
  const { basePath } = getSeoEnv();
  // Normalize clean path
  const clean = path.startsWith('/') ? path : `/${path}`;
  
  if (basePath === '/' || basePath === '') {
    return clean;
  }

  // Remove leading slash from clean path if basePath ends with a slash
  const normalizedBase = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
  return `${normalizedBase}${clean}`;
}

/**
 * Parses current location pathname and hash to identify the active route.
 */
export function getCurrentRouteKey(): RouteKey {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  if (path.includes('/drones') || hash.includes('drones')) {
    return 'drones';
  }
  if (path.includes('/energia') || hash.includes('energia')) {
    return 'energia';
  }
  if (
    path.includes('/serviciosti') ||
    path.includes('/servicios-ti') ||
    hash.includes('serviciosti') ||
    hash.includes('servicios-ti')
  ) {
    return 'servicios-ti';
  }
  return 'home';
}

/**
 * Checks if the user arrived via a legacy hash URL (e.g. /#/drones)
 * and safely replaces the state with the clean path equivalent.
 */
export function handleLegacyHashRedirect(): boolean {
  const hash = window.location.hash;
  if (!hash || !hash.startsWith('#/')) {
    return false;
  }

  const hashPath = hash.substring(1); // e.g. "/drones" or "/servicios-ti"
  let routeKey: RouteKey = 'home';

  if (hashPath.includes('drones')) {
    routeKey = 'drones';
  } else if (hashPath.includes('energia')) {
    routeKey = 'energia';
  } else if (hashPath.includes('servicio')) {
    routeKey = 'servicios-ti';
  }

  const pathMap: Record<RouteKey, string> = {
    home: '/',
    drones: '/drones/',
    energia: '/energia/',
    'servicios-ti': '/serviciosti/'
  };

  const targetCleanPath = pathMap[routeKey];
  const targetFullUrl = getRouteUrl(targetCleanPath);

  // Preserve query parameters if present
  const search = window.location.search;
  const newUrl = `${targetFullUrl}${search}`;

  window.history.replaceState({}, '', newUrl);
  return true;
}
