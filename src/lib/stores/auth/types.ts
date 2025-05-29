export type ValidationError = {
	path: string[];
	message: string;
};

export interface LoginFormState {
	email: string;
	password: string;
	isLoading: boolean;
	error: string | null;
	validationErrors: ValidationError[];
}

export interface RegisterFormState {
	name: string;
	email: string;
	password: string;
	isLoading: boolean;
	error: string | null;
	termsAccepted: boolean;
	validationErrors: ValidationError[];
}
