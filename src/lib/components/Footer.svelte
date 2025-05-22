<script lang="ts">
	import { ROUTES } from '$lib/constants/routes';
</script>

<footer class="footer">
	<div class="footer-content">
		<div class="footer-section">
			<h3>RLArena</h3>
			<p>Платформа для обучения и соревнований в области машинного обучения</p>
		</div>
		<div class="footer-section">
			<h3>Навигация</h3>
			<ul>
				<li><a href={ROUTES.COMPETITIONS}>Соревнования</a></li>
				<li><a href={ROUTES.LEARNING}>Обучение</a></li>
				<li><a href={ROUTES.FORUM}>Форум</a></li>
				<li><a href={ROUTES.FAQ}>FAQ</a></li>
			</ul>
		</div>
		<div class="footer-section">
			<h3>Контакты</h3>
			<ul>
				<li>RLArena@gmail.com</li>
				<li>+89002032071</li>
				<li>24/1 к., ул. Белинского,<br />г. Екатеринбург, Россия</li>
			</ul>
		</div>
	</div>
	<div class="footer-bottom">
		<p>&copy; {new Date().getFullYear()} RLArena. Все права защищены.</p>
	</div>
</footer>

<style>
	.footer {
		background-color: #1a202c;
		color: white;
		padding: 4rem 0 1rem;
	}

	.footer-content {
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		padding: 0 2rem;
	}

	.footer-section h3 {
		color: #4299e1;
		margin-bottom: 1rem;
		font-size: 1.25rem;
	}

	.footer-section p {
		color: #a0aec0;
		line-height: 1.6;
	}

	.footer-section ul {
		list-style: none;
		padding: 0;
	}

	.footer-section ul li {
		margin-bottom: 0.5rem;
	}

	.footer-section ul li a {
		color: #a0aec0;
		text-decoration: none;
		transition: color 0.2s;
	}

	.footer-section ul li a:hover {
		color: #4299e1;
	}

	.footer-bottom {
		max-width: 1200px;
		margin: 3rem auto 0;
		padding: 1.5rem 2rem;
		border-top: 1px solid #2d3748;
		text-align: center;
		color: #a0aec0;
	}

	@media (max-width: 768px) {
		.footer-content {
			grid-template-columns: 1fr;
			text-align: center;
		}
	}
</style>
