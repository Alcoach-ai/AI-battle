import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { User, UserStore } from './types';
import { userSchema } from './types';

const USER_STORAGE_KEY = 'user_state';

function getInitialState(): User {
    if (browser) {
        try {
            const stored = localStorage.getItem(USER_STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                const result = userSchema.safeParse(parsed);
                if (result.success) {
                    return result.data;
                }
                // Если данные невалидны, удаляем их
                localStorage.removeItem(USER_STORAGE_KEY);
            }
        } catch (error) {
            console.error('Error reading user data from localStorage:', error);
            localStorage.removeItem(USER_STORAGE_KEY);
        }
    }
    
    return {
        name: '',
        email: '',
        isAuthenticated: false,
        rating: 0,
        solvedTasks: 0,
        competitions: 0,
        achievements: [],
        recentActivity: []
    };
}

function createUserStore(): UserStore {
    const { subscribe, set, update } = writable<User>(getInitialState());

    const store: UserStore = {
        subscribe,
        set,
        update,
        setUser: (user: User) => {
            const result = userSchema.safeParse(user);
            if (!result.success) {
                console.error('Invalid user data:', result.error);
                return;
            }

            if (browser) {
                try {
                    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
                } catch (error) {
                    console.error('Error saving user data to localStorage:', error);
                }
            }
            set(user);
        },
        clearUser: () => {
            if (browser) {
                try {
                    localStorage.removeItem(USER_STORAGE_KEY);
                } catch (error) {
                    console.error('Error removing user data from localStorage:', error);
                }
            }
            set(getInitialState());
        }
    };

    return store;
}

export const userStore = createUserStore(); 