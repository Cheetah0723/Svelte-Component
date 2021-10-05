<svelte:options tag="videocardbootstrap-component" />

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

	export let title: string;
	export let description: string;
	export let videosrc: string;
	export let provider: "youtube" | "";
	export let pageuri: string;
	export let linklabel: string;
	export let time: string;
	export let id: string;
	export let dateformat: string;
	if (!dateformat) {
		dateformat = "dddd DD MMMM YYYY HH:mm";
	}
	if (!linklabel) {
		linklabel = "read more";
	}
	if (!pageuri) {
		pageuri = null;
	}
	if (!provider) {
		provider = null;
	}
	if (!time) {
		time = null;
	}
	if (!description) {
		description = null;
	}
	if (!title) {
		title = null;
	}

	if (!id) {
		id = null;
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
<div class="card h-100">
	<!-- svelte-ignore a11y-media-has-caption -->
	{#if provider === "youtube"}
		<div class="ratio ratio-16x9">
			<iframe src={videosrc} title="YouTube video" allowfullscreen />
		</div>
	{:else}
		<video controls class="w-full"
			><source src={videosrc} type="video/mp4" />
			Your browser does not support the video tag.
		</video>
	{/if}

	<div class="card-body">
		{#if title}
			<h5 class="card-title">{title}</h5>
		{/if}
		{#if description}
			<p class="card-text">
				{description.length > 100 ? description.slice(0, 100) : description ? description : ""}
			</p>
		{/if}
		{#if pageuri}
			<div
				class="fb-like card-link"
				data-href={pageuri}
				data-layout="button"
				data-action="like"
				data-size="small"
				data-show-faces="false"
				data-share="false"
			/>

			<a class="twitter-share-button card-link" data-url={pageuri} href="https://twitter.com/intent/tweet"> Tweet</a>

			<!-- <a href="#" class="card-link">Card link</a> -->

			<br />
			{#if linklabel?.length}
				<a href={pageuri} class="btn btn-primary">{linklabel}</a>
			{/if}
		{/if}
	</div>
	{#if time}
		<div class="card-footer">
			<slot name="card-footer">
				<small class="text-muted"
					><i class="bi bi-clock" style="margin-right:8px" />{moment(time)
						.locale(navigator.language)
						.format(dateformat)
						.replace(/\b\w/g, (l) => l.toUpperCase())}</small
				>
			</slot>
		</div>
	{/if}
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
