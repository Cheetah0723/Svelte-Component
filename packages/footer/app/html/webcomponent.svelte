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
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";

	export let companybrandname: string;
	export let companylogouri: string;
	export let id: string;
	export let pagetitle: string;
	export let switchopen: string;

	let isOpen: boolean;
	$: {
		if (!companybrandname) companybrandname = "";
		if (!companylogouri) companylogouri = "";
		if (!id) id = "";
		if (!pagetitle) pagetitle = "";
		if (!switchopen) {
			switchopen = "";
		} else {
			isOpen = true;
		}
	}
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		// console.log(`svelte: ${name}`);
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function switchMenu() {
		isOpen = !isOpen;
		dispatch("navmenuswitch", {
			isOpen,
		});
	}
</script>

<nav id="webcomponent">
	<div style="flex-grow: 1;text-align:left;" class="navitem">
		<button on:click={() => switchMenu()} class="btn"
			><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
				<path
					fill-rule="evenodd"
					d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
				/>
			</svg>
		</button>
		<slot name="brand">
			{#if companylogouri}<img alt="" src={companylogouri} />{/if}
			{companybrandname}
		</slot>
	</div>

	<div class="navitem" style="flex-grow: 5">
		<slot name="right-sm-bar">
			<!-- <div style="text-align:right;margin-right:10px">{pagetitle}</div> -->
		</slot>
		<slot name="right-lg-bar">
			<!-- <div style="text-align:right;margin-right:10px">{pagetitle}</div> -->
		</slot>
		<slot name="right-bar">
			<!-- <div style="text-align:right;margin-right:10px">{pagetitle}</div> -->
		</slot>
	</div>
</nav>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
