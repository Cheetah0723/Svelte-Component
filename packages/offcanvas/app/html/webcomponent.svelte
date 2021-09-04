<svelte:options tag="offcanvas-component" />

<script lang="ts">
	/**
	 * Svelte Video Login/Register/Forget Password WebComponent
	 * =====================
	 *
	 * @contributors: Dario Caruso <dev@dariocaruso.info> (https://dariocaruso.info)
	 *
	 * @license: MIT License
	 *
	 */

	import { dictionary } from "../functions/i18n";

	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";
	export let opened: boolean;
	if (opened) {
		opened = true;
	} else {
		opened = false;
	}
	console.log(opened);
	$: {
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
<div id="webcomponent">
	<div
		class="offcanvas offcanvas-start {opened ? 'show' : ''}"
		tabindex="-1"
		id="offcanvasExample"
		aria-labelledby="offcanvasExampleLabel"
		style={opened ? "visibility: visible;" : ""}
	>
		<div class="offcanvas-header">
			<h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
			<button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
		</div>
		<div class="offcanvas-body">
			<div>Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.</div>
			<div class="dropdown mt-3">
				<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown"> Dropdown button </button>
				<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
					<li><a class="dropdown-item" href="#">Action</a></li>
					<li><a class="dropdown-item" href="#">Another action</a></li>
					<li><a class="dropdown-item" href="#">Something else here</a></li>
				</ul>
			</div>
		</div>
	</div>
	{#if opened}
		<div
			on:click={() => {
				opened = false;
			}}
			class="modal-backdrop fade show"
			style="z-index:1040"
		/>
	{/if}
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
