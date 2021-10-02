<svelte:options tag="videogallery-bootstrap-component" />

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

	import moment from "moment";
	import { createEventDispatcher } from "svelte";
	import pkg from "../../package.json";

	// import dispatch from "@app/functions/webcomponent";

	interface ICard {
		videoSrc: string;
		title?: string;
		description?: string;
		time?: Date;
		pageUri?: string;
		_id: string;
		provider?: "youtube";
	}
	// interface IRestApi {
	// 	uri: string;
	// 	pagination?: boolean;
	// 	capabilities: string;
	// 	convert: { page: string, items:string }
	// }
	export let cards: string;
	export let size: number;
	export let page: number;
	export let pages: number;
	export let linkLabel: string;
	export let dateFormat: string;
	export let primarycolor: string;
	export let filter: string;
	export let id: string;
	// export let restapi: string;
	export let externalfilter: string;

	let cardItems: ICard[];
	let initialDate: Date;
	let lastDate: Date;
	let firstCardData: Date;
	let lastCardData: Date;
	let enableDate = true;

	$: {
		if (!linkLabel) {
			linkLabel = "";
		}
		if (!primarycolor) {
			primarycolor = null;
		}
		if (!dateFormat) {
			dateFormat = "dddd DD MMMM YYYY HH:mm";
		}
		if (!id) {
			id = null;
		}
		if (!pages) {
			pages = 1;
		} else {
			pages = Number(pages);
		}
		if (!externalfilter) {
			externalfilter = null;
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
		if (!filter) {
			filter = null;
		}
		if (!cardItems) {
			cardItems = [];
		}
		try {
			// if (!restapi) {
			// 	restapi = null;
			cardItems = JSON.parse(cards);
			let cc = 0;
			for (const c of cardItems) {
				c._id = `${cc.toString() + c.title}`;
				if (!c.time) {
					enableDate = false;
					console.warn("UNABLE TO ACTIVATE SEARCH FILTER!");
					break;
				}
				c.time = moment(c.time).toDate();
				if (!initialDate || initialDate.valueOf() > c.time.valueOf()) {
					initialDate = c.time;
				}
				if (!lastDate || lastDate.valueOf() < c.time.valueOf()) {
					lastDate = c.time;
				}
				cc++;
			}

			if (enableDate && !externalfilter) {
				cardItems = cardItems.sort((b, a) => {
					return a.time.valueOf() - b.time.valueOf();
				});
				if (!firstCardData) {
					firstCardData = initialDate;
				}
				if (!lastCardData) {
					lastCardData = lastDate;
				}
				cardItems = cardItems.filter((f) => f.time.valueOf() >= firstCardData.valueOf() && f.time.valueOf() <= lastCardData.valueOf());
			}
			if (filter && !externalfilter) {
				console.info(filter);

				cardItems = cardItems.filter((c) => {
					if (c.title?.toLowerCase().includes(filter.toLowerCase()) || c.description?.toLowerCase().includes(filter.toLowerCase())) {
						return true;
					}
					return false;
				});
			} else if (externalfilter) {
				console.info(filter);
				dispatch("textFilterVideos", { filter: filter || null });
			}
			if (cardItems.length && (!externalfilter || !pages)) {
				console.log("calcpage", cardItems.length, !externalfilter || !pages, pages);

				pages = Math.floor(cardItems.length / size) + (cardItems.length % size ? 1 : 0);
			}
			// }

			// const videos = component.getElementsByTagName("video");
			// for (let video of videos) {
			// 	video.load();
			// }
		} catch (err) {}

		// console.log("end computed");
		// console.log(size, page, pages, cardItems.length, initialDate, lastDate);

		// will only get called when the `color` changed.
	}
	import { get_current_component, onMount } from "svelte/internal";

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
		dispatch("pagechange", {
			page: el.detail.page,
			cards: getCurrentCards(),
		});
	}

	function getCurrentCards() {
		return !externalfilter ? cardItems.slice(page * size, (page + 1) * size) : cardItems;
	}

	function changeStartDate(node) {
		const newDate = node.target.value;

		dispatch("dateFilterVideos", {
			start: moment(newDate, "YYYY-MM-DD").startOf("day").toDate(),
			dateKey: "start",
		});

		// console.log(newDate);
		if (!externalfilter) firstCardData = moment(newDate, "YYYY-MM-DD").startOf("day").toDate();
		filter = null;
	}
	function changeEndDate(node) {
		const newDate = node.target.value;
		dispatch("dateFilterVideos", {
			end: moment(newDate, "YYYY-MM-DD").startOf("day").toDate(),
			dateKey: "end",
		});
		// console.log(newDate);
		if (!externalfilter) lastCardData = moment(newDate, "YYYY-MM-DD").endOf("day").toDate();
		filter = null;
	}
	// async function getHelloWorld() {
	// 	const { app } = await webcomponent({ text: "hello-world" });

	// 	return app();
	// }
	if (!document.getElementById("paginationbootstrapcomponentjs")) {
		const script = document.createElement("script");
		script.id = "paginationbootstrapcomponentjs";
		script.src = `https://cdn.jsdelivr.net/npm/@htmlbricks/paginationbootstrap-component@${pkg.version}/release/paginationbootstrap.js`;
		document.head.appendChild(script);
	}

	if (!document.getElementById("videocardbootstrapbootstrapcomponentjs")) {
		const script = document.createElement("script");
		script.id = "videocardbootstrapbootstrapcomponentjs";
		script.src = `https://cdn.jsdelivr.net/npm/@htmlbricks/videocardbootstrap-component@${pkg.version}/release/videocardbootstrap.js`;
		if (location.href.includes("localhost")) script.src = `http://localhost:6006/videocard/dist/videocardbootstrap.js`;

		document.head.appendChild(script);
	}

	// onMount(async () => {
	// 	await reloadCards();
	// });

	// async function fetchData(uri: string) {
	// 	const fetched = await fetch(uri);
	// 	const data = fetched.json();
	// 	return data;
	// }

	// async function reloadCards() {
	// 	if (restapi) {
	// 		const restObj: IRestApi = JSON.parse(restapi);
	// 		console.info("fetch cards", restObj.uri);
	// 		if (restObj.pagination) {
	// 		}

	// 		const data = await fetchData(restObj.uri);
	// 		cardItems = data;

	// 		console.log(data);
	// 	}

	// 	console.info("reload cards");
	// }
