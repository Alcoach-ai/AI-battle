import { z } from 'zod';

export const nameSchema = z
    .string()
    .min(2, 'ФИО должно содержать минимум 2 символа')
    .max(100, 'ФИО не должно превышать 100 символов')
    .regex(
        /^[А-ЯЁ][а-яё]+(-[А-ЯЁ][а-яё]+)?\s[А-ЯЁ][а-яё]+(\s[А-ЯЁ][а-яё]+)?$/,
        'ФИО должно быть в формате "Фамилия Имя" или "Фамилия Имя Отчество" и содержать только русские буквы. Фамилия может быть двойной через дефис.'
    );

export const passwordSchema = z
    .string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
    .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
    .regex(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
    .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Пароль должен содержать хотя бы один специальный символ'
    );

export const registerSchema = z.object({
    name: nameSchema,
    email: z
        .string()
        .email('Некорректный формат email'),
    password: passwordSchema,
    termsAccepted: z
        .boolean()
        .refine(val => val === true, 'Необходимо принять условия использования')
});

export const loginSchema = z.object({
    email: z
        .string()
        .email('Некорректный формат email'),
    password: z
        .string()
        .min(1, 'Введите пароль')
}); 