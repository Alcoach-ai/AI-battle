import type { User } from '$lib/stores/user/types';

// Типы для API запросов
export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	name: string;
	email: string;
	password: string;
	termsAccepted: boolean;
}

// Типы для API ответов
export interface AuthResponse {
	user: User;
	token: string;
	refreshToken: string;
}

export interface ApiError {
	message: string;
	code?: string;
	field?: string;
}

export interface ApiResponse<T> {
	data?: T;
	error?: ApiError;
	success: boolean;
}

// Типы для мок данных
export interface MockUser {
	id: string;
	name: string;
	email: string;
	password: string; // В реальном приложении пароли должны быть захеширован
	rating: number;
	solvedTasks: number;
	competitions: number;
	achievements: Array<{ title: string; description: string }>;
	recentActivity: Array<{ date: string; description: string }>;
	createdAt: string;
}

// Константы API
export const API_ENDPOINTS = {
	AUTH: {
		LOGIN: '/api/auth/login',
		REGISTER: '/api/auth/register',
		REFRESH: '/api/auth/refresh',
		LOGOUT: '/api/auth/logout'
	},
	USER: {
		PROFILE: '/api/user/profile',
		UPDATE_PROFILE: '/api/user/profile'
	}
} as const;

// Типы для HTTP методов
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Конфигурация для API запросов
export interface RequestConfig {
	method: HttpMethod;
	headers?: Record<string, string>;
	body?: unknown;
	timeout?: number;
}
