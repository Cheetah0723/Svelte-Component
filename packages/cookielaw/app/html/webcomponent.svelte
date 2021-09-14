<svelte:options tag="cookielaw-component" />

<script lang="ts">
	/**
	 * Svelte Video Gallery WebComponent
	 * =====================
	 *
	 * @contributors: Dario Caruso <dev@dariocaruso.info> (https://dariocaruso.info)
	 *
	 * @license: MIT License
	 *
	 */

	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";

	export let id: string;
	export let allowdecline: "yes" | "no";
	let isSet: boolean;
	$: {
		if (!id) id = "";
		isSet = localStorage.getItem(localStorageItem) ? true : false;
		if (allowdecline !== "yes") allowdecline = "no";
	}
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	const localStorageItem = "cookielaw";
	function dispatchChoose(accepted: boolean) {
		console.info("accept cookie law");
		const name = "acceptCookieLaw";
		const detail = { accepted };
		const choose = accepted ? "yes" : "no";
		localStorage.setItem(localStorageItem, choose);
		isSet = true;
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
</script>

<div class="alert text-center cookiealert {isSet ? '' : 'show'}" role="alert">
	<b>Do you like cookies?</b> &#x1F36A; We use cookies to ensure you get the best experience on our website.
	<a href="https://cookiesandyou.com/" target="_blank">Learn more</a>

	<button type="button" on:click={() => dispatchChoose(true)}> I agree </button>
	{#if allowdecline === "yes"}<button type="button" on:click={() => dispatchChoose(false)}> I decline </button>{/if}
</div>

<style lang="scss">
	// @import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
