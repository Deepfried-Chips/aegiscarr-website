<script>
	import Bunger from "./bunger.svelte";

	let visible = false;
</script>

<div class='header'>
	<button on:click={() => {visible = !visible}}>Toggle</button>
</div>
<Bunger visible={visible}/>