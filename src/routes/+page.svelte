<script lang="ts">
	import { ROUTES } from '$lib/constants/routes';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let showError = false;
	let errorMessage = '';

	onMount(() => {
		const error = $page.url.searchParams.get('error');
		if (error === 'unauthorized') {
			showError = true;
			errorMessage = 'Для доступа к этой странице необходимо войти в систему';
			setTimeout(() => {
				showError = false;
			}, 5000);
		}
	});
</script>

{#if showError}
	<div class="error-message" transition:fade>
		{errorMessage}
	</div>
{/if}

<main>
	<section class="hero">
		<div class="hero-content">
			<div class="hero-text">
				<h1>Начни учиться<br />с <span class="brand">RLArena</span></h1>
				<p>
					Решайте задачи, участвуйте в обсуждениях, проходите курсы и достигайте новых высот в мире
					ИИ!
				</p>
				<a href={ROUTES.START} class="cta-button">Начать</a>
			</div>
			<div class="hero-image">
				<img src="/images/hero-illustration.svg" alt="Students learning" />
			</div>
		</div>
	</section>

	<section class="for-whom">
		<div class="for-whom-content">
			<div class="for-whom-image">
				<img src="/images/robot-illustration.svg" alt="Robot illustration" />
			</div>
			<div class="for-whom-text">
				<h2>Кому подойдет<br />RLArena</h2>
				<p>
					RLArena — это платформа для всех, кто стремится к мастерству в машинном обучении. Здесь
					студенты могут обучаться и участвовать в соревнованиях, преподаватели — создавать задания
					и курсы, а все желающие — развиваться и делиться знаниями. Присоединяйтесь к нашему
					сообществу и достигайте новых высот в мире машинного обучения!
				</p>
			</div>
		</div>
	</section>
</main>

<style>
	main {
		background-color: #ebf8ff;
	}

	.hero {
		padding: 4rem 0;
	}

	.hero-content {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		padding: 0 2rem;
		gap: 4rem;
	}

	.hero-text {
		flex: 1;
	}

	.hero-text h1 {
		font-size: 3.5rem;
		color: #1a202c;
		margin-bottom: 1.5rem;
		line-height: 1.2;
	}

	.brand {
		color: #4299e1;
	}

	.hero-text p {
		font-size: 1.25rem;
		color: #4a5568;
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	.cta-button {
		display: inline-block;
		background: #000;
		color: white;
		padding: 1rem 2rem;
		border-radius: 0.5rem;
		text-decoration: none;
		font-weight: 500;
	}

	.cta-button:hover {
		background: #1a202c;
	}

	.hero-image {
		flex: 1;
	}

	.hero-image img {
		width: 100%;
		height: auto;
	}

	.for-whom {
		padding: 4rem 0;
		background: white;
	}

	.for-whom-content {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		padding: 0 2rem;
		gap: 4rem;
	}

	.for-whom-image {
		flex: 1;
	}

	.for-whom-image img {
		width: 100%;
		max-width: 400px;
	}

	.for-whom-text {
		flex: 1;
	}

	.for-whom-text h2 {
		font-size: 2.5rem;
		color: #1a202c;
		margin-bottom: 1.5rem;
		line-height: 1.2;
	}

	.for-whom-text p {
		font-size: 1.1rem;
		color: #4a5568;
		line-height: 1.6;
	}

	@media (max-width: 768px) {
		.hero-content,
		.for-whom-content {
			flex-direction: column;
			text-align: center;
			gap: 2rem;
		}

		.hero-text h1 {
			font-size: 2.5rem;
		}
	}

	.error-message {
		position: fixed;
		top: 1rem;
		left: 50%;
		transform: translateX(-50%);
		background: #fee2e2;
		color: #991b1b;
		padding: 1rem 2rem;
		border-radius: 0.5rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		z-index: 50;
	}
</style>
