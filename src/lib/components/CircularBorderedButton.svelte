<script>
	export let text;
	export let hasColor;
	export let hasBorder;
	export let hasBackground = false;
	export let hasblackBackground = false;
	export let handleButtonClick = () => {};
</script>

<button
	type="button"
	class="
    {hasColor ? 'text-blue' : 'text-white'} 
    {hasBorder ? 'border-blue' : 'border-none'} 
    {hasBackground ? 'background-black' : 'background-white'}
	{hasblackBackground && 'background-dark'}
    "
	on:click={handleButtonClick}
>
	{text}
</button>

<style>
	button {
		border-radius: 10px;
		font-weight: bold;
		padding: 8px 16px;
		cursor: pointer;
		transform: translateY(0);
		transition: all 0.2s ease;
	}

	button:hover {
		transform: translateY(-3px);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
	}
	.text-blue {
		color: #2b73b1;
	}
	.text-white {
		color: white;
	}
	.border-blue {
		border: 1px solid #2b73b1;
	}
	.border-none {
		border: none;
	}
	.background-white {
		background-color: white;
	}
	.background-black {
		background-color: #00000069;
	}
	.background-dark {
		background-color: black !important;
	}
</style>
