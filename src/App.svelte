<script lang="ts">
	import browser from 'webextension-polyfill';
	import './app.postcss';
	import './style.css';

	import { Badge, Button, Card, Group, Image, Text } from '@svelteuidev/core';
	import Test from './components/Test.svelte';
</script>

<div class="mt-5">
	<Test />
</div>
