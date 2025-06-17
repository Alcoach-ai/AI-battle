<script lang="ts">
	import { Icon } from 'svelte-icons-pack';
	import { BsChevronExpand } from 'svelte-icons-pack/bs';

	import { AiFillStar } from 'svelte-icons-pack/ai';
	import { AiOutlineSearch } from 'svelte-icons-pack/ai';
	import { BsFilterSquareFill } from 'svelte-icons-pack/bs';
	import CourseCard from '$lib/components/courses/CourseCard.svelte';
	import CourseSlider from '$lib/components/courses/CourseSlider.svelte';
	import type { Course } from '$lib/components/courses/types/Course';
	import CircularBorderedButton from '$lib/components/CircularBorderedButton.svelte';

	const beginnerCourses: Course[] = [
		{
			imageSrc: '/images/card1.png',
			title: 'Введение в программирование',
			subtitle: 'Начните с Python, если у вас нет опыта программирования.'
		},
		{
			imageSrc: '/images/card1.png',
			title: 'Визуализация данных',
			subtitle:
				'Создавайте отличные визуализации данных. Отличный способ изучить всю мощь программирования!'
		},
		{
			imageSrc: '/images/card1.png',
			title: 'Введение в SQL',
			subtitle: 'Изучите SQL для работы с базами данных, используя Google BigQuery.'
		},
		{
			imageSrc: '/images/card1.png',
			title: 'Визуализация данных1',
			subtitle:
				'Создавайте отличные визуализации данных. Отличный способ изучить всю мощь программирования!1'
		},
		{
			imageSrc: '/images/card1.png',
			title: 'Введение в SQL1',
			subtitle: 'Изучите SQL для работы с базами данных, используя Google BigQuery.1'
		}
	];

	let searchText = '';

	let numberOfItems = 1;

	function handleAllCourses() {
		// TODO
		console.log('Handle all course click');
		
	}
	function handlePopularCourses() {
		// TODO
		console.log('Handle popular course click');
	}

	function handleFilter () {
		// TODO
		console.log('Handle filter button click');
	}
</script>

<main>
	<div class="container">
		<div class="filter">
			<div class="hidden-small-device" on:click={handleAllCourses}>
				<span>Все курсы</span>
				<Icon src={BsChevronExpand} />
			</div>
			<div class="hidden-small-device" on:click={handlePopularCourses}>
				<Icon src={AiFillStar} />
				<span>Самые популярные</span>
				<Icon src={BsChevronExpand} />
			</div>
			<div>
				<div class="input-wrapper">
					<div class="search-icon">
						<Icon src={AiOutlineSearch} />
					</div>
					<input type="text" placeholder="Найти курс..." bind:value={searchText} />
				</div>
				<Icon size="2rem" src={BsFilterSquareFill} on:click={handleFilter} />
			</div>
		</div>

		<div class="course-header">
			<div class="course-heading">
				<div class="course-heading-titles">
					<h1>Образовательные курсы по <span style="color: blue;">машинному обучению</span></h1>
					<h5>Развивайте свои знания и навыки с лучшими образовательными материалами!</h5>
				</div>
				<div>
					<img src="/images/courses-header.png" style="max-width: 400px;" alt="person is reading" />
				</div>
			</div>
		</div>

		<div class="science card-padding">
			<CourseSlider hasDarkBackground={true} title={'Для начинающих'} courses={beginnerCourses} />
		</div>

		<div class="learners card-padding">
			<CourseSlider
				hasDarkBackground={false}
				title={'Для тех, кто хочет улучшить свои навыки'}
				courses={beginnerCourses}
			/>
		</div>

		<div class="card-padding">
			<h2>Профессионалам</h2>
			<div class="professions">
				{#each beginnerCourses as course (course.title)}
					<div>
						<CourseCard {...course} />
					</div>
				{/each}
			</div>
		</div>
		<div class="card-padding center-item">
			<CircularBorderedButton
				text={'Показать ещё '}
				hasBorder={true}
				hasBackground={false}
				hasColor={true}
			/>
		</div>
	</div>
</main>

<style>
	* {
		font-family: Poppins, sans-serif;
	}
	.hidden-small-device {
		display: block;
		cursor: pointer;
	}
	.container {
	}
	.filter {
		padding: 16px 0;

		display: flex;
		justify-content: space-around;
		/* gap: 1rem; */
	}
	.filter > div {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-basis: 1;
	}

	.input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		/* width: 100%; */
		width: 400px;
	}

	.search-icon {
		position: absolute;
		left: 10px;
		color: #888;
		font-size: 1.2rem;
		pointer-events: none;
	}

	input {
		padding: 8px 8px 8px 36px;
		width: 100%;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.course-header {
		padding: 16px 64px 16px 64px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 20px;
		width: 100%;
		flex-wrap: wrap;
		background-color: #fcfcfd;
	}

	.course-heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 50px;
		width: 100%;
	}

	.course-heading-titles {
		display: flex;
		gap: 10px;

		flex-direction: column;
	}

	/* page body */

	.course-body {
		padding: 32px 64px;
	}

	.science {
		background-color: #c5e4ff;
	}
	.professions {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}
	.professions > div {
		width: 100%;
	}
	.card-padding {
		padding: 32px 64px;
	}
	.center-item {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	/* responsive */

	@media (max-width: 768px) {
		.course-header {
			padding: 16px;
		}
		.course-heading {
			flex-wrap: wrap;
			text-align: center;
			justify-content: center;
		}
		.card-padding {
			padding: 16px 32px;
		}
		.professions {
			grid-template-columns: repeat(2, 1fr);
		}
		.input-wrapper {
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
		.card-padding {
			padding: 8px 16px;
		}
		.professions {
			grid-template-columns: 1fr;
		}
		.input-wrapper {
			width: 100%;
		}
		.hidden-small-device {
			display: none !important;
		}
	}
</style>
