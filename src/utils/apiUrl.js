const DEFAULT_API_URL = import.meta.env.PROD
    ? 'https://messafy-api.duckdns.org'
    : 'http://localhost:8080';

export const API_URL = (import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(/\/$/, '');

export const WEBSOCKET_URL = API_URL.replace(/^http/, 'ws') + '/ws';
