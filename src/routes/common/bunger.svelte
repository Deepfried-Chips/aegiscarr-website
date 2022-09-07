<script>
	import { fly } from "svelte/transition"
	import wordmark from "$lib/resources/img/wordmark-full.png"

	export let visible = false;
</script>

{#if visible}
	<div class='drawer__background' transition:fly={{x: -100, duration: 1000}}>
		<img src='{wordmark}' alt='// Aegiscarr'>
	</div>
{/if}