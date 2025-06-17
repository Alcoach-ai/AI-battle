<script>
	import CourseHeader from '$lib/components/courses/CourseHeader.svelte';
	import CourseLessons from '$lib/components/courses/CourseLessons.svelte';
	import CourseNavbar from '$lib/components/courses/CourseNavbar.svelte';

</script>

<main>
	<CourseHeader />

	<div class="course-body container">
        <CourseNavbar />
		
        <CourseLessons />

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
