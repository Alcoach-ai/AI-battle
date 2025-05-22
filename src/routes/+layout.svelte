<script lang="ts">
	import { page } from '$app/stores';
	import Footer from '$lib/components/Footer.svelte';
	import { ROUTES } from '$lib/constants/routes';

	const excludedRoutes = [ROUTES.AUTH.LOGIN, ROUTES.AUTH.REGISTER] as const;

	$: shouldShowFooter = !excludedRoutes.includes(
		$page.url.pathname as (typeof excludedRoutes)[number]
	) && !$page.error;
</script>

<slot />

{#if shouldShowFooter}
	<Footer />
{/if}
