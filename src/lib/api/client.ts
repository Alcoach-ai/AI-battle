import { browser } from '$app/environment';
import type {
	LoginRequest,
	RegisterRequest,
	AuthResponse,
	ApiResponse,
	RequestConfig
} from './types';
import type { User } from '$lib/stores/user/types';
import { mockApiHandlers } from './mockServer';

// Класс для управления токенами
class TokenManager {
	private static readonly TOKEN_KEY = 'auth_token';
	private static readonly REFRESH_TOKEN_KEY = 'refresh_token';

	static getToken(): string | null {
		if (!browser) return null;
		return localStorage.getItem(this.TOKEN_KEY);
	}

	static getRefreshToken(): string | null {
		if (!browser) return null;
		return localStorage.getItem(this.REFRESH_TOKEN_KEY);
	}

	static setTokens(token: string, refreshToken: string): void {
		if (!browser) return;
		localStorage.setItem(this.TOKEN_KEY, token);
		localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
	}

	static clearTokens(): void {
		if (!browser) return;
		localStorage.removeItem(this.TOKEN_KEY);
		localStorage.removeItem(this.REFRESH_TOKEN_KEY);
	}

	static isTokenValid(token: string): boolean {
		try {
			const payload = JSON.parse(atob(token.split('.')[1]));
			return payload.exp > Date.now();
		} catch {
			return false;
		}
	}
}

// Основной API клиент
class ApiClient {
	private baseUrl: string;
	private useMockServer: boolean;

	constructor(baseUrl: string = '', useMockServer: boolean = true) {
		this.baseUrl = baseUrl;
		this.useMockServer = useMockServer;
	}

	// Вспомогательный метод для выполнения запросов
	private async makeRequest<T>(
		endpoint: string,
		config: RequestConfig = { method: 'GET' }
	): Promise<ApiResponse<T>> {
		// Если используем мок-сервер, обрабатываем запросы локально
		if (this.useMockServer) {
			return this.handleMockRequest<T>(endpoint, config);
		}

		// Настройка заголовков
		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
			...config.headers
		};

		// Добавляем токен аутентификации если он есть
		const token = TokenManager.getToken();
		if (token && TokenManager.isTokenValid(token)) {
			headers.Authorization = `Bearer ${token}`;
		}

		try {
			const response = await fetch(`${this.baseUrl}${endpoint}`, {
				method: config.method,
				headers,
				body: config.body ? JSON.stringify(config.body) : undefined,
				signal: config.timeout ? AbortSignal.timeout(config.timeout) : undefined
			});

			const data = await response.json();

			if (!response.ok) {
				return {
					success: false,
					error: data.error || { message: 'Произошла ошибка сервера' }
				};
			}

			return {
				success: true,
				data
			};
		} catch (error) {
			console.error('API request failed:', error);
			return {
				success: false,
				error: {
					message: error instanceof Error ? error.message : 'Ошибка сети'
				}
			};
		}
	}

	// Обработка мок-запросов
	private async handleMockRequest<T>(
		endpoint: string,
		config: RequestConfig
	): Promise<ApiResponse<T>> {
		console.log(`[MOCK API] ${config.method} ${endpoint}`, config.body);

		try {
			switch (endpoint) {
				case '/api/auth/login':
					if (config.method === 'POST') {
						return (await mockApiHandlers.login(config.body as LoginRequest)) as ApiResponse<T>;
					}
					break;

				case '/api/auth/register':
					if (config.method === 'POST') {
						return (await mockApiHandlers.register(
							config.body as RegisterRequest
						)) as ApiResponse<T>;
					}
					break;

				case '/api/auth/refresh':
					if (config.method === 'POST') {
						const refreshToken = TokenManager.getRefreshToken();
						if (!refreshToken) {
							return {
								success: false,
								error: { message: 'Refresh token не найден' }
							};
						}
						return (await mockApiHandlers.refreshToken(refreshToken)) as ApiResponse<T>;
					}
					break;

				case '/api/user/profile':
					if (config.method === 'GET') {
						const token = TokenManager.getToken();
						if (!token || !TokenManager.isTokenValid(token)) {
							return {
								success: false,
								error: { message: 'Токен не действителен' }
							};
						}
						// Извлекаем userId из токена
						const payload = JSON.parse(atob(token.split('.')[1]));
						return (await mockApiHandlers.getProfile(payload.userId)) as ApiResponse<T>;
					}
					break;

				default:
					return {
						success: false,
						error: { message: `Неизвестный эндпоинт: ${endpoint}` }
					};
			}

			return {
				success: false,
				error: { message: `Метод ${config.method} не поддерживается для ${endpoint}` }
			};
		} catch (error) {
			console.error('[MOCK API] Error:', error);
			return {
				success: false,
				error: {
					message: error instanceof Error ? error.message : 'Ошибка мок-сервера'
				}
			};
		}
	}

	// Методы для аутентификации
	async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
		const response = await this.makeRequest<AuthResponse>('/api/auth/login', {
			method: 'POST',
			body: credentials
		});

		// Сохраняем токены при успешном логине
		if (response.success && response.data) {
			TokenManager.setTokens(response.data.token, response.data.refreshToken);
		}

		return response;
	}

	async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
		const response = await this.makeRequest<AuthResponse>('/api/auth/register', {
			method: 'POST',
			body: userData
		});

		// Сохраняем токены при успешной регистрации
		if (response.success && response.data) {
			TokenManager.setTokens(response.data.token, response.data.refreshToken);
		}

		return response;
	}

	async refreshToken(): Promise<ApiResponse<{ token: string; refreshToken: string }>> {
		const response = await this.makeRequest<{ token: string; refreshToken: string }>(
			'/api/auth/refresh',
			{
				method: 'POST'
			}
		);

		// Обновляем токены при успешном обновлении
		if (response.success && response.data) {
			TokenManager.setTokens(response.data.token, response.data.refreshToken);
		}

		return response;
	}

	async logout(): Promise<void> {
		// Очищаем токены локально
		TokenManager.clearTokens();

		// В реальном приложении здесь был бы запрос на сервер
		if (!this.useMockServer) {
			try {
				await this.makeRequest('/api/auth/logout', { method: 'POST' });
			} catch (error) {
				console.error('Logout request failed:', error);
			}
		}
	}

	// Методы для работы с пользователем
	async getProfile(): Promise<ApiResponse<User>> {
		return await this.makeRequest<User>('/api/user/profile');
	}

	// Утилиты
	isAuthenticated(): boolean {
		const token = TokenManager.getToken();
		return token !== null && TokenManager.isTokenValid(token);
	}

	getCurrentToken(): string | null {
		return TokenManager.getToken();
	}
}

// Создаем экземпляр API клиента
export const apiClient = new ApiClient('', true); // useMockServer = true

// Экспортируем TokenManager для использования в других модулях
export { TokenManager };
