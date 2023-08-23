import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import webExtension, { readJsonFile } from 'vite-plugin-web-extension';

function generateManifest() {
	const manifest = readJsonFile('src/manifest.json');
	const pkg = readJsonFile('package.json');
	return {
		name: pkg.name,
		description: pkg.description,
		version: pkg.version,
		...manifest,
	};
}

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svelte(),
		webExtension({
			additionalInputs: ['src/app/app.html', 'src/app/app.ts'],
			browser: process.env.TARGET || 'chrome',
			manifest: generateManifest,
			watchFilePaths: ['package.json', 'manifest.json'],
			webExtConfig: {
				startUrl: 'https://www.youtube.com/',
			},
		}),
	],
});
