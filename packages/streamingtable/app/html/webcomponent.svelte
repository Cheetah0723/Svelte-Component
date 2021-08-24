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

	interface IFilter {
		key: string;
		value?: string;
		type?: "datetime" | "string";
		start?: Date;
		end?: Date;
	}
	interface ITableHeader {
		label: string;
		key: string;
		type?: "datetime" | "string";
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
	export let actions: string;

	if (!primarycolor) {
		primarycolor = null;
	}

	let pages = 0;

	let cardItems: ICard[];

	let tableHeaders: ITableHeader[] = [];
	let searchOnRangeIsPresent = false;

	let filters: IFilter[] = [];
	let actionButtons: {
		name: string;
		type: "icon" | "text";
		iconOrText: string;
		btnClass?: string;
	}[];

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
			if (!headers) throw new Error("no headers");
			if (!rows) throw new Error("no rows");

			if (headers) {
				tableHeaders = JSON.parse(headers);
				if (tableHeaders.find((f) => f.type === "datetime")) searchOnRangeIsPresent = true;
			}
			if (actions) {
				actionButtons = JSON.parse(actions);
			}
			cardItems = JSON.parse(rows);
			if (filters?.length) {
				for (const filter of filters) {
					if (filter.type === "datetime") {
						if (filter.start) {
							cardItems = cardItems.filter((f) => moment(getObjVal(f, filter)).valueOf() >= moment(filter.start).valueOf());
						}
						if (filter.end) {
							cardItems = cardItems.filter((f) => moment(getObjVal(f, filter)).valueOf() <= moment(filter.end).valueOf());
						}
					} else {
						cardItems = cardItems.filter((f) => getObjVal(f, filter).includes(filter.value));
					}
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
		} else if (opts.type === "datetime") {
			return opts.format ? moment(value).format(opts.format) : moment(value).format();
		} else {
			return "";
		}
	}

	function removeFilter(key: string) {
		if (filters.find((f) => f.key === key)) {
			const filter = filters.find((f) => f.key === key);
			filters = filters.filter((f) => f.key !== key);
		}
	}
	function setFilter(filter: IFilter) {
		const filterExist = filters.find((f) => f.key === filter.key);

		if (filterExist) {
			filterExist.key = filter.key;
			filterExist.type = filter.type;
			filterExist.value = filter.value;
			filterExist.start = filter.start;
			filterExist.end = filter.end;

			filters = filters;
		} else {
			filters.push({
				key: filter.key,
				type: filter.type,
				value: filter.value,
				start: filter.start,
				end: filter.end,
			});
			filters = filters;
		}
	}

	function searchInput(element, h: ITableHeader) {
		const value = element.value;
		console.log("searchInput", value, h.key);
		if (value && value.length) {
			setFilter({
				key: h.key,
				type: h.type,
				value,
			});
		} else {
			removeFilter(h.key);
		}
	}
	function changeStartDate(target, th) {
		const newDate = target.value;
		console.log(newDate);
		const filterExists = filters.find((f) => f.key === th.key);
		setFilter({
			key: th.key,
			type: th.type,
			start: moment(newDate, "YYYY-MM-DD").toDate(),
			end: filterExists && filterExists.end ? filterExists.end : undefined,
		});
	}
	function changeEndDate(target, th) {
		const newDate = target.value;
		console.log(newDate);
		const filterExists = filters.find((f) => f.key === th.key);
		setFilter({
			key: th.key,
			type: th.type,
			end: moment(newDate, "YYYY-MM-DD").toDate(),
			start: filterExists && filterExists.start ? filterExists.start : undefined,
		});
	}

	function handleClickOnAction(itemId: string, action: string) {
		console.log("action", itemId, action);
		dispatch("tableaction", {
			itemId,
			action,
		});
	}
</script>

<svelte:head>
	<script defer src="https://unpkg.com/@htmlbricks/paginationbootstrap-component@latest/release/paginationbootstrap.js"></script>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
	<!--
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />

	-->
</svelte:head>

<div id="webcomponent">
	<div class="container-fluid">
		{#if tableHeaders && tableHeaders.length}
			<table class="table table-responsive table-striped table-hover align-middle" style="width:100%;text-align:left">
				<thead>
					<tr>
						{#each tableHeaders as th (th.key)}
							<th scope="col">
								{th.label}
							</th>
						{/each}
						{#if actionButtons}
							<th scope="col"> azioni </th>
						{/if}
					</tr>
					{#if !searchOnRangeIsPresent}
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
					{/if}
					{#if searchOnRangeIsPresent}
						<tr>
							{#each tableHeaders as th (th.key)}
								<th scope="col">
									{#if th.search}
										{#if th.type && th.type === "datetime"}
											<span style="width:50px;display:inline-block">Inizio</span>
											<input
												on:input={(element) => changeStartDate(element.target, th)}
												type="date"
												class="form-control"
												style="max-width: 200px;display:inline-block"
											/>
										{/if}
										{#if !th.type || th.type === "string"}
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
									{/if}
									{#if !th.search}
										&nbsp;
									{/if}
								</th>
							{/each}
						</tr>
						<tr>
							{#each tableHeaders as th (th.key)}
								<th scope="col">
									{#if th.search && th.type && th.type === "datetime"}
										<span style="width:50px;display:inline-block">Fine</span>
										<input
											on:input={(element) => changeEndDate(element.target, th)}
											type="date"
											class="form-control"
											style="max-width: 200px;display:inline-block"
										/>
									{/if}
								</th>
							{/each}
						</tr>
					{/if}
				</thead>
				<tbody>
					{#if cardItems?.length}
						{#each cardItems.slice(page * size, (page + 1) * size) as item (item._id)}
							<tr>
								<th scope="row">{getObjVal(item, tableHeaders[0])}</th>
								{#if tableHeaders.length > 1}
									{#each tableHeaders.slice(1, tableHeaders.length) as td (td.key)}
										<td>{getObjVal(item, td) || ""}</td>
									{/each}
								{/if}
								{#if actionButtons}
									<td>
										{#each actionButtons as abutton (abutton.name)}
											{#if abutton.type === "text"}
												<button
													on:click={() => handleClickOnAction(item._id, abutton.name)}
													type="button"
													class="btn btn-{abutton.btnClass || 'link'}"
													style="margin-right:10px">{abutton.iconOrText}</button
												>
											{/if}
											{#if abutton.type === "icon"}
												<button
													on:click={() => handleClickOnAction(item._id, abutton.name)}
													type="button"
													class="btn btn-{abutton.btnClass || 'light'}"
													style="margin-right:10px"
													><i class="bi-{abutton.iconOrText}" />
												</button>
											{/if}
										{/each}
									</td>
								{/if}
							</tr>
						{/each}
					{/if}
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
