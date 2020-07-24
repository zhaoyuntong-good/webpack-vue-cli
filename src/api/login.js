import { http, publicUrl } from '@/http';
export const login = params => http.post(`${publicUrl}/api/operator/login`, params, {
  loading: true,
});
export const getLocalJson = params => http.get('/login.json');