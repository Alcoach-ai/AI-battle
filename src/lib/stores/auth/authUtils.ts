import { goto } from '$app/navigation';
import { ROUTES } from '$lib/constants/routes';
import { userStore } from '../user/userStore';
import { loginStore } from './loginStore';
import { registerStore } from './registerStore';

export const authUtils = {
	logout: async () => {
		// Очищаем пользователя
		userStore.clearUser();
		
		// Сбрасываем состояния форм
		loginStore.reset();
		registerStore.reset();
		
		// Перенаправляем на страницу логина
		await goto(ROUTES.AUTH.LOGIN);
	}
}; 