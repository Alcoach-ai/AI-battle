import type { MockUser, LoginRequest, RegisterRequest, AuthResponse, ApiResponse } from './types';
import type { User } from '$lib/stores/user/types';

// Мок база данных пользователей
const mockUsers: MockUser[] = [
	{
		id: '1',
		name: 'Иванов Иван Иванович',
		email: 'ivan@example.com',
		password: 'Password123!', // В реальном приложении должен быть захеширован
		rating: 1500,
		solvedTasks: 25,
		competitions: 5,
		achievements: [
			{ title: 'Первое решение', description: 'Решили первую задачу' },
			{ title: 'Быстрый ум', description: 'Решили задачу за рекордное время' }
		],
		recentActivity: [
			{ date: '2024-01-15', description: 'Решена задача "Алгоритмы сортировки"' },
			{ date: '2024-01-14', description: 'Участие в соревновании "Winter Cup"' }
		],
		createdAt: '2024-01-01T00:00:00Z'
	},
	{
		id: '2',
		name: 'Петрова Анна Сергеевна',
		email: 'anna@example.com',
		password: 'SecurePass456!',
		rating: 1200,
		solvedTasks: 18,
		competitions: 3,
		achievements: [{ title: 'Новичок', description: 'Зарегистрировались на платформе' }],
		recentActivity: [{ date: '2024-01-13', description: 'Решена задача "Графы и деревья"' }],
		createdAt: '2024-01-02T00:00:00Z'
	}
];

// Утилиты для работы с мок данными
class MockDatabase {
	private users: MockUser[] = [...mockUsers];

	findUserByEmail(email: string): MockUser | undefined {
		return this.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
	}

	findUserById(id: string): MockUser | undefined {
		return this.users.find((user) => user.id === id);
	}

	createUser(userData: Omit<MockUser, 'id' | 'createdAt'>): MockUser {
		const newUser: MockUser = {
			...userData,
			id: Date.now().toString(),
			createdAt: new Date().toISOString()
		};
		this.users.push(newUser);
		return newUser;
	}

	emailExists(email: string): boolean {
		return this.users.some((user) => user.email.toLowerCase() === email.toLowerCase());
	}
}

const db = new MockDatabase();

// Симуляция задержки сети
const delay = (ms: number = 800): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, ms));

// Утилита для создания JWT токена (мок)
const createMockToken = (userId: string): string => {
	const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
	const payload = btoa(
		JSON.stringify({
			userId,
			exp: Date.now() + 24 * 60 * 60 * 1000, // 24 часа
			iat: Date.now()
		})
	);
	const signature = btoa(`mock_signature_${userId}`);
	return `${header}.${payload}.${signature}`;
};

// Конвертация MockUser в User
const mockUserToUser = (mockUser: MockUser): User => ({
	name: mockUser.name,
	email: mockUser.email,
	isAuthenticated: true,
	rating: mockUser.rating,
	solvedTasks: mockUser.solvedTasks,
	competitions: mockUser.competitions,
	achievements: mockUser.achievements,
	recentActivity: mockUser.recentActivity
});

// API эндпоинты
export const mockApiHandlers = {
	// Логин
	async login(request: LoginRequest): Promise<ApiResponse<AuthResponse>> {
		await delay();

		const { email, password } = request;

		// Валидация входных данных
		if (!email || !password) {
			return {
				success: false,
				error: {
					message: 'Email и пароль обязательны',
					code: 'MISSING_FIELDS'
				}
			};
		}

		// Поиск пользователя
		const user = db.findUserByEmail(email);
		if (!user) {
			return {
				success: false,
				error: {
					message: 'Пользователь с таким email не найден',
					code: 'USER_NOT_FOUND',
					field: 'email'
				}
			};
		}

		// Проверка пароля
		if (user.password !== password) {
			return {
				success: false,
				error: {
					message: 'Неверный пароль',
					code: 'INVALID_PASSWORD',
					field: 'password'
				}
			};
		}

		// Успешный логин
		const authResponse: AuthResponse = {
			user: mockUserToUser(user),
			token: createMockToken(user.id),
			refreshToken: createMockToken(user.id + '_refresh')
		};

		return {
			success: true,
			data: authResponse
		};
	},

	// Регистрация
	async register(request: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
		await delay();

		const { name, email, password, termsAccepted } = request;

		// Валидация обязательных полей
		if (!name || !email || !password) {
			return {
				success: false,
				error: {
					message: 'Все поля обязательны для заполнения',
					code: 'MISSING_FIELDS'
				}
			};
		}

		// Проверка принятия условий
		if (!termsAccepted) {
			return {
				success: false,
				error: {
					message: 'Необходимо принять условия использования',
					code: 'TERMS_NOT_ACCEPTED',
					field: 'termsAccepted'
				}
			};
		}

		// Проверка существования пользователя
		if (db.emailExists(email)) {
			return {
				success: false,
				error: {
					message: 'Пользователь с таким email уже существует',
					code: 'EMAIL_ALREADY_EXISTS',
					field: 'email'
				}
			};
		}

		// Создание нового пользователя
		const newMockUser = db.createUser({
			name,
			email,
			password,
			rating: 1000, // Начальный рейтинг
			solvedTasks: 0,
			competitions: 0,
			achievements: [
				{ title: 'Добро пожаловать!', description: 'Успешная регистрация на платформе' }
			],
			recentActivity: [
				{ date: new Date().toISOString().split('T')[0], description: 'Регистрация на платформе' }
			]
		});

		// Создание ответа
		const authResponse: AuthResponse = {
			user: mockUserToUser(newMockUser),
			token: createMockToken(newMockUser.id),
			refreshToken: createMockToken(newMockUser.id + '_refresh')
		};

		return {
			success: true,
			data: authResponse
		};
	},

	// Получение профиля пользователя
	async getProfile(userId: string): Promise<ApiResponse<User>> {
		await delay(300);

		const user = db.findUserById(userId);
		if (!user) {
			return {
				success: false,
				error: {
					message: 'Пользователь не найден',
					code: 'USER_NOT_FOUND'
				}
			};
		}

		return {
			success: true,
			data: mockUserToUser(user)
		};
	},

	// Обновление токена
	async refreshToken(
		refreshToken: string
	): Promise<ApiResponse<{ token: string; refreshToken: string }>> {
		await delay(200);

		// Простая валидация мок токена
		if (!refreshToken || !refreshToken.includes('_refresh')) {
			return {
				success: false,
				error: {
					message: 'Недействительный refresh token',
					code: 'INVALID_REFRESH_TOKEN'
				}
			};
		}

		// Извлекаем userId из токена (в реальном приложении нужна нормальная валидация JWT)
		const userId = refreshToken.split('_refresh')[0].split('.').pop()?.split('_')[2];
		if (!userId) {
			return {
				success: false,
				error: {
					message: 'Недействительный refresh token',
					code: 'INVALID_REFRESH_TOKEN'
				}
			};
		}

		return {
			success: true,
			data: {
				token: createMockToken(userId),
				refreshToken: createMockToken(userId + '_refresh')
			}
		};
	}
};

// Экспорт для использования в тестах
export { db, mockUsers };
