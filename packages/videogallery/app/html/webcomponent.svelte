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

	import moment from "moment-with-locales-es6";
	import { createEventDispatcher } from "svelte";

	// import dispatch from "@app/functions/webcomponent";

	interface ICard {
		videoSrc: string;
		title?: string;
		description?: string;
		time?: Date;
		pageUri?: string;
		_id: string;
	}

	export let cards: string;
	export let size: number;
	export let page: number;
	export let linkLabel: string;
	export let dateFormat: string;
	export let primarycolor: string;
	export let filter: string;

	if (!linkLabel) {
		linkLabel = "";
	}
	if (!primarycolor) {
		primarycolor = null;
	}
	if (!dateFormat) {
		dateFormat = "dddd DD MMMM YYYY HH:mm";
	}

	let pages = 0;

	let cardItems: ICard[];
	let initialDate: Date;
	let lastDate: Date;
	let firstCardData: Date;
	let lastCardData: Date;
	let enableDate = true;

	$: {
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

		try {
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

			if (enableDate) {
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
			if (filter) {
				cardItems = cardItems.filter((c) => {
					if (c.title?.toLowerCase().includes(filter.toLowerCase()) || c.description?.toLowerCase().includes(filter.toLowerCase())) {
						return true;
					}
					return false;
				});
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
			cards: getCurrentCards(),
		});
	}

	function getCurrentCards() {
		return cardItems.slice(page * size, (page + 1) * size);
	}

	function changeStartDate(node) {
		const newDate = node.target.value;
		// console.log(newDate);
		firstCardData = moment(newDate, "YYYY-MM-DD").startOf("day").toDate();
		filter = null;
	}
	function changeEndDate(node) {
		const newDate = node.target.value;
		// console.log(newDate);
		lastCardData = moment(newDate, "YYYY-MM-DD").endOf("day").toDate();
		filter = null;
	}
	// async function getHelloWorld() {
	// 	const { app } = await webcomponent({ text: "hello-world" });

	// 	return app();
	// }
</script>

<svelte:head>
	<script defer src="https://unpkg.com/@htmlbricks/paginationbootstrap-component@0.0.7/release/paginationbootstrap.js"></script>
	<script defer src="https://unpkg.com/@htmlbricks/videocardbootstrap-component@0.0.7/release/videocardbootstrap.js"></script>
</svelte:head>

<div id="webcomponent">
	<div class="container-fluid">
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
						<input type="text" value={filter} class="form-control" placeholder="..." aria-label="Search" aria-describedby="search" />
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
				{#each cardItems.slice(page * size, (page + 1) * size) as item (item._id)}
					<div class="g-col-12 g-col-xxl-3 g-col-xl-4 g-col-md-6">
						<videocardbootstrap-component
							title={item.title}
							description={item.description}
							time={item.time ? moment(item.time).format() : undefined}
							dateformat={dateFormat}
							pageuri={item.pageUri}
							videosrc={item.videoSrc}
						/>
					</div>
				{/each}
			</div>
			<nav style="margin-top:20px" aria-label="Page navigation example">
				<paginationbootstrap-component on:pagechange={changePage} page={page.toString()} pages={pages.toString()} />
			</nav>
		{/if}
	</div>
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
