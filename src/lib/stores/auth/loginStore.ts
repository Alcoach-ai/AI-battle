import { writable, type Writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { z } from 'zod';
import { ROUTES } from '$lib/constants/routes';
import { userStore } from '../user/userStore';
import type { LoginFormState, ValidationError } from './types';
import { loginSchema } from './schemas';
import { apiClient } from '$lib/api';

function mapZodErrorToValidationErrors(error: z.ZodError): ValidationError[] {
	return error.errors.map((err) => ({
		path: err.path.map((p) => String(p)),
		message: err.message
	}));
}

const initialState: LoginFormState = {
	email: '',
	password: '',
	isLoading: false,
	error: null,
	validationErrors: []
};

type LoginStoreMethods = {
	setEmail: (email: string) => void;
	setPassword: (password: string) => void;
	setError: (error: string | null) => void;
	setLoading: (isLoading: boolean) => void;
	reset: () => void;
	handleLogin: () => Promise<void>;
};

interface LoginStore extends Writable<LoginFormState>, LoginStoreMethods {}

function createLoginStore(): LoginStore {
	const { subscribe, set, update } = writable<LoginFormState>(initialState);

	const store: LoginStore = {
		subscribe,
		set,
		update,
		setEmail: (email: string) =>
			update((state) => {
				try {
					loginSchema.shape.email.parse(email);
					return {
						...state,
						email,
						validationErrors: state.validationErrors.filter((err) => err.path[0] !== 'email')
					};
				} catch (error) {
					if (error instanceof z.ZodError) {
						return {
							...state,
							email,
							validationErrors: [
								...state.validationErrors.filter((err) => err.path[0] !== 'email'),
								...mapZodErrorToValidationErrors(error)
							]
						};
					}
					return { ...state, email };
				}
			}),
		setPassword: (password: string) =>
			update((state) => {
				try {
					loginSchema.shape.password.parse(password);
					return {
						...state,
						password,
						validationErrors: state.validationErrors.filter((err) => err.path[0] !== 'password')
					};
				} catch (error) {
					if (error instanceof z.ZodError) {
						return {
							...state,
							password,
							validationErrors: [
								...state.validationErrors.filter((err) => err.path[0] !== 'password'),
								...mapZodErrorToValidationErrors(error)
							]
						};
					}
					return { ...state, password };
				}
			}),
		setError: (error: string | null) => update((state) => ({ ...state, error })),
		setLoading: (isLoading: boolean) => update((state) => ({ ...state, isLoading })),
		reset: () => {
			set(initialState);
		},

		handleLogin: async () => {
			let validatedData: z.infer<typeof loginSchema> | undefined;

			update((state) => {
				try {
					validatedData = loginSchema.parse({
						email: state.email,
						password: state.password
					});
					return { ...state, validationErrors: [], error: null, isLoading: true };
				} catch (error) {
					if (error instanceof z.ZodError) {
						return {
							...state,
							validationErrors: mapZodErrorToValidationErrors(error)
						};
					}
					return {
						...state,
						error: 'Произошла ошибка при валидации формы'
					};
				}
			});

			if (!validatedData) return;

			try {
				// Используем API клиент для логина
				const response = await apiClient.login({
					email: validatedData.email,
					password: validatedData.password
				});

				if (!response.success || !response.data) {
					const errorMessage = response.error?.message || 'Произошла ошибка при входе';
					update((state) => ({
						...state,
						isLoading: false,
						error: errorMessage
					}));
					return;
				}

				// Сохраняем данные пользователя
				userStore.setUser(response.data.user);
				update((state) => ({ ...state, isLoading: false }));

				// Перенаправляем на главную страницу
				await goto(ROUTES.HOME);
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : 'Произошла ошибка при входе';
				update((state) => ({
					...state,
					isLoading: false,
					error: errorMessage
				}));
			}
		}
	};

	return store;
}

export const loginStore = createLoginStore();
