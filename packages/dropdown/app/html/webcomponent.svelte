<svelte:options tag="bootstrapdropdown-component" />

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

	interface IListItem {
		key: string;
		label: string;
		badge?: number;
		group?: string;
	}

	import { dictionary } from "../functions/i18n";

	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";
	export let id: string;
	export let show: "yes" | "no";
	export let list: IListItem[];
	export let direction: "left" | "right" | "top" | "bottom";
	export let groups: { key: string; label: string }[];

	let opened = false;
	$: {
		if (!id) {
			id = null;
		}
		if (!groups) {
			groups = null;
		} else {
			try {
				groups = JSON.parse(groups as unknown as string);
			} catch (err) {}
		}
		if (!direction) {
			direction = "bottom";
		}
		if (!list) {
			list = [];
		} else {
			try {
				list = JSON.parse(list as unknown as string);
			} catch (err) {}
		}
		if (show === "no") {
			show = "no";
		} else {
			show = "yes";
		}
		if (show === "yes") {
			opened = true;
		} else {
			opened = false;
		}
	}

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		// console.log(`svelte: ${name}`);
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	//test@tt.com
	function clickOnList(key: string) {
		dispatch("clickOnDropdownList", { key });
	}
</script>

<div class="dropdown">
	<button
		class="btn btn-secondary dropdown-toggle"
		on:click={() => (opened = !opened)}
		type="button"
		data-bs-toggle="dropdown"
		aria-expanded={opened ? "true" : "false"}
	>
		<slot name="dropdownbutton">Dropdown button</slot>
	</button>
	{#if list?.length}
		<ul class="dropdown-menu {opened ? 'show' : ''}">
			{#each list as listItem (listItem.key)}
				<li><button on:click={() => clickOnList(listItem.key)} class="dropdown-item">{listItem.label}</button></li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
