<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	interface Competition {
		id: string;
		title: string;
		description: string;
		startDate: string;
		endDate: string;
		logo: string;
	}

	let competition: Competition | null = null;
	let loading = true;
	let error = false;

	// В реальном приложении здесь будет API запрос
	const competitions: Competition[] = [
		{
			id: 'nfl-2025',
			title: 'NFL Big Data Bowl 2025',
			description:
				'Помогите использовать поведение перед приемкой для прогнозирования и лучшего понимания тенденций команды и игроков НФЛ',
			startDate: '12.12.2024',
			endDate: '30.05.2025',
			logo: '/images/nfl-logo.png'
		},
		{
			id: 'gemma-global',
			title: 'Unlock Global with Gemma',
			description:
				'Создайте варианты моделей Gemma для конкретного языка или уникального культурного аспекта',
			startDate: '10.01.2025',
			endDate: '20.07.2025',
			logo: '/images/google-logo.png'
		},
		{
			id: 'time-market',
			title: 'Time Market Data Forecasting',
			description: 'Спрогнозируйте реакцию участников финансового рынка, используя реальные данные',
			startDate: '12.12.2024',
			endDate: '30.05.2025',
			logo: '/images/market-logo.png'
		}
	];

	onMount(() => {
		const id = $page.params.id;
		competition = competitions.find((c) => c.id === id) || null;
		loading = false;
		if (!competition) {
			error = true;
		}
	});
</script>

{#if loading}
	<div class="loading">Загрузка...</div>
{:else if error || !competition}
	<div class="error">
		<h1>Соревнование не найдено</h1>
		<a href="/competitions" class="back-link">Вернуться к списку соревнований</a>
	</div>
{:else}
	<div class="competition-page">
		<header class="competition-header">
			<div class="competition-info">
				<img src={competition?.logo} alt={`${competition?.title} logo`} class="competition-logo" />
				<div class="competition-title">
					<h1>{competition?.title}</h1>
					<div class="date-range">{competition?.startDate} - {competition?.endDate}</div>
				</div>
			</div>
			<button class="participate-btn">Участвовать</button>
		</header>

		<section class="competition-description">
			<h2>Описание</h2>
			<p>{competition?.description}</p>
		</section>

		<section class="competition-details">
			<h2>Детали соревнования</h2>
			<div class="details-grid">
				<div class="detail-card">
					<h3>Призовой фонд</h3>
					<p>$10,000</p>
				</div>
				<div class="detail-card">
					<h3>Участников</h3>
					<p>234</p>
				</div>
				<div class="detail-card">
					<h3>Submissions</h3>
					<p>1,234</p>
				</div>
			</div>
		</section>
	</div>
{/if}

<style>
	.competition-page {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	.loading,
	.error {
		text-align: center;
		padding: 4rem;
		font-size: 1.2rem;
		color: #4a5568;
	}

	.back-link {
		display: inline-block;
		margin-top: 1rem;
		color: #2b6cb0;
		text-decoration: none;
	}

	.back-link:hover {
		text-decoration: underline;
	}

	.competition-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 3rem;
	}

	.competition-info {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.competition-logo {
		width: 80px;
		height: 80px;
		object-fit: contain;
	}

	.competition-title h1 {
		font-size: 2.5rem;
		color: #1a202c;
		margin-bottom: 0.5rem;
	}

	.date-range {
		font-size: 1.1rem;
		color: #4a5568;
	}

	.participate-btn {
		padding: 1rem 2rem;
		background: #000;
		color: white;
		border: none;
		border-radius: 0.5rem;
		font-size: 1.1rem;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.2s ease-in-out;
	}

	.participate-btn:hover {
		background: #1a202c;
	}

	.competition-description {
		margin-bottom: 3rem;
	}

	.competition-description h2 {
		font-size: 1.8rem;
		color: #1a202c;
		margin-bottom: 1rem;
	}

	.competition-description p {
		font-size: 1.1rem;
		color: #4a5568;
		line-height: 1.6;
	}

	.competition-details h2 {
		font-size: 1.8rem;
		color: #1a202c;
		margin-bottom: 1.5rem;
	}

	.details-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1.5rem;
	}

	.detail-card {
		background: #f7fafc;
		padding: 1.5rem;
		border-radius: 0.5rem;
		text-align: center;
	}

	.detail-card h3 {
		font-size: 1.1rem;
		color: #4a5568;
		margin-bottom: 0.5rem;
	}

	.detail-card p {
		font-size: 1.5rem;
		color: #1a202c;
		font-weight: 500;
	}

	@media (max-width: 768px) {
		.competition-header {
			flex-direction: column;
			gap: 1.5rem;
			text-align: center;
		}

		.competition-info {
			flex-direction: column;
			gap: 1rem;
		}

		.competition-title h1 {
			font-size: 2rem;
		}
	}
</style>
