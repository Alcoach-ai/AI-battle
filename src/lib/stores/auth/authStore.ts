import { writable, type Writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { z } from 'zod';
import { ROUTES } from '$lib/constants/routes';
import { userStore } from '../user/userStore';
import type { User } from '../user/types';
import type { AuthFormState, ValidationError } from './types';
import { loginSchema, registerSchema } from './schemas';

function mapZodErrorToValidationErrors(error: z.ZodError): ValidationError[] {
	return error.errors.map((err) => ({
		path: err.path.map((p) => String(p)),
		message: err.message
	}));
}

const initialState: AuthFormState = {
	name: '',
	email: '',
	password: '',
	isLoading: false,
	error: null,
	termsAccepted: false,
	validationErrors: []
};

type AuthStoreMethods = {
	setName: (name: string) => void;
	setEmail: (email: string) => void;
	setPassword: (password: string) => void;
	setTermsAccepted: (accepted: boolean) => void;
	setError: (error: string | null) => void;
	setLoading: (isLoading: boolean) => void;
	reset: () => Promise<void>;
	handleRegister: () => Promise<void>;
	handleLogin: () => Promise<void>;
};

interface AuthStore extends Writable<AuthFormState>, AuthStoreMethods {}

function createAuthStore(): AuthStore {
	const { subscribe, set, update } = writable<AuthFormState>(initialState);

	const store: AuthStore = {
		subscribe,
		set,
		update,
		setName: (name: string) =>
			update((state) => {
				try {
					registerSchema.shape.name.parse(name);
					return {
						...state,
						name,
						validationErrors: state.validationErrors.filter((err) => err.path[0] !== 'name')
					};
				} catch (error) {
					if (error instanceof z.ZodError) {
						return {
							...state,
							name,
							validationErrors: [
								...state.validationErrors.filter((err) => err.path[0] !== 'name'),
								...mapZodErrorToValidationErrors(error)
							]
						};
					}
					return { ...state, name };
				}
			}),
		setEmail: (email: string) =>
			update((state) => {
				try {
					registerSchema.shape.email.parse(email);
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
					registerSchema.shape.password.parse(password);
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
		setTermsAccepted: (accepted: boolean) =>
			update((state) => {
				try {
					registerSchema.shape.termsAccepted.parse(accepted);
					return {
						...state,
						termsAccepted: accepted,
						validationErrors: state.validationErrors.filter(
							(err) => err.path[0] !== 'termsAccepted'
						)
					};
				} catch (error) {
					if (error instanceof z.ZodError) {
						return {
							...state,
							termsAccepted: accepted,
							validationErrors: [
								...state.validationErrors.filter((err) => err.path[0] !== 'termsAccepted'),
								...mapZodErrorToValidationErrors(error)
							]
						};
					}
					return { ...state, termsAccepted: accepted };
				}
			}),
		setError: (error: string | null) => update((state) => ({ ...state, error })),
		setLoading: (isLoading: boolean) => update((state) => ({ ...state, isLoading })),
		reset: async () => {
			userStore.clearUser();
			set(initialState);
			await goto(ROUTES.AUTH.LOGIN);
		},

		handleRegister: async () => {
			let validatedData: z.infer<typeof registerSchema> | undefined;

			update((state) => {
				try {
					validatedData = registerSchema.parse({
						name: state.name,
						email: state.email,
						password: state.password,
						termsAccepted: state.termsAccepted
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
				// TODO: Implement actual API calls here
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const userData: User = {
					name: validatedData.name,
					email: validatedData.email,
					isAuthenticated: true
				};

				userStore.setUser(userData);
				update((state) => ({ ...state, isLoading: false }));
				await goto(ROUTES.HOME);
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : 'Произошла ошибка при регистрации';
				update((state) => ({
					...state,
					isLoading: false,
					error: errorMessage
				}));
			}
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
				// TODO: Implement actual API calls here
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const userData: User = {
					name: '', // Будет получено с сервера
					email: validatedData.email,
					isAuthenticated: true
				};

				userStore.setUser(userData);
				update((state) => ({ ...state, isLoading: false }));
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

export const authStore = createAuthStore();
