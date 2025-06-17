<script>
	import CircularBorderedButton from '../CircularBorderedButton.svelte';

	export let imageSrc;
	export let title;
	export let subtitle;
	export let buttonText = 'Начать';

  const maxLength = 60;

   let trimmedSubtitle = subtitle.length > maxLength
    ? subtitle.slice(0, maxLength).trim() + '…'
    : subtitle;


</script>

<div class="course-card">
	<img class="course-image" src={imageSrc} alt={title} />

	<div class="course-info">
		<h4>{title}</h4>
		<div class="subtitle-wrapper">
			<p class="clamped">{trimmedSubtitle}</p>
			
		</div>
	</div>
	<CircularBorderedButton
		text={buttonText}
		hasBackground={false}
		hasBorder={false}
		hasColor={false}
		hasblackBackground={true}
	/>
</div>

<style>
	.course-card {
		background: white;
		border-radius: 12px;
		padding: 16px;
		border: 1px solid lightgray;
		/* width: 300px; */
		display: flex;
		flex-direction: column;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
		gap: 12px;
	}

	.course-image {
		width: 100%;
		height: 200px;
		height: auto;
		object-fit: contain;
	}

	.course-info {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.course-info h4 {
		font-size: 1rem;
		margin: 0;
		font-weight: bold;
	}

	.course-info p {
  font-size: 0.875rem;
  margin-top: 4px;
  color: #555;
  min-height: 2.8em; /* Reserve height for 2 lines */
  margin-bottom: 0;
}

.subtitle-wrapper {
  position: relative;
  min-height: 2.8em; /* Match height for consistent layout */
}

.clamped {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.read-more {
  display: inline-block;
  font-size: 0.75rem;
  color: #007BFF;
  margin-top: 2px;
}
</style>
