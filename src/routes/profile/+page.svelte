<script lang="ts">
	import { userStore } from '$lib/stores/user';
	import { authUtils } from '$lib/stores/auth';
</script>

<main>
	<div class="profile-container">
		<div class="profile-header">
			<div class="profile-avatar">👤</div>
			<div class="profile-info">
				<h1>{$userStore?.name || 'Пользователь'}</h1>
				<p class="email">{$userStore?.email || 'email@example.com'}</p>
			</div>
			<button class="logout-button" on:click={authUtils.logout}> Выйти </button>
		</div>

		<div class="profile-stats">
			<div class="stat-card">
				<h3>Рейтинг</h3>
				<p class="stat-value">{$userStore?.rating || 0}</p>
			</div>
			<div class="stat-card">
				<h3>Решено задач</h3>
				<p class="stat-value">{$userStore?.solvedTasks || 0}</p>
			</div>
			<div class="stat-card">
				<h3>Участие в соревнованиях</h3>
				<p class="stat-value">{$userStore?.competitions || 0}</p>
			</div>
		</div>

		<div class="profile-sections">
			<section class="achievements">
				<h2>Достижения</h2>
				<div class="achievements-grid">
					{#if $userStore?.achievements?.length}
						{#each $userStore.achievements as achievement (achievement.title)}
							<div class="achievement-card">
								<span class="achievement-icon">🏆</span>
								<h4>{achievement.title}</h4>
								<p>{achievement.description}</p>
							</div>
						{/each}
					{:else}
						<p class="empty-state">Пока нет достижений</p>
					{/if}
				</div>
			</section>

			<section class="recent-activity">
				<h2>Последняя активность</h2>
				<div class="activity-list">
					{#if $userStore?.recentActivity?.length}
						{#each $userStore.recentActivity as activity (activity.date + activity.description)}
							<div class="activity-item">
								<span class="activity-date">{activity.date}</span>
								<p>{activity.description}</p>
							</div>
						{/each}
					{:else}
						<p class="empty-state">Нет недавней активности</p>
					{/if}
				</div>
			</section>
		</div>
	</div>
</main>

<style>
	main {
		background-color: #ebf8ff;
		min-height: 100vh;
		padding: 2rem 0;
	}

	.profile-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	.profile-header {
		background: white;
		border-radius: 1rem;
		padding: 2rem;
		display: flex;
		align-items: center;
		gap: 2rem;
		margin-bottom: 2rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.profile-avatar {
		font-size: 4rem;
		background: #ebf8ff;
		width: 100px;
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
	}

	.profile-info h1 {
		font-size: 2rem;
		color: #1a202c;
		margin-bottom: 0.5rem;
	}

	.email {
		color: #4a5568;
		font-size: 1.1rem;
	}

	.profile-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.stat-card {
		background: white;
		padding: 1.5rem;
		border-radius: 1rem;
		text-align: center;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.stat-card h3 {
		color: #4a5568;
		margin-bottom: 0.5rem;
		font-size: 1.1rem;
	}

	.stat-value {
		font-size: 2rem;
		color: #2b6cb0;
		font-weight: bold;
	}

	.profile-sections {
		display: grid;
		gap: 2rem;
	}

	.achievements,
	.recent-activity {
		background: white;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	h2 {
		color: #1a202c;
		margin-bottom: 1.5rem;
		font-size: 1.5rem;
	}

	.achievements-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1.5rem;
	}

	.achievement-card {
		background: #ebf8ff;
		padding: 1.5rem;
		border-radius: 0.5rem;
		text-align: center;
	}

	.achievement-icon {
		font-size: 2rem;
		margin-bottom: 0.5rem;
		display: block;
	}

	.achievement-card h4 {
		color: #2b6cb0;
		margin-bottom: 0.5rem;
	}

	.achievement-card p {
		color: #4a5568;
		font-size: 0.9rem;
	}

	.activity-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.activity-item {
		padding: 1rem;
		border-radius: 0.5rem;
		background: #ebf8ff;
	}

	.activity-date {
		color: #4a5568;
		font-size: 0.9rem;
	}

	.activity-item p {
		color: #1a202c;
		margin-top: 0.25rem;
	}

	.empty-state {
		color: #4a5568;
		text-align: center;
		padding: 2rem;
	}

	.logout-button {
		margin-left: auto;
		background-color: #e53e3e;
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 0.5rem;
		font-size: 1rem;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.logout-button:hover {
		background-color: #c53030;
	}

	.logout-button:active {
		background-color: #9c1c1c;
	}

	@media (max-width: 768px) {
		.profile-header {
			flex-direction: column;
			text-align: center;
		}

		.logout-button {
			margin-left: 0;
			margin-top: 1rem;
			width: 100%;
		}

		.profile-stats {
			grid-template-columns: 1fr;
		}

		.achievements-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
