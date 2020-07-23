import http from '@/http';
export const login = params => http.post('/hccloud/api/operator/login', params, {
  loading: true,
});