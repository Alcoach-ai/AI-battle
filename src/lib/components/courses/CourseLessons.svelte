<script>
	import { Icon } from 'svelte-icons-pack';
	import { RiArrowsArrowDropRightLine } from 'svelte-icons-pack/ri';

	let lessons = [
		{
			id: 1,
			title: 'Арифметика и переменные',
			description: 'Производите вычисления, определяйте и изменяйте переменные.'
		}
	];
</script>

<div>
	<h1>Уроки</h1>
	<div>
		{#each lessons as lesson}
			<div class="lesson">
				<div>
					<p><strong>Глава {lesson.id}.</strong> {lesson.title}</p>
					<p>{lesson.description}</p>
				</div>
				<a href="/course/{lesson.id}/program">
					<Icon src={RiArrowsArrowDropRightLine} size="3rem" />
                </a>
			</div>
		{/each}
	</div>
</div>

<style>
    .lesson{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid lightgray;
        border-radius: 16px;
        width: 100%;
        padding: 16px;
    }
</style>
