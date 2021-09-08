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

	interface IColumn {
		_id?: string;
		cells: { label: string; key: string }[];
		title: string;
	}
	interface IBrandAndContacts {
		companyName: string;
		companyLogoUri: string;
	}
	interface ISmallRow {}

	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";

	export let id: string;
	export let smallrow: ISmallRow;
	export let columns: IColumn[];
	export let brandandcontacts: IBrandAndContacts;

	$: {
		if (!id) id = "";
		if (!smallrow) smallrow = "";
		if (!columns) {
			columns = null;
		} else {
			console.log(columns);
			try {
				columns = JSON.parse(columns as unknown as string);
				console.log(columns);

				let n = 0;
				for (const c of columns) {
					if (!c._id) c._id = "ccc_" + n.toString();
					n++;
				}
			} catch (err) {
				console.error("parseerr?", columns, err);
			}
		}


		if (!brandandcontacts) {
			brandandcontacts = null;
		} else {
			try {
				brandandcontacts = JSON.parse(brandandcontacts as unknown as string);
			} catch (err) {
				console.error("parseerr?", columns, err);
			}
		}
		if (!smallrow) {
			smallrow = null;
		} else {
			smallrow = JSON.parse(smallrow as string);
		}
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

<footer class="container-fluid" id="webcomponent">
	<slot name="footerheader">
		<div class="row">a</div>
	</slot>

	<slot name="footercontent">
		{#if columns && columns.length}
			<div class="row">
				{#each columns as column (column._id)}
					<div class="col">
						<div>{column.title}</div>
						{#each column.cells as cell (column._id)}
							<button on:click={() => footerClick(cell.key)}>{cell.label}</button>
						{/each}
					</div>
				{/each}
			</div>
		{/if}
	</slot>
	<slot name="footerbottom">
		<div class="row">a</div>
	</slot>
</footer>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
