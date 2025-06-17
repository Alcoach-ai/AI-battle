<script>
	export let selectedTab = 'Program';
	let navItems = ['Program', 'Progress', 'Form', 'About'];
</script>

<nav class="navbar">
	<ul class="nav-list">
		{#each navItems as item}
			<li
				class="nav-item {selectedTab === item ? 'active' : ''}"
				on:click={() => (selectedTab = item)}
			>
				{item}
			</li>
		{/each}
	</ul>
</nav>

<style>
	.navbar {
		padding: 1rem 2rem;
	}

	.nav-list {
		list-style: none;
		display: flex;
		gap: 2rem;
		margin: 0;
		padding: 0;
	}

	.nav-item {
		cursor: pointer;
		position: relative;
		padding-bottom: 4px;
		color: #333;
		transition: color 0.3s;
	}

	.nav-item:hover {
		color: blue;
	}

	.nav-item::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		height: 2px;
		width: 0%;
		background-color: blue;
		transition: width 0.3s;
	}

	.nav-item:hover::after {
		width: 100%;
	}
	.active {
		color: blue;
		font-weight: bold;
	}
	.active::after {
		width: 100%;
	}
</style>
