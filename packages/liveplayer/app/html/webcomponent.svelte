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
	import { onDestroy, onMount } from "svelte";
	import { createEventDispatcher, current_component, get_current_component } from "svelte/internal";

	export let mediauri: string;
	export let mediatype: string;
	export let id: string;
	export let forcecover: string;
	export let replacewithtext: {
		title: string;
		subtitle: string;
		text: string;
	};
	if (!id) id = null;
	// const component = get_current_component();
	let liveUri;

	let timeo;
	let isLive;
	$: {
		if (!mediauri) {
			mediauri = null;
		}
		if (!forcecover) {
			forcecover = null;
		}
		if (!mediatype) {
			mediatype = null;
		}
		if (!replacewithtext) {
			replacewithtext = null;
		} else {
			try {
				replacewithtext = JSON.parse(replacewithtext as any as string);
			} catch (err) {}
		}
	}
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		// console.log(`svelte: ${name}`);
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
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

	async function loadLive() {
		function relo() {
			if (!isLive || !mediauri)
				loadLive().catch((err) => {
					console.error("reload uri", err);
				});
		}
		try {
			if (!mediauri) {
				timeo = setTimeout(relo, 5000);
				return;
			}
			console.info("checking live");
			const res = await fetch(mediauri);
			if (!res || (res.status && (res.status > 299 || res.status < 199))) throw new Error("wrong uri");

			isLive = true;
			dispatch("liveStatus", { live: true });
		} catch (err) {
			if (isLive !== false) dispatch("liveStatus", { live: false });
			isLive = false;

			timeo = setTimeout(relo, 5000);
		}

		return;
	}

	onMount(() => {
		loadLive()
			.catch(() => {
				console.error("merr");
				// return timeo ? clearTimeout(timeo) : undefined;
			})
			.then(() => {
				console.log("start live checker");

				// return timeo ? clearTimeout(timeo) : undefined;
			});
		return () => {
			if (timeo) {
				console.log("destroy live checker");
				clearTimeout(timeo);
			}
		};
	});

	// onMount(async () => {
	// 	setHls();
	// });
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<div part="container" style="width: 100%;height:100%;">
	{#if mediauri && isLive && !forcecover}
		<video part="video" use:setHls style="width: 100%;height:100%;background-color:black" />
	{:else if replacewithtext?.title || replacewithtext?.subtitle || replacewithtext?.text}
		<div
			part="replacewithtext"
			style="	background-color: black; color: white;display: flex; align-items: center; justify-content: center; flex-direction:column;aspect-ratio:16/9;height:100%;margin:auto;background-color:grey"
		>
			{#if replacewithtext?.title && replacewithtext?.subtitle && replacewithtext?.text}
				<slot name="replacewithtext">
					<div style="flex: 1">
						<div style="display: flex;height:100%;align-items: center; justify-content: center; flex-direction:column">
							<div><slot name="replacetitle">{replacewithtext?.title || ""}</slot></div>
						</div>
					</div>
					<div style="flex:1">
						<div style="display: flex;height:100%;align-items: center; justify-content: center; flex-direction:column">
							<div style="flex:1">
								<div style="display: flex;height:100%;align-items: center; justify-content: center; flex-direction:column">
									<div><slot name="replacesubtitle">{replacewithtext?.subtitle || ""}</slot></div>
								</div>
							</div>
							<div style="flex:1">
								<div style="display: flex;height:100%;align-items: center; justify-content: center; flex-direction:column">
									<div><slot name="replacetext">{replacewithtext?.text || ""}</slot></div>
								</div>
							</div>
						</div>
					</div>
				</slot>
			{:else if replacewithtext?.title && replacewithtext?.subtitle}
				<slot name="replacewithtext">
					<div style="flex: 1">
						<div style="display: flex;height:100%;align-items: center; justify-content: center; flex-direction:column">
							<div><slot name="replacetitle">{replacewithtext?.title || ""}</slot></div>
						</div>
					</div>
					<div style="flex:1">
						<div style="display: flex;height:100%;align-items: center; justify-content: center; flex-direction:column">
							<div style="flex:1">
								<div style="display: flex;height:100%;align-items: center; justify-content: center; flex-direction:column">
									<div><slot name="replacesubtitle">{replacewithtext?.subtitle || ""}</slot></div>
								</div>
							</div>
						</div>
					</div>
				</slot>
			{:else if replacewithtext?.title}
				<slot name="replacewithtext">
					<div style="flex: 1">
						<div style="display: flex;height:100%;align-items: center; justify-content: center; flex-direction:column">
							<div><slot name="replacetitle">{replacewithtext?.title || ""}</slot></div>
						</div>
					</div>
				</slot>
			{/if}
		</div>
	{:else if !replacewithtext || (!replacewithtext.title && !replacewithtext.subtitle && !replacewithtext.text)}
		<div
			part="replacewithtext"
			style="	background-color: black; color: white;display: flex; align-items: center; justify-content: center; flex-direction:column;aspect-ratio:16/9;height:100%;margin:auto;background-color:grey"
		>
			offline
		</div>
	{:else}
		<div
			part="replacewithtext"
			style="	background-color: black; color: white;display: flex; align-items: center; justify-content: center; flex-direction:column;aspect-ratio:16/9;height:100%;margin:auto;background-color:grey"
		>
			nouri
		</div>
	{/if}
</div>

<style lang="scss">
	@import "../styles/webcomponent.scss";
</style>
