export const ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  SESSIONS: '/sessions',
  SESSION_DETAIL: (id = ':id') => `/sessions/${id}`,
  MEMORY: '/memory',
  SETTINGS: '/settings',
};
