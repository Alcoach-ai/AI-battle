<script lang="ts">
	import { onMount } from 'svelte';
	import CourseCard from './CourseCard.svelte';
	import type { Course } from './types/Course';
  import { Icon } from 'svelte-icons-pack';
	import { BsArrowLeft } from 'svelte-icons-pack/bs';
  import { BsArrowRight } from 'svelte-icons-pack/bs';


	export let courses: Course[] = [];
  export let title: String = "";
  export let hasDarkBackground: boolean = false;

	let currentIndex = 0;
	let visibleSlides = 1;

	const updateVisibleSlides = () => {
		const width = window.innerWidth;
		if (width >= 1024) visibleSlides = 3;
		else if (width >= 768) visibleSlides = 2;
		else visibleSlides = 1;
	};

	const next = () => {
		if (currentIndex < courses.length - visibleSlides) {
			currentIndex++;
		}
	};

	const prev = () => {
		if (currentIndex > 0) {
			currentIndex--;
		}
	};

	onMount(() => {
		updateVisibleSlides();
		window.addEventListener('resize', updateVisibleSlides);
		return () => window.removeEventListener('resize', updateVisibleSlides);
	});
</script>

<div>
  <div class="card-header-titles">
    <h2>{title}</h2>
    <div class="card-buttons">
      <button class="nav-button left" on:click={prev} disabled={currentIndex === 0}> <Icon size="1.5rem" src={BsArrowLeft} /> </button>
      <button
			class="nav-button right {hasDarkBackground ? "white-border" : "dark-border"}"
			on:click={next}
			disabled={currentIndex >= courses.length - visibleSlides}
		>
			<Icon size="1.5rem" src={BsArrowRight} />
		</button>
    </div>
  </div>
	<div class="carousel-wrapper">
		

		<div class="carousel-viewport">
			<div
				class="carousel-track"
				style="transform: translateX(-{(100 / visibleSlides) * currentIndex}%);"
			>
				{#each courses as course (course.title)}
					<div class="carousel-slide" style="width: calc(100% / {visibleSlides});">
						<CourseCard {...course} />
					</div>
				{/each}
			</div>
		</div>

		
	</div>
</div>

<style>
  .card-header-titles {
    display : flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-buttons {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
  }
	.carousel-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		width: 100%;
		overflow: hidden;
		margin: 32px 0;
	}

	.carousel-viewport {
		overflow: hidden;
		width: 100%;
	}

	.carousel-track {
		display: flex;
		transition: transform 0.3s ease;
	}

	.carousel-slide {
		flex-shrink: 0;
		padding: 0 8px;
		box-sizing: border-box;
	}

	.nav-button {
		border:none;
    background-color: transparent;
		color: gray;

		padding: 0.5rem 0.5rem;
		font-size: 2rem;
		cursor: pointer;
		z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
	}

	.nav-button:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	.left {
		margin-right: 8px;
	}

	.right {
		margin-left: 8px;
	}
  .white-border {
    border: 1px solid white;
    border-radius: 100%;
  }
  .dark-border {
    border: 1px solid lightgray;
    border-radius: 100%;
  }

	@media (max-width: 768px) {
		.nav-button {
			font-size: 1.5rem;
			padding: 0.4rem 0.6rem;
		}
	}
</style>
