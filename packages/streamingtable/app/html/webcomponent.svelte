<svelte:options tag="streamingtablebootstrap-webcomponent" />

<script lang="ts">
	/**
	 * Svelte Table WebComponent
	 * =====================
	 *
	 * @contributors: Dario Caruso <dev@dariocaruso.info> (https://dariocaruso.info)
	 *
	 * @license: MIT License
	 *
	 */

	import moment from "moment-with-locales-es6";
	import { createEventDispatcher } from "svelte";
	import pkg from "../../package.json";

	// import dispatch from "@app/functions/webcomponent";

	interface IFilter {
		key: string;
		value?: string;
		type?: "datetime" | "string" | "enum";
		start?: Date;
		end?: Date;
	}
	interface ITableHeader {
		label: string;
		key: string;
		type?: "datetime" | "string" | "enum" | "actions";
		format?: string;
		search?: boolean;
		click?: boolean;
		select?: string[];
		nosort?: boolean;
		sortBy?: "asc" | "desc" | "none";
	}

	interface IRow {
		_id: string;
		_actions?: IActionButton[];
		[k: string]: string | IActionButton[];
	}

	interface IActionButton {
		name: string;
		type: "icon" | "text";
		iconOrText: string;
		btnClass?: string;
		disabled?: boolean;
	}

	export let id: string;
	export let externalfilter: string;

	export let rows: string;
	export let size: number;
	export let page: number;
	export let pages: number;
	export let primarycolor: string;
	export let headers: string;
	export let actions: string;
	export let selectactions: string;
	export let selectrow: string;
	export let enableselect: string;
	if (!primarycolor) {
		primarycolor = null;
	}
	if (!id) {
		id = null;
	}
	let selectActionsbuttons: any[];
	let rowItems: IRow[];

	let tableHeaders: ITableHeader[] = [];
	let searchOnRangeIsPresent = false;

	let filters: IFilter[] = [];
	let actionButtons: IActionButton[];

	let selectedItems: string[] = [];
	let sortedBy: string;
	let sortedDirection: string;
	$: {
		if (!externalfilter) {
			externalfilter = null;
		}
		if (!pages) {
			pages = 1;
		} else {
			pages = Number(pages);
		}
		if (!selectactions) {
			selectActionsbuttons = null;
			selectactions = null;
		} else {
			selectActionsbuttons = JSON.parse(selectactions);
		}

		if (!selectrow) {
			selectrow = null;
		}
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
				tableHeaders.forEach((m) => {
					if (!m.sortBy) m.sortBy = "none";
					if (!m.type) m.type = "string";
				});
			}
			if (actions) {
				actionButtons = JSON.parse(actions);
			} else {
				actions = null;
			}
			rowItems = JSON.parse(rows);
			if (filters?.length && !externalfilter) {
				for (const filter of filters) {
					if (filter.type === "datetime") {
						if (filter.start) {
							rowItems = rowItems.filter((f) => moment(getObjVal(f, filter)).valueOf() >= moment(filter.start).valueOf());
						}
						if (filter.end) {
							rowItems = rowItems.filter((f) => moment(getObjVal(f, filter)).valueOf() <= moment(filter.end).valueOf());
						}
					} else {
						rowItems = rowItems.filter((f) => getObjVal(f, filter).includes(filter.value));
					}
				}
			}

			if (sortedBy && !externalfilter) {
				console.log("resort");
				if (sortedDirection === "asc")
					rowItems = rowItems.sort((a, b) => {
						if (a === b) return 0;
						if (!a[sortedBy]) return 1;
						if (!b[sortedBy]) return -1;

						if ((a[sortedBy] as string).toUpperCase() < (b[sortedBy] as string).toUpperCase()) return 1;
						if ((a[sortedBy] as string).toUpperCase() > (b[sortedBy] as string).toUpperCase()) return -1;

						return 0;
					});
				if (sortedDirection === "desc")
					rowItems = rowItems.sort((a, b) => {
						if (a === b) return 0;
						if (!a[sortedBy]) return -1;
						if (!b[sortedBy]) return 1;

						if ((a[sortedBy] as string).toUpperCase() < (b[sortedBy] as string).toUpperCase()) return -1;
						if ((a[sortedBy] as string).toUpperCase() > (b[sortedBy] as string).toUpperCase()) return 1;

						return 0;
					});
			}

			if (rowItems.length && (!externalfilter || !pages)) {
				pages = Math.floor(rowItems.length / size) + (rowItems.length % size ? 1 : 0);
			}

			// const videos = component.getElementsByTagName("video");
			// for (let video of videos) {
			// 	video.load();
			// }
		} catch (err) {}
		// sortByKeyToggle = (key: string) => {
		// 	console.log(key);
		// 	const h = tableHeaders.find((f) => f.key === key);
		// 	console.log(h);

		// 	if (!h.sortBy || h.sortBy === "none") {
		// 		h.sortBy = "asc";
		// 	} else if (h.sortBy === "asc") {
		// 		h.sortBy = "desc";
		// 	} else if (h.sortBy === "desc") {
		// 		h.sortBy = null;
		// 	}
		// 	// rowItems = rowItems.sort((a, b) => {
		// 	// 	return b[key] - a[key];
		// 	// });
		// };
		// console.log("end computed");
		// console.log(size, page, pages, rowItems.length, initialDate, lastDate);

		// will only get called when the `color` changed.
		console.log(sortedBy, sortedDirection);
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

		if (!externalfilter) page = el.detail.page;
		selectedItems.length = 0;

		dispatch("pagechange", {
			page: el.detail.page,
		});
	}

	// async function getHelloWorld() {
	// 	const { app } = await webcomponent({ text: "hello-world" });

	// 	return app();
	// }

	function getObjVal(obj: IRow, opts: { key: string; type?: string; format?: string }): string {
		if (!opts) {
			return "";
		}
		let value;
		if (!opts.key.includes(".")) {
			value = obj[opts.key];
		} else {
			let val: any = obj;

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
		} else if (!opts.type || opts.type === "string" || opts.type === "enum") {
			return value;
		} else if (opts.type === "datetime") {
			return opts.format ? moment(value).format(opts.format) : moment(value).format();
		} else {
			return "";
		}
	}

	function removeFilter(key: string) {
		dispatch("removeFilter", {
			key,
		});
		if (filters.find((f) => f.key === key)) {
			filters = filters.filter((f) => f.key !== key);
		}

		selectedItems.length = 0;
	}
	function setFilter(filter: IFilter) {
		dispatch("changeFilter", {
			filter,
		});
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

		selectedItems.length = 0;
	}

	function searchInput(element, h: ITableHeader) {
		const value = element.value;
		if (h.type !== "actions" && value && value.length) {
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

	function handleClickOnCustomAction(itemId: string, action: string) {
		console.log("action", itemId, action);
		dispatch("tableCustomActionClick", {
			itemId,
			action,
		});
	}
	function handleClickOnAction(itemId: string, action: string) {
		console.log("action", itemId, action);
		dispatch("tableaction", {
			itemId,
			action,
		});
	}
	function handleClickOnRow(itemId: string, colId: string) {
		console.log("cellclick", itemId, colId);
		dispatch("cellclick", {
			rowId: itemId,
			colId: colId,
		});
	}

	function handleSelectedItem(itemId: string, target) {
		console.log(itemId, target.checked, selectedItems);
		if (!target || !itemId) return console.error(`wrong params`);
		if (target.checked && !selectedItems.find((f) => f === itemId)) selectedItems.push(itemId);
		if (!target.checked && selectedItems.find((f) => f === itemId))
			selectedItems.splice(
				selectedItems.findIndex((f) => f === itemId),
				1,
			);
		console.log(itemId, target.checked, selectedItems);
		selectedItems = selectedItems;
	}

	function handleEnableSelector() {
		if (enableselect) {
			enableselect = null;
			selectedItems.length = 0;
		} else {
			enableselect = "yes";
		}
	}

	function handleClickOnMultipleSelectAction(buttonName: string) {
		console.log("action", buttonName, buttonName);
		dispatch("actiononselected", {
			key: buttonName,
			selectedItems,
		});
	}
	function selectAllElements() {
		selectedItems = rowItems.map((m) => m._id);
	}
	function deSelectAllElements() {
		selectedItems.length = 0;
	}
	function clickonrow(itemId: string) {
		dispatch("clickonrow", {
			itemId,
		});
	}

	if (!document.getElementById("paginationbootstrapcomponentjs")) {
		const script = document.createElement("script");
		script.id = "paginationbootstrapcomponentjs";
		script.src = `https://cdn.jsdelivr.net/npm/@htmlbricks/paginationbootstrap-component@${pkg.version}/release/paginationbootstrap.js`;
		document.head.appendChild(script);
	}
	function changeSort(key: string) {
		console.log(sortedBy, sortedDirection);
		if (!sortedBy || key !== sortedBy) {
			sortedDirection = "asc";
			sortedBy = key;
		} else if (key === sortedBy && sortedDirection === "asc") {
			sortedDirection = "desc";
		} else if (key === sortedBy && sortedDirection === "desc") {
			sortedDirection = null;
			sortedBy = null;
		}
		dispatch("changeSort", {
			sortedBy,
			sortedDirection,
		});
		console.log(sortedBy, sortedDirection);
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
<div id="webcomponent">
	<div class="container-fluid">
		{#if tableHeaders && tableHeaders.length}
			<table class="table table-responsive table-striped table-hover align-middle" style="width:100%;text-align:left">
				<thead>
					<tr>
						{#if enableselect && selectActionsbuttons}
							{#if !searchOnRangeIsPresent}
								{#if selectedItems.length !== rowItems.length}
									<button on:click={selectAllElements} class="btn btn-link">seleziona tutti</button>
								{:else}
									<button on:click={deSelectAllElements} class="btn btn-link">rimuovi tutti</button>
								{/if}
							{:else}
								<th scope="col" />
							{/if}
						{/if}
						{#each tableHeaders as th (th.key)}
							<th scope="col">
								{th.label}
								{#if !th.nosort && th.type !== "actions"}
									<button style="border:none; background-color:inherit" on:click={() => changeSort(th.key)}>
										{#if !sortedBy || th.key !== sortedBy}
											&#x21C5;
										{:else if sortedDirection === "asc"}
											&#x21A7;
										{:else if sortedDirection === "desc"}
											&#x21A5;
										{/if}
									</button>
								{/if}
							</th>
						{/each}
						{#if actionButtons}
							<th scope="col"> azioni </th>
						{/if}
					</tr>
					{#if !searchOnRangeIsPresent}
						<tr>
							{#if enableselect && selectActionsbuttons}
								<th scope="col">
									{selectedItems.length}/{rowItems.length}
								</th>
							{/if}
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
					{:else}
						<tr>
							{#if enableselect && selectActionsbuttons}
								<th scope="col">
									{#if selectedItems.length !== rowItems.length}
										<button on:click={selectAllElements} class="btn btn-link">seleziona tutti</button>
									{:else}
										<button on:click={deSelectAllElements} class="btn btn-link">rimuovi tutti</button>
									{/if}
								</th>
							{/if}
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
										{:else if !th.type || th.type === "string"}
											<input
												on:input={(element) => searchInput(element.target, th)}
												type="text"
												style="width:auto"
												class="form-control"
												placeholder="..."
												aria-label="Search"
												aria-describedby="search"
											/>
										{:else if th.type && th.type === "enum"}
											<select class="form-select" on:input={(element) => searchInput(element.target, th)}>
												<option value="">tutti</option>

												{#each th.select as se (se)}
													<option value={se}>{se}</option>
												{/each}
											</select>
										{/if}
									{:else}
										&nbsp;
									{/if}
								</th>
							{/each}
						</tr>
						<tr>
							{#if enableselect && selectActionsbuttons}
								<th scope="col">
									{selectedItems.length}/{rowItems.length}
								</th>
							{/if}
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
					{#if rowItems?.length}
						{#each !externalfilter ? rowItems.slice(page * size, (page + 1) * size) : rowItems as item (item._id)}
							<tr>
								{#if enableselect && selectActionsbuttons}
									<td part="td-selection" style="box-shadow: none;">
										<div class="form-check">
											{#if selectedItems.find((f) => f === item._id)}
												<input
													on:change={(i) => {
														handleSelectedItem(item._id, i.target);
													}}
													id="flexCheckDefault"
													class="form-check-input"
													type="checkbox"
													checked
												/>
											{:else}
												<input
													on:change={(i) => {
														handleSelectedItem(item._id, i.target);
													}}
													id="flexCheckDefault"
													class="form-check-input"
													type="checkbox"
												/>
											{/if}
										</div>
									</td>
								{/if}
								{#if tableHeaders.length}
									{#each tableHeaders as td (td.key)}
										{#if td.type === "actions"}
											{#if item._actions?.length}
												<td part="td-{td.key}">
													{#each item._actions as abutton (abutton.name)}
														{#if abutton.disabled}
															{#if abutton.type === "text"}
																<button
																	on:click={() => handleClickOnCustomAction(item._id, abutton.name)}
																	type="button"
																	class="btn btn-{abutton.btnClass || 'link'}"
																	style="margin-right:10px"
																	disabled>{abutton.iconOrText}</button
																>
															{:else if abutton.type === "icon"}
																<button
																	on:click={() => handleClickOnCustomAction(item._id, abutton.name)}
																	type="button"
																	class="btn btn-{abutton.btnClass || 'light'}"
																	style="margin-right:10px"
																	disabled
																	><i class="bi-{abutton.iconOrText}" />
																</button>
															{/if}
														{:else if abutton.type === "text"}
															<button
																on:click={() => handleClickOnCustomAction(item._id, abutton.name)}
																type="button"
																class="btn btn-{abutton.btnClass || 'link'}"
																style="margin-right:10px">{abutton.iconOrText}</button
															>
														{:else if abutton.type === "icon"}
															<button
																on:click={() => handleClickOnCustomAction(item._id, abutton.name)}
																type="button"
																class="btn btn-{abutton.btnClass || 'light'}"
																style="margin-right:10px"
																><i class="bi-{abutton.iconOrText}" />
															</button>
														{/if}
													{/each}
												</td>
											{:else}
												<td part="td-{td.key}" />
											{/if}
										{:else}
											<td
												part="td-{td.key}"
												on:click={() => {
													if (selectrow) clickonrow(item._id);
												}}
											>
												{#if td.click}
													<button on:click={() => handleClickOnRow(item._id, td.key)} type="button" class="btn btn-link"
														>{getObjVal(item, td) || ""}</button
													>
												{:else}
													{getObjVal(item, td) || ""}
												{/if}
											</td>
										{/if}
									{/each}
								{/if}
								{#if actionButtons}
									<td part="td-action">
										{#each actionButtons as abutton (abutton.name)}
											{#if abutton.type === "text"}
												<button
													on:click={() => handleClickOnAction(item._id, abutton.name)}
													type="button"
													class="btn btn-{abutton.btnClass || 'link'}"
													style="margin-right:10px">{abutton.iconOrText}</button
												>
											{:else if abutton.type === "icon"}
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
			<nav style="margin-top:20px" aria-label="actions on selected">
				{#if selectActionsbuttons}
					<button on:click={handleEnableSelector} class="btn btn-primary btn-sm"> <i class="bi-gear" /> </button>
					{#each selectActionsbuttons as sbutton (sbutton.name)}
						<span style="margin-left:20px">
							<button
								on:click={() => {
									handleClickOnMultipleSelectAction(sbutton.name);
								}}
								class="btn btn-primary btn-sm"
							>
								{sbutton.name}
							</button>
						</span>
					{/each}
				{/if}
				<paginationbootstrap-component
					style="float:right"
					on:pagechange={changePage}
					page={page.toString()}
					pages={pages.toString()}
					primarycolor={primarycolor || ""}
				/>
			</nav>
		{/if}
	</div>
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
