<script lang="ts">
	import browser from 'webextension-polyfill';
	import { onMount, onDestroy } from 'svelte';

	let count = 0;
	let message: string | null = null;

	onMount(async () => {
		const data = await browser.storage.sync.get('count');
		if (data.count) count = data.count;
		browser.runtime.onMessage.addListener(handleMessageEvent);
	});

	onDestroy(() => {
		browser.runtime.onMessage.removeListener(handleMessageEvent);
	});

	function handleMessageEvent(request: any, _: any, sendResponse: any) {
		if (request.type === 'count_updated') {
			sendResponse({ message: `from ${count} to ${request.count}` });
			count = request.count;
		}
	}

	const handleSave = async () => {
		await browser.storage.sync.set({ count });
		message = 'Updated!';
		try {
			const res = await browser.runtime.sendMessage({ count, type: 'count_updated' });
			const lastError = browser.runtime.lastError;
			if (lastError) {
				console.error('TODO:', lastError.message);
				return;
			}
			message += ` ${res.message}`;

			setTimeout(() => {
				message = null;
			}, 2000);
		} catch (error) {
			console.error(error);

			setTimeout(() => {
				message = error as string;
			}, 2000);
		}
	};

	const increment = () => (count += 1);
	const decrement = () => (count -= 1);
</script>

<div class=" bg-blue-50 min-w-[20rem] p-4 flex flex-col gap-4">
	<p class="text-blue-800 text-xl">
		Current count: <span class="font-extrabold">{count}</span>
	</p>
	<div class="flex gap-2">
		<button on:click={decrement}>-</button>
		<button on:click={increment}>+</button>
		<button class="ml-auto" on:click={handleSave}>Save</button>
		{#if message}<span class="font-bold text-blue-800">{message}</span>{/if}
	</div>
</div>

<style scoped>
	button {
		color: theme('colors.blue.700');
		padding: theme('spacing.2') theme('spacing.4');
		font-size: theme('fontSize.base');
		border: 1px solid theme('borderColor.blue.400');
		box-shadow: theme('boxShadow.lg');
		background-color: theme('backgroundColor.blue.50');
	}

	button:hover,
	button:focus {
		background-color: theme('colors.blue.800');
		color: theme('colors.blue.50');
	}
</style>
