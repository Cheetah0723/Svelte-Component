<svelte:options tag="paginationbootstrap-component" />

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

	import { createEventDispatcher } from "svelte";

	// import dispatch from "@app/functions/webcomponent";

	export let page: number;
	export let primarycolor: number;

	export let pages: number;
	export let id: string;
	if (!id) id = null;

	if (!primarycolor) {
		primarycolor = null;
	}

	$: {
		if (!page) {
			page = 0;
		} else {
			page = parseInt(page as unknown as string);
		}

		if (!pages) {
			pages = 1;
		} else {
			pages = parseInt(pages as unknown as string);
		}
	}
	import { get_current_component } from "svelte/internal";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		// console.log(`svelte: ${name}`);
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function changePage(newPage: number) {
		// console.log("changepage");

		// page = newPage;
		dispatch("pagechange", {
			page: newPage,
			pages,
		});
	}
</script>

<ul class="pagination">
	{#if pages > 0}
		{#if page > 0}
			<li class="page-item">
				<button style="color:{primarycolor}" class="page-link" on:click={() => changePage(0)}>«</button>
			</li>
			<li class="page-item">
				<button style="color:{primarycolor}" class="page-link" on:click={() => changePage(page - 1)}>&#60;</button>
			</li>
		{:else}
			<li class="page-item disabled"><button class="page-link" disabled>«</button></li>
			<li class="page-item disabled"><button class="page-link" disabled>&#60;</button></li>
		{/if}
		{#if pages > 5 && page > pages - 3}
			<li class="page-item">
				<button style="color:{primarycolor}" class="page-link" on:click={() => changePage(page - 4)}>{page - 4 + 1}</button>
			</li>
		{/if}
		{#if pages > 5 && page > pages - 2}
			<li class="page-item">
				<button style="color:{primarycolor}" class="page-link" on:click={() => changePage(page - 3)}>{page - 3 + 1}</button>
			</li>
		{/if}

		{#if page - 2 > -1}
			<li class="page-item">
				<button style="color:{primarycolor}" class="page-link" on:click={() => changePage(page - 2)}>{page - 2 + 1}</button>
			</li>
		{/if}
		{#if page - 1 > -1}
			<li class="page-item">
				<button style="color:{primarycolor}" class="page-link" on:click={() => changePage(page - 1)}>{page - 1 + 1}</button>
			</li>
		{/if}
		<li class="page-item active"><button style="color:{primarycolor}" class="page-link ">{page + 1}</button></li>

		{#if page + 1 < pages}
			<li class="page-item">
				<button style="color:{primarycolor}" class="page-link" on:click={() => changePage(page + 1)}>{page + 1 + 1}</button>
			</li>
		{/if}
		{#if page + 2 < pages}
			<li class="page-item">
				<button style="color:{primarycolor}" class="page-link" on:click={() => changePage(page + 2)}>{page + 2 + 1}</button>
			</li>
		{/if}

		{#if page < 2 && page + 3 < pages}
			<li class="page-item">
				<button style="color:{primarycolor}" class="page-link" on:click={() => changePage(page + 3)}>{page + 3 + 1}</button>
			</li>
		{/if}
		{#if page === 0 && page + 4 < pages}
			<li class="page-item">
				<button style="color:{primarycolor}" class="page-link" on:click={() => changePage(page + 4)}>{page + 4 + 1}</button>
			</li>
		{/if}

		{#if page < pages - 1}
			<li class="page-item">
				<button style="color:{primarycolor}" class="page-link" on:click={() => changePage(page + 1)}>&#62;</button>
			</li>
			<li class="page-item">
				<button style="color:{primarycolor}" class="page-link" on:click={() => changePage(pages - 1)}>»</button>
			</li>
		{:else}
			<li class="page-item disabled"><button style="color:{primarycolor}" class="page-link" disabled>&#62;</button></li>
			<li class="page-item disabled">
				<button style="color:{primarycolor}" class="page-link" disabled>»</button>
			</li>
		{/if}
	{/if}
</ul>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