</script>

<div class="container-fluid" part="container">
	{#if cardItems && (cardItems.length || cardItems.length === 0)}
		<div class="d-none d-md-block">
			<div class="grid">
				<div class="g-col-4 g-col-xxl-2">
					<div class="input-group mb-3">
						<span class="input-group-text" id="search">&#x1F50E;</span>
						<input type="text" bind:value={filter} class="form-control" placeholder="..." aria-label="Search" aria-describedby="search" />
					</div>
				</div>
				<div class="g-col-8 g-col-xxl-10">
					{#if enableDate}
						<div class="input-group mb-3">
							<span class="input-group-text">&#128197;</span>

							<input
								on:input={changeStartDate}
								type="date"
								class="form-control"
								style="max-width: 200px"
								value={moment(initialDate).format("YYYY-MM-DD")}
							/>
							<input
								on:input={changeEndDate}
								type="date"
								class="form-control"
								style="max-width: 200px"
								value={moment(lastDate).format("YYYY-MM-DD")}
							/>
						</div>
					{/if}
				</div>
			</div>
		</div>
		<div class="d-block d-md-none">
			<div class="grid">
				<div class="g-col-12">
					<div class="input-group mb-3">
						<span class="input-group-text" id="search">&#x1F50E;</span>
						<input type="text" bind:value={filter} class="form-control" placeholder="..." aria-label="Search" aria-describedby="search" />
					</div>
				</div>
			</div>
			{#if enableDate}
				<div class="grid">
					<div class="g-col-12">
						<div class="input-group mb-3">
							<span class="input-group-text">&#128197;</span>

							<input on:input={changeStartDate} type="date" class="form-control" />
							<input on:input={changeEndDate} type="date" class="form-control" />
						</div>
					</div>
				</div>
			{/if}
		</div>
		{#if cardItems && cardItems.length}
			<div class="grid">
				{#each !externalfilter ? cardItems.slice(page * size, (page + 1) * size) : cardItems as item (item._id)}
					<div class="g-col-12 g-col-xxl-3 g-col-xl-4 g-col-md-6">
						<videocardbootstrap-component
							title={item.title || ""}
							description={item.description || ""}
							time={item.time ? moment(item.time).format() : undefined}
							dateformat={dateFormat || ""}
							pageuri={item.pageUri || ""}
							videosrc={item.videoSrc || ""}
							provider={item.provider || ""}
						/>
					</div>
				{/each}
			</div>
			<nav style="margin-top:20px" aria-label="Page navigation example">
				<paginationbootstrap-component on:pagechange={changePage} page={page.toString()} pages={pages.toString()} primarycolor={primarycolor || ""} />
			</nav>
		{/if}
	{/if}
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
