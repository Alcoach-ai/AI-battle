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

// Мок база данных соревнований
const mockContests = [
	{
		id: 'nfl-2025',
		title: 'NFL Big Data Bowl 2025',
		description:
			'Помогите использовать поведение перед приемкой для прогнозирования и лучшего понимания тенденций команды и игроков НФЛ',
		startDate: '12.12.2024',
		endDate: '30.05.2025',
		logo: '/images/nfl-logo.png',
		status: 'active',
		prize: '$10,000',
		participants: 234,
		submissions: 1234
	},
	{
		id: 'gemma-global',
		title: 'Unlock Global with Gemma',
		description:
			'Создайте варианты моделей Gemma для конкретного языка или уникального культурного аспекта',
		startDate: '10.01.2025',
		endDate: '20.07.2025',
		logo: '/images/google-logo.png',
		status: 'upcoming',
		prize: '$5,000',
		participants: 120,
		submissions: 500
	},
	{
		id: 'time-market',
		title: 'Time Market Data Forecasting',
		description: 'Спрогнозируйте реакцию участников финансового рынка, используя реальные данные',
		startDate: '12.12.2024',
		endDate: '30.05.2025',
		logo: '/images/market-logo.png',
		status: 'ended',
		prize: '$7,500',
		participants: 80,
		submissions: 300
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
	async register(request: RegisterRequest): Promise<ApiResponse<any>> {
		await delay();

		const { username, email, password } = request;

		// Валидация обязательных полей
		if (!username || !email || !password) {
			return {
				success: false,
				error: {
					message: 'Все поля обязательны для заполнения',
					code: 'MISSING_FIELDS'
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
			name: username,
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
			],
			profile_image: request.profile_image || ''
		});

		// Новый формат ответа
		return {
			success: true,
			data: {
				access_token: createMockToken(newMockUser.id),
				token_type: 'bearer'
			}
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
	},

	// Получение соревнования по slug
	async getContest(slug: string) {
		await delay(200);
		const contest = mockContests.find((c) => c.id === slug);
		if (!contest) {
			return {
				success: false,
				error: { message: 'Соревнование не найдено', code: 'NOT_FOUND' }
			};
		}
		return { success: true, data: contest };
	},

	// Проверка, зарегистрирован ли пользователь на соревнование
	async isUserEntered(slug: string) {
		await delay(100);
		// Для теста: пусть пользователь всегда зарегистрирован на nfl-2025, иначе нет
		return {
			success: true,
			data: { is_entered: slug === 'nfl-2025' }
		};
	},

	// Получение отправленных решений пользователя для соревнования
	async getContestSubmissions(slug: string) {
		await delay(100);
		// Для теста: возвращаем фиктивные данные
		return {
			success: true,
			data: {
				submissions: slug === 'nfl-2025' ? [
					{ created_at: '2024-06-01', score: 0.95, comment: 'Первый сабмит' },
					{ created_at: '2024-06-02', score: 0.97, comment: 'Улучшил результат' }
				] : []
			}
		};
	},

	// Мок обработчик регистрации пользователя на соревнование
	async enterContest(slug: string) {
		await delay(100);
		// Просто возвращаем успешный ответ
		return {
			success: true,
			data: { message: `Пользователь зарегистрирован на соревнование ${slug}` }
		};
	}
};

// Экспорт для использования в тестах
export { db, mockUsers };
