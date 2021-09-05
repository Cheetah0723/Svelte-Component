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
	export let id: string;
	export let opened: boolean;
	if (opened) {
		opened = true;
	} else {
		opened = false;
	}

	$: {
		if (!id) id = null;
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
<div id="webcomponent">
	<slot name="test" />
	<div
		class="offcanvas offcanvas-start show"
		tabindex="-1"
		aria-labelledby="offcanvasExampleLabel"
		style="visibility: visible; {opened ? 'transform:none!important' : 'transform:translateX(-100%)!important;'}"
	>
		<div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="min-height:100vh">
			<h5 class="offcanvas-title" style="margin-bottom:30px">
				Offcanvas
				<!-- 
				<button
					on:click={() => {
						opened = false;
					}}
					type="button"
					class="btn-close text-reset"
					style="float:right"
				/> -->
			</h5>

			<ul class="nav nav-pills flex-column mb-auto">
				<li class="nav-item">
					<a href="#" class="nav-link active" aria-current="page">
						<svg class="bi me-2" width="16" height="16"><use xlink:href="#home" /></svg>
						Home
					</a>
				</li>
				<li>
					<a href="#" class="nav-link link-dark">
						<svg class="bi me-2" width="16" height="16"><use xlink:href="#speedometer2" /></svg>
						Dashboard
					</a>
				</li>
				<li>
					<a href="#" class="nav-link link-dark">
						<svg class="bi me-2" width="16" height="16"><use xlink:href="#table" /></svg>
						Orders
					</a>
				</li>
				<li>
					<a href="#" class="nav-link link-dark">
						<svg class="bi me-2" width="16" height="16"><use xlink:href="#grid" /></svg>
						Products
					</a>
				</li>
				<li>
					<a href="#" class="nav-link link-dark">
						<svg class="bi me-2" width="16" height="16"><use xlink:href="#people-circle" /></svg>
						Customers
					</a>
				</li>
			</ul>
			<hr />
			text
		</div>
	</div>

	<div
		on:click={() => {
			opened = false;
		}}
		class="modal-backdrop fade {opened ? 'show' : ''}"
		style="z-index:1040; {opened ? '' : 'visibility:hidden'}"
	/>
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
