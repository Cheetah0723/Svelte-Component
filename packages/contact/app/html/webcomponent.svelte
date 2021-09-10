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
		_id?: string;
	}
	interface IAddress {
		googleMapUri?: string;
		address: string;
		shortAddress?: string;
		_id?: string;
	}
	interface IEmail {
		label?: string;
		address: string;
		_id?: string;
	}

	export let phone: IPhone;
	export let address: IAddress;
	export let email: IEmail;
	export let config: { icon?: { outlined?: boolean }; dispatcher?: boolean };
	let action: string;
	let payload: IPhone | IAddress | IEmail;
	let svgIcon: string;
	$: {
		if (!id) id = "";
		if (!phone) phone = null;
		if (!address) address = null;
		if (!email) email = null;
		if (!config) {
			config = { icon: { outlined: false }, dispatcher: false };
		} else {
			try {
				config = JSON.parse(config as unknown as string);
				if (!config.icon) config.icon = { outlined: false };
			} catch (err) {
				console.error("parseerr?", config, err);
			}
		}

		if (phone) {
			action = "phone";
			payload = phone;
			svgIcon = ``;

			try {
				phone = JSON.parse(phone as unknown as string);
			} catch (err) {
				console.error("parseerr?", phone, err);
			}
		} else if (address) {
			action = "address";
			payload = address;
			svgIcon = ``;
			try {
				address = JSON.parse(address as unknown as string);
			} catch (err) {
				console.error("parseerr?", address, err);
			}
		} else if (email) {
			action = "email";
			payload = email;
			svgIcon = ``;
			try {
				email = JSON.parse(email as unknown as string);
			} catch (err) {
				console.error("parseerr?", email, err);
			}
		}
	}
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatchClick() {
		if (!config.dispatcher) return;
		const name = "contactClick";
		const detail = { action, options: payload };
		svelteDispatch(name, detail);

		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
</script>

<span on:click={() => dispatchClick()}>
	{#if address}
		<svg
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

		<span property="address">{address.address}</span>
	{:else if phone}
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
		<span property="telephone">{phone.number}</span>
	{:else if email}
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
		<span property="address">{email.address}</span>
	{/if}
</span>

<style lang="scss">
	// @import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
