<svelte:options tag="streamingtablebootstrap-webcomponent" />

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

	import moment from "moment-with-locales-es6";
	import { createEventDispatcher } from "svelte";

	// import dispatch from "@app/functions/webcomponent";

	interface ITableHeader {
		label: string;
		key: string;
		type?: "date" | "string";
		format?: string;
		search?: boolean;
	}
	interface ICard {
		videoSrc: string;
		title?: string;
		description?: string;
		time?: Date;
		pageUri?: string;
		_id: string;
	}

	export let rows: string;
	export let size: number;
	export let page: number;
	export let primarycolor: string;
	export let headers: string;

	if (!primarycolor) {
		primarycolor = null;
	}

	let pages = 0;

	let cardItems: ICard[];
	let initialDate: Date;
	let lastDate: Date;
	let firstCardData: Date;
	let lastCardData: Date;
	let tableHeaders: ITableHeader[] = [];

	let filters: {
		key: string;
		value?: string;
		type?: "date" | "string";
		start?: Date;
		end?: Date;
	}[] = [];

	$: {
		console.log("compute", filters);
		if (!size) {
			size = 12;
		} else {
			size = parseInt(size as unknown as string);
		}
		if (!page) {
			page = 0;
		} else {
			page = parseInt(page as unknown as string);
		}

		try {
			if (headers) {
				tableHeaders = JSON.parse(headers);
			}

			cardItems = JSON.parse(rows);
			if (filters?.length) {
				for (const filter of filters) {
					cardItems = cardItems.filter((f) => getObjVal(f, filter).includes(filter.value));
				}
			}
			let cc = 0;
			for (const c of cardItems) {
				if (!c._id) {
					c._id = `${cc.toString() + c.title}`;
				}

				cc++;
			}
			if (cardItems.length) {
				pages = Math.floor(cardItems.length / size) + (cardItems.length % size ? 1 : 0);
			}

			// const videos = component.getElementsByTagName("video");
			// for (let video of videos) {
			// 	video.load();
			// }
		} catch (err) {
			console.error("cards data error:", err);
		}

		// console.log("end computed");
		// console.log(size, page, pages, cardItems.length, initialDate, lastDate);

		// will only get called when the `color` changed.
	}
	import { get_current_component } from "svelte/internal";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		// console.log(`svelte: ${name}`);
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	function changePage(el) {
		// console.log("changepage");

		page = el.detail.page;
		dispatch("pagechange", {
			page,
			rows: getCurrentCards(),
		});
	}

	function getCurrentCards() {
		return cardItems.slice(page * size, (page + 1) * size);
	}

	// async function getHelloWorld() {
	// 	const { app } = await webcomponent({ text: "hello-world" });

	// 	return app();
	// }

	function getObjVal(obj, opts: { key: string; type?: string; format?: string }): string {
		if (!opts) {
			return "";
		}
		let value;
		if (!opts.key.includes(".")) {
			value = obj[opts.key];
		} else {
			let val = obj;

			for (const k of opts.key.split(".")) {
				if (!val[k]) {
					value = undefined;
					break;
				}
				val = val[k];
				value = val;
			}
		}

		if (!value) {
			return "";
		} else if (!opts.type || opts.type === "string") {
			return value;
		} else if (opts.type === "datetime" && opts.format) {
			return moment(value).format(opts.format);
		} else {
			return "";
		}
	}

	function searchInput(element, h: ITableHeader) {
		const value = element.value;
		console.log("searchInput", value, h.key);
		if (value && value.length) {
			const filterExist = filters.find((f) => f.key === h.key);

			if (filterExist) {
				filterExist.value = value;
				filters = filters;
			} else {
				filters.push({
					key: h.key,
					type: h.type,
					value,
				});
				filters = filters;
			}
		} else {
			if (filters.find((f) => f.key === h.key)) {
				const filter = filters.find((f) => f.key === h.key);
				filter.value = value;
				filters = filters.filter((f) => f.key !== h.key);
			}
		}
	}
</script>

<svelte:head>
	<script defer src="https://unpkg.com/@htmlbricks/paginationbootstrap-component@0.0.7/release/paginationbootstrap.js"></script>
</svelte:head>

<div id="webcomponent">
	<div class="container-fluid">
		{#if tableHeaders && tableHeaders.length && cardItems && cardItems.length}
			<table class="table table-responsive table-striped table-hover align-middle" style="width:100%;text-align:left">
				<thead>
					<tr>
						{#each tableHeaders as th (th.key)}
							<th scope="col">
								{th.label}
							</th>
						{/each}
					</tr>
					<tr>
						{#each tableHeaders as th (th.key)}
							<th scope="col">
								{#if th.search}
									<input
										on:input={(element) => searchInput(element.target, th)}
										type="text"
										style="width:auto"
										class="form-control"
										placeholder="..."
										aria-label="Search"
										aria-describedby="search"
									/>
								{/if}
								{#if !th.search}
									&nbsp;
								{/if}
							</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each cardItems.slice(page * size, (page + 1) * size) as item (item._id)}
						<tr>
							<th scope="row">{getObjVal(item, tableHeaders[0])}</th>
							{#if tableHeaders.length > 1}
								{#each tableHeaders.slice(1, tableHeaders.length) as td (td.key)}
									<td>{getObjVal(item, td) || ""}</td>
								{/each}
							{/if}
						</tr>
					{/each}
				</tbody>
			</table>

			<nav style="margin-top:20px" aria-label="Page navigation example">
				<paginationbootstrap-component on:pagechange={changePage} page={page.toString()} pages={pages.toString()} primarycolor={primarycolor || ""} />
			</nav>
		{/if}
	</div>
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
