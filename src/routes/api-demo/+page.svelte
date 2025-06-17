<script lang="ts">
	import { apiClient, mockUsers } from '$lib/api';
	import { userStore } from '$lib/stores/user/userStore';
	import { authUtils } from '$lib/stores/auth/authUtils';

	let testResult = '';
	let isLoading = false;

	async function testLogin() {
		isLoading = true;
		testResult = '';

		try {
			// Тестируем логин с валидными данными
			const response = await apiClient.login({
				email: 'ivan@example.com',
				password: 'Password123!'
			});

			if (response.success && response.data) {
				testResult =
					`✅ Логин успешен!\n` +
					`Пользователь: ${response.data.user.name}\n` +
					`Email: ${response.data.user.email}\n` +
					`Рейтинг: ${response.data.user.rating}\n` +
					`Токен: ${response.data.token.substring(0, 50)}...`;
			} else {
				testResult = `❌ Ошибка логина: ${response.error?.message}`;
			}
		} catch (error) {
			testResult = `❌ Исключение: ${error instanceof Error ? error.message : 'Unknown error'}`;
		} finally {
			isLoading = false;
		}
	}

	async function testInvalidLogin() {
		isLoading = true;
		testResult = '';

		try {
			const response = await apiClient.login({
				email: 'wrong@example.com',
				password: 'wrongpassword'
			});

			if (response.success) {
				testResult = `⚠️ Неожиданный успех!`;
			} else {
				testResult = `✅ Ошибка обработана корректно: ${response.error?.message}`;
			}
		} catch (error) {
			testResult = `❌ Исключение: ${error instanceof Error ? error.message : 'Unknown error'}`;
		} finally {
			isLoading = false;
		}
	}

	async function testRegister() {
		isLoading = true;
		testResult = '';

		try {
			const response = await apiClient.register({
				name: 'Тестовый Пользователь Новый',
				email: `test${Date.now()}@example.com`,
				password: 'NewPassword123!',
				termsAccepted: true
			});

			if (response.success && response.data) {
				testResult =
					`✅ Регистрация успешна!\n` +
					`Пользователь: ${response.data.user.name}\n` +
					`Email: ${response.data.user.email}\n` +
					`Достижения: ${response.data.user.achievements.length}`;
			} else {
				testResult = `❌ Ошибка регистрации: ${response.error?.message}`;
			}
		} catch (error) {
			testResult = `❌ Исключение: ${error instanceof Error ? error.message : 'Unknown error'}`;
		} finally {
			isLoading = false;
		}
	}

	async function testExistingEmail() {
		isLoading = true;
		testResult = '';

		try {
			const response = await apiClient.register({
				name: 'Другое Имя',
				email: 'ivan@example.com', // уже существует
				password: 'AnotherPassword123!',
				termsAccepted: true
			});

			if (response.success) {
				testResult = `⚠️ Неожиданный успех при дублировании email!`;
			} else {
				testResult = `✅ Дублирование email обработано корректно: ${response.error?.message}`;
			}
		} catch (error) {
			testResult = `❌ Исключение: ${error instanceof Error ? error.message : 'Unknown error'}`;
		} finally {
			isLoading = false;
		}
	}

	async function testProfile() {
		isLoading = true;
		testResult = '';

		try {
			const response = await apiClient.getProfile();

			if (response.success && response.data) {
				testResult =
					`✅ Профиль получен!\n` +
					`Пользователь: ${response.data.name}\n` +
					`Решенных задач: ${response.data.solvedTasks}\n` +
					`Соревнований: ${response.data.competitions}`;
			} else {
				testResult = `❌ Ошибка получения профиля: ${response.error?.message}`;
			}
		} catch (error) {
			testResult = `❌ Исключение: ${error instanceof Error ? error.message : 'Unknown error'}`;
		} finally {
			isLoading = false;
		}
	}

	async function testLogout() {
		isLoading = true;
		testResult = '';

		try {
			await authUtils.logout();
			testResult = `✅ Logout успешен! Токены очищены.`;
		} catch (error) {
			testResult = `❌ Ошибка logout: ${error instanceof Error ? error.message : 'Unknown error'}`;
		} finally {
			isLoading = false;
		}
	}

	$: currentUser = $userStore;
	$: isAuthenticated = currentUser.isAuthenticated;
</script>

