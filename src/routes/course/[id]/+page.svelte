<script>
	import CourseDetails from '$lib/components/courses/CourseDetails.svelte';
	import CourseHeader from '$lib/components/courses/CourseHeader.svelte';
	import CourseNavbar from '$lib/components/courses/CourseNavbar.svelte';
	let selectedTab = 'Program';
</script>

<main>
	<CourseHeader />

	<div class="course-body container">
        <CourseNavbar bind:selectedTab/>
		{#if selectedTab === 'Program'}
			<CourseDetails />
		{:else if selectedTab === 'Progress'}
			<p>Progress content goes here</p>
		{:else if selectedTab === 'Form'}
			<p>Form content goes here.</p>
		{:else if selectedTab === 'About'}
			<p>About course content here.</p>
		{/if}
	</div>
</main>

<style>
	* {
		font-family: Poppins, sans-serif;
	}

	/* page header */
	.container {
		padding: 8px 64px !important;
	}

	/* page body */

	.course-body {
		padding: 32px 64px;
	}


	/* responsive */

	@media (max-width: 768px) {
		.container {
			padding: 8px 32px !important;
		}
	}

	@media (max-width: 480px) {
		.container {
			padding: 8px 16px !important;
		}
	}
</style>
