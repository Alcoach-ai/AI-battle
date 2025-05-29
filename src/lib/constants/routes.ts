export const ROUTES = {
	HOME: '/',
	AUTH: {
		LOGIN: '/auth/login',
		REGISTER: '/auth/register',
		RESET_PASSWORD: '/auth/reset-password'
	},
	LEGAL: {
		TERMS: '/terms',
		PRIVACY: '/privacy'
	},
	COMPETITIONS: '/competitions',
	COMPETITION: (id: string) => `/competitions/${id}`,
	LEARNING: '/learning',
	FORUM: '/forum',
	FAQ: '/faq',
	CONTACTS: '/contacts',
	PROFILE: '/profile',
	START: '/start'
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
