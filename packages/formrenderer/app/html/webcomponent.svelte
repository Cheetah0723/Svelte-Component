<svelte:options tag="formrenderer-component" />

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

	const onSubmit = () => {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
</script>

<style lang="scss">
	// @import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
