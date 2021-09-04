<svelte:options tag="liveplayer-component" />

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
	// import { onMount } from "svelte";
	// import { get_current_component } from "svelte/internal";

	import Hls from "hls.js";

	export let mediauri: string;
	export let mediatype: string;
	export let id: string;
	if (!id) id = null;
	// const component = get_current_component();

	$: {
		if (!mediauri) {
			mediauri = null;
		}
		if (!mediatype) {
			mediatype = null;
		}
	}

	function setHls(video) {
		if (video && Hls.isSupported()) {
			const hls = new Hls({});
			hls.loadSource(mediauri);
			hls.attachMedia(video);
			hls.on(Hls.Events.MEDIA_ATTACHED, function () {
				video.muted = true;
				video.play();
			});
		}
		// hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
		// When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
		// This is using the built-in support of the plain video element, without using hls.js.
		else if (video?.canPlayType("application/vnd.apple.mpegurl")) {
			console.log(`without Media Source Extensions`);
			video.src = mediauri;
			video.addEventListener("canplay", function () {
				video.play();
			});
		}
	}

	// onMount(async () => {
	// 	setHls();
	// });
</script>

{#if mediauri}
	<!-- svelte-ignore a11y-media-has-caption -->
	<video use:setHls style="width: 100%;max-height:100%" />
{/if}

<style lang="scss">
	@import "../styles/webcomponent.scss";
</style>
