<script lang="ts">
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { ROUTES } from '$lib/constants/routes';

	const excludedRoutes = [ROUTES.AUTH.LOGIN, ROUTES.AUTH.REGISTER, ROUTES.AUTH.RESET_PASSWORD] as const;

	$: shouldShowHeader = !excludedRoutes.includes(
		$page.url.pathname as (typeof excludedRoutes)[number]
	) && !$page.error;

	$: shouldShowFooter = !excludedRoutes.includes(
		$page.url.pathname as (typeof excludedRoutes)[number]
	) && !$page.error;
</script>

{#if shouldShowHeader}
	<Header />
{/if}

<slot />

{#if shouldShowFooter}
	<Footer />
{/if}
