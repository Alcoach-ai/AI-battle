// API-клиент для работы с соревнованиями

import { apiClient } from './client';

const API_URL = 'http://localhost:80';

// Получить JWT токен из localStorage (или другого хранилища)
function getToken() {
  return localStorage.getItem('token');
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getContest(slug: string) {
  const res = await apiClient.request(`/api/v1/contests/${slug}`);
  if (!res.success) throw new Error(res.error?.message || 'Ошибка получения соревнования');
  return res.data;
}

export async function getContestSubmissions(slug: string) {
  const res = await apiClient.request(`/api/v1/contests/${slug}/submissions`);
  if (!res.success) throw new Error(res.error?.message || 'Ошибка получения сабмитов');
  return res.data;
}

export async function isUserEntered(slug: string) {
  const res = await apiClient.request(`/api/v1/contests/${slug}/is_user_entered`);
  if (!res.success) throw new Error(res.error?.message || 'Ошибка проверки регистрации');
  return res.data;
}

export async function enterContest(slug: string) {
  const res = await apiClient.request(`/api/v1/contests/${slug}/enter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.success) throw new Error(res.error?.message || 'Ошибка регистрации на соревнование');
  return res.data;
}

export async function submitSolution(slug: string, file: File, comment?: string) {
  const formData = new FormData();
  formData.append('file', file);
  if (comment) formData.append('comment', comment);
  // Не добавляем Content-Type для FormData, браузер сам выставит boundary
  const res = await fetch(`${API_URL}/api/v1/contests/${slug}/submit`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Ошибка отправки решения');
  }
  return res.json();
} 