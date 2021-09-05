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

	interface INavLink {
		key: string;
		icon: string;
		group: string;
		label: string;
	}

	import { dictionary } from "../functions/i18n";

	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";
	export let id: string;
	export let opened: boolean;
	export let navlinks: string;
	export let navpage: string;
	let navLinks: INavLink[];
	if (opened) {
		opened = true;
	} else {
		opened = false;
	}

	$: {
		if (!id) id = null;
		if (!navpage) {
			navpage = "home";
		}
		if (navlinks) {
			try {
				navLinks = JSON.parse(navlinks);
			} catch (err) {
				console.error(err);
			}
		} else {
			navLinks = [];
			navlinks = null;
		}
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
				{#each navLinks as navLink (navLink.key)}
					<li class="nav-item">
						{#if navLink.key === navpage}
							<button style="width: 100%;text-align:left" class="nav-link active" aria-current="page">
								<i class="bi me-2 bi-{navLink.icon}" />
								{navLink.label}
							</button>
						{:else}
							<button class="nav-link link-dark">
								<i class="bi me-2 bi-{navLink.icon}" />
								{navLink.label}
							</button>
						{/if}
					</li>
				{/each}
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

	i {
		min-width: 16px;
		display: inline-block;
	}
</style>
