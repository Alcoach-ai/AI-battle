import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
<<<<<<< HEAD
	kit: { adapter: adapter()
	 }
=======
	kit: { adapter: adapter() }
>>>>>>> a4c496b54f85325d030f0f02faaeec4346fbb4b7
};

export default config;
