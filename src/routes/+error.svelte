<script lang="ts">
	import { ROUTES } from '$lib/constants/routes';
</script>

<div class="error-container">
	<div class="robot">
		<img src="/images/sad-robot.svg" alt="Грустный робот" />
	</div>
	<h1>404</h1>
	<h2>Страница не найдена</h2>
	<p>К сожалению, запрашиваемая страница не существует.</p>
	<a href={ROUTES.HOME} class="home-link">Вернуться на главную</a>
</div>

<style>
	.error-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 2rem;
		background-color: #ebf8ff;
	}

	.robot {
		margin-bottom: 1rem;
		animation: float 3s ease-in-out infinite;
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	h1 {
		font-size: 8rem;
		color: #2b6cb0;
		margin: 0;
		line-height: 1;
	}

	h2 {
		font-size: 2rem;
		color: #1a202c;
		margin: 1rem 0;
	}

	p {
		color: #4a5568;
		margin-bottom: 2rem;
		font-size: 1.1rem;
	}

	.home-link {
		display: inline-block;
		background: #2b6cb0;
		color: white;
		padding: 1rem 2rem;
		border-radius: 0.5rem;
		text-decoration: none;
		font-weight: 500;
		transition: background-color 0.2s;
	}

	.home-link:hover {
		background: #2c5282;
	}
</style>
