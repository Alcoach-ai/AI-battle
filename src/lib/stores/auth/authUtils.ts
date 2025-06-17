import { goto } from '$app/navigation';
import { ROUTES } from '$lib/constants/routes';
import { userStore } from '../user/userStore';
import { loginStore } from './loginStore';
import { registerStore } from './registerStore';
import { apiClient } from '$lib/api';

export const authUtils = {
	logout: async () => {
		// Выполняем logout через API клиент
		await apiClient.logout();

		// Очищаем пользователя
		userStore.clearUser();

		// Сбрасываем состояния форм
		loginStore.reset();
		registerStore.reset();

		// Перенаправляем на страницу логина
		await goto(ROUTES.AUTH.LOGIN);
	}
};
