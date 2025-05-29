# Auth Stores

Модуль аутентификации теперь использует отдельные stores для логина и регистрации вместо единого authStore.

## Структура

### LoginStore (`loginStore`)

- **Поля**: `email`, `password`, `isLoading`, `error`, `validationErrors`
- **Методы**: `setEmail()`, `setPassword()`, `setError()`, `setLoading()`, `reset()`, `handleLogin()`
- **Использование**: Страница логина (`/auth/login`)

### RegisterStore (`registerStore`)

- **Поля**: `name`, `email`, `password`, `termsAccepted`, `isLoading`, `error`, `validationErrors`
- **Методы**: `setName()`, `setEmail()`, `setPassword()`, `setTermsAccepted()`, `setError()`, `setLoading()`, `reset()`, `handleRegister()`
- **Использование**: Страница регистрации (`/auth/register`)

### AuthUtils (`authUtils`)

- **Методы**: `logout()` - общая функция для выхода из системы
- **Использование**: Любые компоненты, где нужен logout
