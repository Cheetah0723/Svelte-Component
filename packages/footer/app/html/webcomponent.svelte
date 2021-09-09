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
	interface IFooterBottom {}

	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";

	export let id: string;
	export let smallrow: ISmallRow;
	export let brandandcontacts: IBrandAndContacts;
	export let columns: IColumn[];
	export let footerbottom: IFooterBottom;
	export let companyname: string;
	export let companylogouri: string;

	$: {
		if (!id) id = "";
		if (!companyname) companyname = "";
		if (!companylogouri) companylogouri = "";

		if (!columns) {
			columns = null;
		} else {
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
			try {
				smallrow = JSON.parse(smallrow as unknown as string);
			} catch (err) {
				console.error("parseerr?", columns, err);
			}
		}
		if (!footerbottom) {
			footerbottom = null;
		} else {
			try {
				footerbottom = JSON.parse(footerbottom as unknown as string);
			} catch (err) {
				console.error("parseerr?", columns, err);
			}
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

<footer class="border-top" id="webcomponent">
	<slot name="footerheader" class="container">
		<!-- <div class="row">
			<div class="col" style="max-height:40px">
				{#if companylogouri}
					<span><img style="height: 100%;" alt="" src={companylogouri} /></span>
				{/if}

				{companyname}
			</div>
		</div> -->
	</slot>

	<slot name="footercontent" class="container">
		<div class="row">
			<div class="col">
				{#if companylogouri}
					<span><img style="height: 40px" alt="" src={companylogouri} /></span>
				{/if}

				{companyname}
				<div class="text-small">facebook google</div>
			</div>
			{#if columns && columns.length}
				{#each columns as column (column._id)}
					<div class="col">
						<h5 style="text-align: center;">{column.title}</h5>
						<ul class="list-unstyled">
							{#each column.cells as cell (cell.key)}
								<li><button class="btn text-small" on:click={() => footerClick(cell.key)}>{cell.label}</button></li>
							{/each}
						</ul>
					</div>
				{/each}
			{/if}
		</div>
	</slot>
	<slot name="footerpolicy" class="container">
		{#if companyname}
			<div class="row" style="margin: 20px auto 20px auto;font-size:0.9rem">
				<div class="col" style="max-height:20px;text-align:center">Condizioni generali</div>
				<div class="col" style="max-height:20px;text-align:center">privacy policy</div>
				<div class="col" style="max-height:20px;text-align:center">Cookie</div>
			</div>
		{/if}
	</slot>
	<slot name="footerbottom" class="container">
		{#if companyname}
			<div class="row">
				<div class="col" style="max-height:20px;text-align:center;font-size:0.8rem">
					<!-- {#if companylogouri}
						<span><img style="height: 100%;" alt="" src={companylogouri} /></span>
					{/if} -->

					© 2017-2018 {companyname}
				</div>
			</div>
		{/if}
	</slot>
</footer>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