<div class="demo-container">
	<h1>🧪 Демонстрация Mock API</h1>

	<div class="status-section">
		<h2>Статус аутентификации</h2>
		<div class="status-card">
			<p><strong>Аутентифицирован:</strong> {isAuthenticated ? '✅ Да' : '❌ Нет'}</p>
			{#if currentUser.isAuthenticated}
				<p><strong>Пользователь:</strong> {currentUser.name}</p>
				<p><strong>Email:</strong> {currentUser.email}</p>
				<p><strong>Рейтинг:</strong> {currentUser.rating}</p>
			{/if}
		</div>
	</div>

	<div class="mock-data-section">
		<h2>Тестовые данные</h2>
		<div class="mock-users">
			{#each mockUsers as user (user.id)}
				<div class="user-card">
					<h4>{user.name}</h4>
					<p><strong>Email:</strong> {user.email}</p>
					<p><strong>Пароль:</strong> {user.password}</p>
					<p><strong>Рейтинг:</strong> {user.rating}</p>
				</div>
			{/each}
		</div>
	</div>

	<div class="tests-section">
		<h2>Тесты API</h2>

		<div class="test-buttons">
			<button on:click={testLogin} disabled={isLoading}> 🔐 Тест логина (валидный) </button>

			<button on:click={testInvalidLogin} disabled={isLoading}>
				❌ Тест логина (невалидный)
			</button>

			<button on:click={testRegister} disabled={isLoading}> 📝 Тест регистрации </button>

			<button on:click={testExistingEmail} disabled={isLoading}>
				⚠️ Тест дублирования email
			</button>

			<button on:click={testProfile} disabled={isLoading}> 👤 Тест получения профиля </button>

			<button on:click={testLogout} disabled={isLoading}> 🚪 Тест logout </button>
		</div>

		{#if isLoading}
			<div class="loading">⏳ Выполняется запрос...</div>
		{/if}

		{#if testResult}
			<div class="result">
				<h3>Результат:</h3>
				<pre>{testResult}</pre>
			</div>
		{/if}
	</div>

	<div class="links">
		<a href="/auth/login">🔐 Страница логина</a>
		<a href="/auth/register">📝 Страница регистрации</a>
		<a href="/">🏠 Главная страница</a>
	</div>
</div>

<style>
	.demo-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		font-family: system-ui, sans-serif;
	}

	h1 {
		color: #333;
		text-align: center;
		margin-bottom: 2rem;
	}

	h2 {
		color: #555;
		border-bottom: 2px solid #eee;
		padding-bottom: 0.5rem;
		margin-bottom: 1rem;
	}

	.status-section {
		margin-bottom: 2rem;
	}

	.status-card {
		background: #f8f9fa;
		border: 1px solid #dee2e6;
		border-radius: 8px;
		padding: 1rem;
	}

	.mock-data-section {
		margin-bottom: 2rem;
	}

	.mock-users {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1rem;
	}

	.user-card {
		background: #e3f2fd;
		border: 1px solid #bbdefb;
		border-radius: 8px;
		padding: 1rem;
	}

	.user-card h4 {
		margin: 0 0 0.5rem 0;
		color: #1976d2;
	}

	.user-card p {
		margin: 0.25rem 0;
		font-size: 0.9rem;
	}

	.tests-section {
		margin-bottom: 2rem;
	}

	.test-buttons {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin-bottom: 1rem;
	}

	button {
		background: #007bff;
		color: white;
		border: none;
		border-radius: 6px;
		padding: 0.75rem 1rem;
		cursor: pointer;
		font-size: 0.9rem;
		transition: background-color 0.2s;
	}

	button:hover:not(:disabled) {
		background: #0056b3;
	}

	button:disabled {
		background: #6c757d;
		cursor: not-allowed;
	}

	.loading {
		background: #fff3cd;
		border: 1px solid #ffeaa7;
		border-radius: 6px;
		padding: 1rem;
		text-align: center;
		color: #856404;
	}

	.result {
		background: #f8f9fa;
		border: 1px solid #dee2e6;
		border-radius: 6px;
		padding: 1rem;
		margin-top: 1rem;
	}

	.result h3 {
		margin: 0 0 0.5rem 0;
		color: #333;
	}

	.result pre {
		background: white;
		border: 1px solid #dee2e6;
		border-radius: 4px;
		padding: 0.75rem;
		margin: 0;
		white-space: pre-wrap;
		word-wrap: break-word;
		font-family: 'Courier New', monospace;
		font-size: 0.85rem;
	}

	.links {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
		margin-top: 2rem;
		padding-top: 2rem;
		border-top: 1px solid #eee;
	}

	.links a {
		background: #28a745;
		color: white;
		text-decoration: none;
		padding: 0.5rem 1rem;
		border-radius: 6px;
		transition: background-color 0.2s;
	}

	.links a:hover {
		background: #1e7e34;
	}

	@media (max-width: 768px) {
		.demo-container {
			padding: 1rem;
		}

		.test-buttons {
			grid-template-columns: 1fr;
		}

		.links {
			flex-direction: column;
			align-items: center;
		}
	}
</style>
