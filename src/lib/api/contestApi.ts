// API-клиент для работы с соревнованиями

const API_URL = 'http://localhost/api/v1';

// Получить JWT токен из localStorage (или другого хранилища)
function getToken() {
  return localStorage.getItem('token');
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getContest(slug: string) {
  const res = await fetch(`${API_URL}/contests/${slug}`);
  if (!res.ok) throw new Error('Ошибка получения соревнования');
  return res.json();
}

export async function getContestSubmissions(slug: string) {
  const res = await fetch(`${API_URL}/contests/${slug}/submissions`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Ошибка получения сабмитов');
  return res.json();
}

export async function isUserEntered(slug: string) {
  const res = await fetch(`${API_URL}/contests/${slug}/is_user_entered`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Ошибка проверки регистрации');
  return res.json();
}

export async function enterContest(slug: string) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...authHeaders() };
  const res = await fetch(`${API_URL}/contests/${slug}/enter`, {
    method: 'POST',
    headers,
  });
  if (!res.ok) throw new Error('Ошибка регистрации на соревнование');
  return res.json();
}

export async function submitSolution(slug: string, file: File, comment?: string) {
  const formData = new FormData();
  formData.append('file', file);
  if (comment) formData.append('comment', comment);
  // Не добавляем Content-Type для FormData, браузер сам выставит boundary
  const res = await fetch(`${API_URL}/contests/${slug}/submit`, {
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