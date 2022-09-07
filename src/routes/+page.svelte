<script>
	import Header from "./common/header.svelte";
</script>

<svelte:head>
	<title>Aegiscarr's Den</title>
	<meta property="og:site_name" content="Aegiscarr">
	<meta property="og:url" content="https://aegiscarr.com">
	<meta property="og:title" content="Name of your page">
	<meta property="og:description" content="A little description of this page">
	<meta property="og:type" content="website">
	<meta name="og:image" itemprop="image" content="static/img/wordmark-full.png">
</svelte:head>

<div class='page__inner'>
	<Header/>
</div>

<style>
    @import "$lib/css/theme.css";
</style>