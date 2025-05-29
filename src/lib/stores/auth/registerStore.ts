import { writable, type Writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { z } from 'zod';
import { ROUTES } from '$lib/constants/routes';
import { userStore } from '../user/userStore';
import type { User } from '../user/types';
import type { RegisterFormState, ValidationError } from './types';
import { registerSchema } from './schemas';

function mapZodErrorToValidationErrors(error: z.ZodError): ValidationError[] {
	return error.errors.map((err) => ({
		path: err.path.map((p) => String(p)),
		message: err.message
	}));
}

const initialState: RegisterFormState = {
	name: '',
	email: '',
	password: '',
	isLoading: false,
	error: null,
	termsAccepted: false,
	validationErrors: []
};

type RegisterStoreMethods = {
	setName: (name: string) => void;
	setEmail: (email: string) => void;
	setPassword: (password: string) => void;
	setTermsAccepted: (accepted: boolean) => void;
	setError: (error: string | null) => void;
	setLoading: (isLoading: boolean) => void;
	reset: () => void;
	handleRegister: () => Promise<void>;
};

interface RegisterStore extends Writable<RegisterFormState>, RegisterStoreMethods {}

function createRegisterStore(): RegisterStore {
	const { subscribe, set, update } = writable<RegisterFormState>(initialState);

	const store: RegisterStore = {
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
		reset: () => {
			set(initialState);
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
					isAuthenticated: true,
					rating: 0,
					solvedTasks: 0,
					competitions: 0,
					achievements: [],
					recentActivity: []
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
		}
	};

	return store;
}

export const registerStore = createRegisterStore(); 