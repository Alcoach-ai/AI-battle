<script>
	import { Icon } from 'svelte-icons-pack';
	import { AiFillHeart } from 'svelte-icons-pack/ai';
	import CircularBorderedButton from '../CircularBorderedButton.svelte';
	let courseDots = [1, 2, 3, 4];
	let activeDot = 1;
</script>

<div class="container">
	<h1>Глава 1. Арифметика и переменные.</h1>
	<div class="title-secondary">
		<Icon src={AiFillHeart} color={'gray'} />
		<span style="color: gray;">29 Oct 18, by Milan</span>
	</div>

	<div class="dots">
		{#each courseDots as dot}
			<button type="button"
				class="dot-number {activeDot === dot ? 'dot-number-active' : ''}"
				on:click={() => (activeDot = dot)}
			>
				{dot}
			</button>
		{/each}
	</div>

	<div class="course-player">
		<!-- TODO change it to video player  -->
		<img src="/images/course-video.png" alt="" />
	</div>

	<div class="description">
		<h1>Добро пожаловать!</h1>

		<div class="description-content">
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio sequi tempora, soluta
				ipsum provident tempore earum, vero laboriosam illo praesentium est voluptate quisquam,
				blanditiis perferendis deserunt quod non voluptatum omnis!
			</p>
			<div>
				<h3>Printing</h3>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, earum quibusdam quaerat,
					minus animi explicabo, est blanditiis atque enim eius facilis ut. Dolorum dolorem
					dignissimos dolore tempora quaerat accusantium ut!
				</p>
			</div>
			<div>
				<h3>Algorithm</h3>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim nemo quis excepturi facere
					doloribus repellendus repudiandae sequi libero. Facilis, deserunt libero eum alias
					eligendi blanditiis consequuntur molestiae sed molestias eius.
				</p>
			</div>
			<div class="center-item">
				<CircularBorderedButton
					text={'Изучать дальше'}
					hasBackground={false}
					hasColor={false}
					hasBorder={false}
					hasblackBackground={true}
				/>
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		width: 100%;
		align-items: center;
		flex-direction: column;
		gap: 10px;
	}
	.center-item {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.title-secondary {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	.dots {
		display: flex;
		gap: 1rem;
        padding-top: 8px;
	}
	.dot-number {

        border: none;
		padding: 6px 10px;
		border-radius: 50%;
		background-color: #ddd;
		cursor: pointer;
		user-select: none;
		transition: background-color 0.3s;
	}
	.dot-number-active {
		background-color: blue;
		color: white;
	}
	.course-player {
		padding: 16px;
		border-radius: 16px;
		overflow: hidden;
		max-height: 400px;
        width: 100%;
	}
    .course-player > img {
        object-fit: cover;
        width: inherit;
    }
	.description {
		display: flex;
		flex-direction: column;
	}
    .description > h1 {
        text-align: center;
    }
	.description-content {
		display: flex;
		flex-direction: column;
		gap: 5px;
		padding-bottom: 16px;
	}
</style>
