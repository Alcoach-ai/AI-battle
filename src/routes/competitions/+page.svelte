<script lang="ts">
	interface Competition {
		id: string;
		title: string;
		description: string;
		startDate: string;
		endDate: string;
		logo: string;
	}

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

	function handleCompetitionClick(id: string) {
		window.location.href = `/competitions/${id}`;
	}
</script>

<div class="competitions-page">
	<header class="header">
		<h1>Соревнования</h1>
		<p>Участвуйте в соревнованиях, развивайте навыки и выигрывайте призы</p>
	</header>

	<div class="competitions-grid">
		{#each competitions as competition}
			<div class="competition-card" on:click={() => handleCompetitionClick(competition.id)}>
				<div class="card-header">
					<img src={competition.logo} alt={`${competition.title} logo`} class="competition-logo" />
					<div class="date-range">
						{competition.startDate} - {competition.endDate}
					</div>
				</div>
				<div class="card-content">
					<h2>{competition.title}</h2>
					<p>{competition.description}</p>
				</div>
				<div class="card-footer">
					<button class="participate-btn">Участвовать</button>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.competitions-page {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	.header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.header h1 {
		font-size: 2.5rem;
		color: #1a202c;
		margin-bottom: 1rem;
	}

	.header p {
		font-size: 1.2rem;
		color: #4a5568;
	}

	.competitions-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.competition-card {
		background: white;
		border-radius: 1rem;
		overflow: hidden;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s ease-in-out;
		cursor: pointer;
	}

	.competition-card:hover {
		transform: translateY(-4px);
	}

	.card-header {
		padding: 1.5rem;
		background: #f7fafc;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.competition-logo {
		width: 48px;
		height: 48px;
		object-fit: contain;
	}

	.date-range {
		font-size: 0.9rem;
		color: #4a5568;
	}

	.card-content {
		padding: 1.5rem;
	}

	.card-content h2 {
		font-size: 1.25rem;
		color: #1a202c;
		margin-bottom: 0.75rem;
	}

	.card-content p {
		color: #4a5568;
		line-height: 1.5;
	}

	.card-footer {
		padding: 1.5rem;
		border-top: 1px solid #e2e8f0;
	}

	.participate-btn {
		width: 100%;
		padding: 0.75rem;
		background: #000;
		color: white;
		border: none;
		border-radius: 0.5rem;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.2s ease-in-out;
	}

	.participate-btn:hover {
		background: #1a202c;
	}

	@media (max-width: 768px) {
		.competitions-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
