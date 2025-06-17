# Mock API Server

Этот модуль предоставляет полнофункциональный мок-сервер для разработки и тестирования приложения RLArena.

## Структура

### 📁 Файлы

- `types.ts` - TypeScript типы для API запросов и ответов
- `mockServer.ts` - Реализация мок-сервера с тестовыми данными
- `client.ts` - API клиент для взаимодействия с сервером
- `index.ts` - Экспорты модуля

## 🚀 Быстрый старт

### Использование в компонентах

```typescript
import { apiClient } from '$lib/api';

// Логин
const response = await apiClient.login({
	email: 'ivan@example.com',
	password: 'Password123!'
});

// Регистрация
const response = await apiClient.register({
	name: 'Иван Иванов Иванович',
	email: 'new@example.com',
	password: 'Password123!',
	termsAccepted: true
});

// Получение профиля
const profile = await apiClient.getProfile();

// Выход
await apiClient.logout();
```

### Интеграция с stores

```typescript
import { apiClient } from '$lib/api';
import { userStore } from '$lib/stores/user/userStore';

// В loginStore или registerStore
const response = await apiClient.login(credentials);
if (response.success && response.data) {
	userStore.setUser(response.data.user);
}
```

## 🧪 Тестовые данные

Мок-сервер содержит предустановленных пользователей:

### Пользователь 1

- **Email:** `ivan@example.com`
- **Пароль:** `Password123!`
- **Имя:** Иванов Иван Иванович
- **Рейтинг:** 1500

### Пользователь 2

- **Email:** `anna@example.com`
- **Пароль:** `SecurePass456!`
- **Имя:** Петрова Анна Сергеевна
- **Рейтинг:** 1200

## 📡 API Endpoints

### Аутентификация

#### `POST /api/auth/login`

Логин пользователя

**Запрос:**

```typescript
{
	email: string;
	password: string;
}
```

**Ответ:**

```typescript
{
  success: boolean;
  data?: {
    user: User;
    token: string;
    refreshToken: string;
  };
  error?: ApiError;
}
```

#### `POST /api/auth/register`

Регистрация нового пользователя

**Запрос:**

```typescript
{
	name: string;
	email: string;
	password: string;
	termsAccepted: boolean;
}
```

#### `POST /api/auth/refresh`

Обновление токена доступа

#### `POST /api/auth/logout`

Выход из системы

### Пользователь

#### `GET /api/user/profile`

Получение профиля текущего пользователя

## 🔐 Управление токенами

API клиент автоматически управляет токенами:

- **Сохранение:** Токены сохраняются в localStorage
- **Автоматическая отправка:** Токен добавляется в заголовки запросов
- **Валидация:** Проверка истечения срока действия
- **Очистка:** Автоматическая очистка при logout

```typescript
import { TokenManager } from '$lib/api';

// Получить текущий токен
const token = TokenManager.getToken();

// Проверить валидность
const isValid = TokenManager.isTokenValid(token);

// Очистить токены
TokenManager.clearTokens();
```

## 🎯 Демо страница

Для тестирования функционала доступна демо страница:

**URL:** `/api-demo`

На этой странице можно:

- Просмотреть тестовые данные
- Выполнить различные API операции
- Проверить обработку ошибок
- Мониторить состояние аутентификации

## ⚡ Особенности мок-сервера

### Симуляция задержки сети

```typescript
// Настраиваемая задержка (по умолчанию 800ms)
const delay = (ms: number = 800): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, ms));
```

### Валидация данных

- Проверка существования email при регистрации
- Валидация паролей при логине
- Проверка принятия условий использования

### JWT токены (мок)

- Базовая структура JWT
- Хранение userId в payload
- Проверка истечения срока действия

### Обработка ошибок

```typescript
// Стандартный формат ошибок
{
  message: string;
  code?: string;
  field?: string; // для field-specific ошибок
}
```

## 🔧 Конфигурация

### Переключение на реальный сервер

```typescript
// В client.ts
export const apiClient = new ApiClient('https://api.rlarena.com', false);
//                                     ↑ baseURL              ↑ useMockServer
```

### Настройка тестовых данных

Отредактируйте массив `mockUsers` в `mockServer.ts`:

```typescript
const mockUsers: MockUser[] = [
	{
		id: '1',
		name: 'Ваше Имя',
		email: 'your@email.com',
		password: 'YourPassword123!'
		// ... остальные поля
	}
];
```

## 🛠️ Разработка

### Добавление нового эндпоинта

1. **Добавить типы в `types.ts`:**

```typescript
export interface NewRequest {
	field: string;
}
```

2. **Реализовать handler в `mockServer.ts`:**

```typescript
export const mockApiHandlers = {
	// ... existing handlers
	newEndpoint: async (request: NewRequest): Promise<ApiResponse<SomeType>> => {
		// implementation
	}
};
```

3. **Добавить метод в `client.ts`:**

```typescript
async newMethod(data: NewRequest): Promise<ApiResponse<SomeType>> {
  return await this.makeRequest<SomeType>('/api/new-endpoint', {
    method: 'POST',
    body: data
  });
}
```

### Тестирование

Используйте демо страницу `/api-demo` для тестирования новых функций.

## 📝 Миграция на реальный API

Когда будет готов реальный backend:

1. Измените `useMockServer` на `false` в `client.ts`
2. Укажите правильный `baseUrl`
3. API клиент автоматически переключится на реальные HTTP запросы
4. Все существующие компоненты продолжат работать без изменений

## 🔍 Логирование

Мок-сервер логирует все запросы в консоль:

```
[MOCK API] POST /api/auth/login { email: "ivan@example.com", password: "..." }
```

Это помогает при отладке и разработке.
