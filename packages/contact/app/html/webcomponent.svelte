<svelte:options tag="contact-component" />

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

	export let id: string;

	interface IPhone {
		label?: string;
		number: string;
		callOnClick?: boolean;
	}
	interface IAddress {
		mapUri?: string;
		latLang?: number[];
		address: string;
		shortAddress?: string;
	}
	interface IEmail {
		label?: string;
		mailLink?: boolean;
		address: string;
	}

	interface IConfig {
		icon?: { fill?: boolean };
		text?: boolean;
		dispatcher?: boolean;
	}

	interface ISite {
		label?: string;
		uri?: string;
		open?: boolean;
	}

	let openWindow = false;

	export let phone: IPhone;
	export let address: IAddress;
	export let email: IEmail;
	export let site: ISite;
	export let config: IConfig;
	let action: string;
	let payload: IPhone | IAddress | IEmail | ISite;
	let windowUri: string;
	$: {
		if (!id) id = "";
		if (!phone) phone = null;
		if (!address) address = null;
		if (!email) email = null;
		if (!config) {
			config = { icon: { fill: false }, dispatcher: true, text: true };
		} else {
			try {
				config = JSON.parse(config as unknown as string);
				if (!config.icon) config.icon = { fill: false };
				if (config.text !== false) config.text = true;
				if (config.dispatcher !== false) config.dispatcher = true;
			} catch (err) {
				console.error("parseerr?", config, err);
			}
		}

		if (phone) {
			action = "phone";
			payload = phone;

			try {
				phone = JSON.parse(phone as unknown as string);
			} catch (err) {
				console.error("parseerr?", phone, err);
			}
		} else if (address) {
			action = "address";
			payload = address;

			try {
				address = JSON.parse(address as unknown as string);
			} catch (err) {
				console.error("parseerr?", address, err);
			}
			if (address.mapUri || address.latLang) {
				openWindow = true;
				if (address.latLang) windowUri = `https://maps.google.com?lat=${address.latLang[0]}&lng=${address.latLang[1]}`;
				if (address.mapUri) windowUri = address.mapUri;
			}
		} else if (email) {
			action = "email";
			payload = email;
			try {
				email = JSON.parse(email as unknown as string);
			} catch (err) {
				console.error("parseerr?", email, err);
			}
			if (email.mailLink) {
				openWindow = true;
				windowUri = email.address;
			}
		} else if (site) {
			action = "site";
			payload = site;
			try {
				site = JSON.parse(site as unknown as string);
			} catch (err) {
				console.error("parseerr?", email, err);
			}
			if (site.open && site.uri) {
				openWindow = true;
				windowUri = site.uri;
			}
		}
	}
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatchClick() {
		const name = "contactClick";
		const detail = { action, options: payload };
		svelteDispatch(name, detail);

		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function handleClick() {
		if (openWindow && windowUri) {
			window.open(windowUri);
		} else if (config.dispatcher) {
			dispatchClick();
		}
	}
</script>

<span on:click={() => handleClick()}>
	{#if address}
		{#if config.icon}<svg
				style="vertical-align: middle"
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				class="bi bi-geo-alt"
				viewBox="0 0 16 16"
			>
				<path
					d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"
				/>
				<path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
			</svg>
		{/if}
		{#if config.text}<span property="address">{address.address}</span>{/if}
	{:else if phone}
		{#if config.icon}
			<svg
				style="vertical-align: middle"
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				class="bi bi-telephone"
				viewBox="0 0 16 16"
			>
				<path
					d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
				/>
			</svg>
		{/if}

		{#if config.text}<span property="telephone">{phone.number}</span>{/if}
	{:else if email}
		{#if config.icon}
			<svg
				style="vertical-align: middle"
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				class="bi bi-envelope"
				viewBox="0 0 16 16"
			>
				<path
					d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"
				/>
			</svg>
		{/if}

		{#if config.text}<span class="prop" property="address">{email.address}</span>{/if}
	{:else if site}
		{#if config.icon}
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
				<path
					d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"
				/>
			</svg>
		{/if}

		{#if config.text}<span class="prop" property="address">{site.label || site.uri}</span>{/if}
	{/if}
</span>

<style lang="scss">
	// @import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
