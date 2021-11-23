<svelte:options tag="cookielaw-component" />

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

	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import { dictionary } from "@app/functions/i18n";

	import type { ICapabilities } from "@app/functions/interfaces";

	export let id: string;
	export let allowdecline: "yes" | "no";
	export let language: string;
	export let capabilities: ICapabilities;
	export let cookielawuri4more: string;
	let localDictionary = dictionary["en"];
	let getWord: (e: string) => string;

	let isSet: boolean;
	$: {
		if (!id) id = "";
		if (!cookielawuri4more) cookielawuri4more = "";
		if (!capabilities) {
			capabilities = null;
		} else {
			try {
				capabilities = JSON.parse(capabilities as unknown as string);
			} catch (err) {}
		}

		isSet = localStorage.getItem(localStorageItem) ? true : false;
		if (allowdecline !== "yes") allowdecline = "no";
		if (!language || !dictionary[language]) {
			const autolang = navigator?.languages ? navigator.languages[0]?.split("-")[0]?.toLowerCase() : null;
			if (autolang && dictionary[autolang]) {
				language = autolang;
			} else {
				language = "en";
			}
			localDictionary = dictionary[language];
		} else {
			localDictionary = dictionary[language];
		}
		getWord = (w) => {
			return localDictionary[w] || dictionary["en"][w] || "";
		};
	}
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	const localStorageItem = "cookielaw";
	function dispatchChoose(accepted: boolean) {
		console.info("accept cookie law");
		const name = "acceptCookieLaw";
		const detail = { accepted };
		const choose = accepted ? "yes" : "no";
		localStorage.setItem(localStorageItem, choose);
		isSet = true;
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
</script>

<div id="cookiealert" class="alert text-center {isSet ? '' : 'show'}" role="alert">
	<div id="cookielaw_container">
		<div id="cookielaw_content">
			<h3>
				<slot name="title">
					{getWord("cookieLawTitle")}
				</slot>
			</h3>
			<slot name="text">
				{getWord("basicCookieLaw")}
			</slot>
		</div>
		<div id="cookielaw_buttons">
			{#if cookielawuri4more !== "no"}
				<a href={cookielawuri4more || "https://wikipedia.org/wiki/HTTP_cookie"} target="_blank">{getWord("learnmore")}</a>
			{/if}
			{#if allowdecline === "yes"}<button type="button" on:click={() => dispatchChoose(false)}>{getWord("decline")}</button>{/if}
			<button type="button" on:click={() => dispatchChoose(true)}>{getWord("accept")}</button>
		</div>
	</div>
</div>

<style lang="scss">
	// @import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
