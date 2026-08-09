export const ROUTES = {
  HOME: '/',
  FRAME: '/frame',
  BUILDER: '/builder',
  NOT_FOUND: '*',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RouteValue = typeof ROUTES[RouteKey];
