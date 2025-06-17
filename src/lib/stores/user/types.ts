import type { Writable } from 'svelte/store';
import { z } from 'zod';

const achievementSchema = z.object({
	title: z.string(),
	description: z.string()
});

const activitySchema = z.object({
	date: z.string(),
	description: z.string()
});

export const userSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	isAuthenticated: z.boolean(),
	rating: z.number().default(0),
	solvedTasks: z.number().default(0),
	competitions: z.number().default(0),
	achievements: z.array(achievementSchema).default([]),
	recentActivity: z.array(activitySchema).default([])
});

export type User = z.infer<typeof userSchema>;

export type UserStoreMethods = {
	setUser: (user: User) => void;
	clearUser: () => void;
};

export interface UserStore extends Writable<User>, UserStoreMethods {}
