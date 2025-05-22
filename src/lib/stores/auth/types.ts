export type ValidationError = {
    path: string[];
    message: string;
}

export interface User {
    name: string;
    email: string;
    isAuthenticated: boolean;
}

export interface AuthFormState {
    name: string;
    email: string;
    password: string;
    isLoading: boolean;
    error: string | null;
    termsAccepted: boolean;
    validationErrors: ValidationError[];
} 