<script>
	import CircularBorderedButton from '../CircularBorderedButton.svelte';
</script>

<div class="course-container container">
	<div class="course-header">
		<div class="course-heading">
			<div class="course-heading-titles">
				<span><strong>Статус:</strong> Курс уже начался</span>
				<h1>Введение в программирование</h1>
				<h5>Начните с Python, если у вас нет опыта программирования.</h5>
			</div>
			<div>
				<img src="/images/course-icon.png" width="250px" alt="person is reading" />
			</div>
		</div>

		<div class="course-header-buttons">
			<div>
				<span>Для кого:</span>
				<CircularBorderedButton
					text={'Начинающие'}
					hasColor={true}
					hasBackground={false}
					hasBorder={true}
				/>
				<CircularBorderedButton
					text={'Интересует Python'}
					hasColor={true}
					hasBackground={false}
					hasBorder={true}
				/>
			</div>
			<div>
				<CircularBorderedButton
					text={'Зарегистрироваться'}
					hasColor={false}
					hasBackground={true}
					hasBorder={false}
				/>
			</div>
		</div>
	</div>
</div>

<style>
	* {
		font-family: Poppins, sans-serif;
	}

	/* page header */
	.container {
		padding: 8px 64px !important;
	}
	.course-container {
		background-image: url('/images/course-header.png');
		background-repeat: repeat-x;
		background-size: auto 100%;
		background-position: top;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.course-header {
		padding: 32px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 20px;
		width: 100%;
		flex-wrap: wrap;
	}

	.course-heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 50px;
		width: 100%;
	}

	.course-header-buttons {
		display: flex;
		align-items: center;

		justify-content: space-between;
		gap: 20px;
		width: 100%;
		flex-wrap: wrap;
	}
	.course-heading-titles {
		display: flex;
		gap: 10px;
		flex-direction: column;
	}

    @media (max-width: 768px) {
		.course-header {
			padding: 16px;
		}
        .course-heading {
            flex-wrap: wrap;
            text-align: center;
            justify-content: center;
        }
		.container {
			padding: 8px 32px !important;
		}
        .course-header-buttons > div > span {
			display: none;
		}
        .course-header-buttons > div {
			display: flex;
			align-items: center;
			justify-content: center;
			/* flex-direction: column; */
			gap: 8px;
            width: 100%;
		}
	}

	@media (max-width: 480px) {
		.course-header {
			padding: 8px;
		}
        .course-heading {
            flex-wrap: wrap;
            text-align: center;
            justify-content: center;
        }
		.container {
			padding: 8px 16px !important;
		}
		.course-header-buttons {
			flex-direction: column;
		}
		.course-header-buttons > div > span {
			display: none;
		}
		.course-header-buttons > div {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			gap: 8px;
		}

    }        
</style>
