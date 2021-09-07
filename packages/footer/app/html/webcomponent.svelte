<svelte:options tag="footerbootstrap-component" />

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

	interface IRow {}
	interface IBrandAndContacts {}
	interface ISmallRow {}

	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";

	export let id: string;
	export let smallrow: ISmallRow;
	export let columns: IRow[];
	export let brandandcontacts: IBrandAndContacts;

	$: {
		if (!id) id = "";
		if (!smallrow) smallrow = "";
		if (!columns) {
			columns = [];
		} else {
			columns = JSON.parse(columns as unknown as string);
		}
		if (!brandandcontacts) {
			brandandcontacts = null;
		} else {
			brandandcontacts = JSON.parse(brandandcontacts as unknown as string);
		}
		if (!smallrow) {
			smallrow = null;
		} else {
			smallrow = JSON.parse(smallrow as string);
		}
		try {
		} catch (err) {}
	}
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		// console.log(`svelte: ${name}`);
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	function footerClick(elClick: string) {
		dispatch("footerClick", {
			elClick,
		});
	}
</script>

<footer class="container-fluid" id="webcomponent">ff</footer>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
