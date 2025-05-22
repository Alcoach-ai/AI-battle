import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { get } from 'svelte/store';
import { userStore } from '$lib/stores/user';
import { ROUTES } from '$lib/constants/routes';

export const load: PageLoad = () => {
    const user = get(userStore);
    
    if (!user.isAuthenticated) {
        throw redirect(303, `${ROUTES.AUTH.LOGIN}?returnUrl=${ROUTES.PROFILE}`);
    }

    return {};
}; 