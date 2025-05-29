<script lang="ts">
	import { ROUTES } from '$lib/constants/routes';
	import { userStore } from '$lib/stores/user';
</script>

<nav class="navigation">
	<div class="nav-content">
		<a href={ROUTES.HOME} class="nav-logo">
			<span class="logo-icon">★</span>
			<span class="logo-text">AI Battle</span>
		</a>
		<div class="nav-links">
			<a href={ROUTES.COMPETITIONS}>Соревнования</a>
			<a href={ROUTES.LEARNING}>Обучение</a>
			<a href={ROUTES.FORUM}>Форум</a>
			<a href={ROUTES.FAQ}>FAQ</a>
			<a href={ROUTES.CONTACTS}>Контакты</a>
		</div>
		<div class="nav-profile">
			{#if $userStore.isAuthenticated && $userStore.name}
				<a href={ROUTES.PROFILE} class="profile-link">
					<div class="profile-info">
						<span class="profile-name">{$userStore.name}</span>
						<span class="profile-icon">👤</span>
					</div>
				</a>
			{:else}
				<a href={ROUTES.PROFILE} class="profile-icon">👤</a>
			{/if}
		</div>
	</div>
</nav>

<style>
	.navigation {
		background: white;
		padding: 1rem 0;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.nav-content {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 2rem;
	}

	.nav-logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		color: inherit;
		transition: opacity 0.2s;
	}

	.nav-logo:hover {
		opacity: 0.7;
	}

	.logo-icon {
		font-size: 1.5rem;
	}

	.logo-text {
		font-size: 1.2rem;
		font-weight: 600;
		color: #1a202c;
	}

	.nav-links {
		display: flex;
		gap: 2rem;
	}

	.nav-links a {
		color: #4a5568;
		text-decoration: none;
		font-size: 1rem;
	}

	.nav-links a:hover {
		color: #2b6cb0;
	}

	.profile-info {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		max-width: 200px;
	}

	.profile-link {
		text-decoration: none;
		display: block;
	}

	.profile-link:hover .profile-info {
		opacity: 0.7;
	}

	.profile-name {
		color: #4a5568;
		font-size: 0.9rem;
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 150px;
	}

	.profile-icon {
		font-size: 1.2rem;
		text-decoration: none;
		flex-shrink: 0;
	}

	.profile-icon:hover {
		opacity: 0.7;
	}

	@media (max-width: 768px) {
		.nav-links {
			display: none;
		}

		.profile-info {
			max-width: 120px;
		}

		.profile-name {
			max-width: 80px;
			font-size: 0.8rem;
		}

		.logo-text {
			font-size: 1rem;
		}
	}
</style>
