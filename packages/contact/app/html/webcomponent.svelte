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

	interface ISocial {
		label?: string;
		pageUri?: string;
		name: string;
	}

	let openWindow = false;

	export let phone: IPhone;
	export let address: IAddress;
	export let email: IEmail;
	export let site: ISite;
	export let social: ISocial;
	export let config: IConfig;
	let action: string;
	let payload: IPhone | IAddress | IEmail | ISite | ISocial;
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
		} else if (social) {
			action = "social";
			payload = social;

			try {
				social = JSON.parse(social as unknown as string);
			} catch (err) {
				console.error("parseerr?", social, err);
			}
			if (social.pageUri) {
				openWindow = true;
				windowUri = social.pageUri;
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

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
<span on:click={() => handleClick()}>
	{#if address}
		<span class="iconcell" part="iconcell"
			>{#if config.icon}
				<i class="bi bi-geo-alt" />
			{/if}</span
		>
		{#if config.text}<span class="prop" part="prop" property="address">{address.address}</span>{/if}
	{:else if phone}
		<span class="iconcell" part="iconcell"
			>{#if config.icon}
				<i class="bi bi-telephone" />
			{/if}</span
		>

		{#if config.text}<span class="prop" part="prop" property="telephone">{phone.number}</span>{/if}
	{:else if email}
		<span class="iconcell" part="iconcell"
			>{#if config.icon}
				<i class="bi bi-envelope" />
			{/if}</span
		>

		{#if config.text}<span class="prop" part="prop" property="address">{email.address}</span>{/if}
	{:else if site}
		<span class="iconcell" part="iconcell"
			>{#if config.icon}
				<i class="bi bi-globe" />
			{/if}</span
		>

		{#if config.text}<span class="prop" part="prop" property="address">{site.label || site.uri}</span>{/if}
	{:else if social}
		<span class="iconcell" part="iconcell"
			>{#if config.icon}
				<i class="bi bi-{social.name}" />
			{/if}</span
		>

		{#if config.text}<span class="prop" part="prop" property="address">{social.label}</span>{/if}
	{/if}
</span>

<style lang="scss">
	// @import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
