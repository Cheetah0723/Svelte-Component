<svelte:options tag="bootstraplayout-component" />

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

	interface ICompany {
		logoUri: string;
		siteName: string;
		companyName: string;
		registration?: { since?: number; text?: string };
		description: string;
		vatNumber?: string;
		fiscalCode?: string;
		since?: number;
	}
	interface INavLink {
		key: string;
		icon?: string;
		group?: string;
		label: string;
		badge?: {
			text: string;
			class?: string;
			classcolor?: string;
		};
	}
	interface ISocials {
		facebook: string;
		gmail: string;
		twitter: string;
		github: string;
		youtube: string;
		twitch: string;
		discord: string;
	}
	interface IContacts {
		phones?: { label?: string; number: string; _id?: string }[];
		addresses?: { googleMapUri?: string; address: string; shortAddress?: string; _id?: string }[];
		emails?: { label?: string; address: string; _id?: string }[];
		sites?: { label?: string; uri: string; open?: boolean; _id?: string }[];
	}

	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import pkg from "../../package.json";
	export let socials: ISocials;
	export let contacts: IContacts;

	export let id: string;
	export let style: string;
	export let company: ICompany;
	export let navlinks: INavLink[];

	let navopen: boolean;
	$: {
		if (!id) id = "";
		if (!style) style = "";
		navopen = false;
		if (!company) {
			company = null;
		} else {
			try {
				company = JSON.parse(company as unknown as string);
			} catch (err) {}
		}
		if (!navlinks) {
			navlinks = null;
		} else {
			try {
				navlinks = JSON.parse(navlinks as unknown as string);
			} catch (err) {}
		}
		if (!socials) {
			socials = null;
		} else {
			try {
				socials = JSON.parse(socials as unknown as string);
			} catch (err) {}
		}
		if (!contacts) {
			contacts = null;
		} else {
			try {
				contacts = JSON.parse(contacts as unknown as string);
				let n = 0;
				if (contacts.phones?.length) {
					for (const phone of contacts.phones) {
						n++;
						if (!phone._id) phone._id = n.toString();
					}
				}
				if (contacts.emails?.length) {
					for (const email of contacts.emails) {
						n++;
						if (!email._id) email._id = n.toString();
					}
				}
				if (contacts.addresses?.length) {
					for (const address of contacts.addresses) {
						n++;
						if (!address._id) address._id = n.toString();
					}
				}
				if (contacts.sites?.length) {
					for (const site of contacts.sites) {
						n++;
						if (!site._id) site._id = n.toString();
					}
				}
			} catch (err) {}
		}
	}

	if (!document.getElementById("footerscript")) {
		const script = document.createElement("script");
		script.id = "footerscript";
		script.src = `https://cdn.jsdelivr.net/npm/@htmlbricks/footerbootstrap-component@${pkg.version}/release/footerbootstrap.js`;
		if (location.href.includes("localhost")) script.src = `http://localhost:6006/footer/dist/footerbootstrap.js`;

		document.head.appendChild(script);
	}

	if (!document.getElementById("offcanvasscript")) {
		const script = document.createElement("script");
		script.id = "offcanvasscript";
		script.src = `https://cdn.jsdelivr.net/npm/@htmlbricks/offcanvas-component@${pkg.version}/release/offcanvas.js`;
		if (location.href.includes("localhost")) script.src = `http://localhost:6006/offcanvas/dist/offcanvas.js`;

		document.head.appendChild(script);
	}

	if (!document.getElementById("navbarscript")) {
		const script = document.createElement("script");
		script.id = "navbarscript";
		script.src = `https://cdn.jsdelivr.net/npm/@htmlbricks/navbarbootstrap-component@${pkg.version}/release/navbarbootstrap.js`;
		if (location.href.includes("localhost")) script.src = `http://localhost:6006/navbar/dist/navbarbootstrap.js`;

		document.head.appendChild(script);
	}
	function openmenu(o) {
		if (o.isOpen || o.isOpen === false) navopen = o.isOpen;
		console.log("evvvv", navopen, o);
	}
</script>

<div>
	<offcanvas-component
		navlinks={navlinks ? JSON.stringify(navlinks) : "[]"}
		on:offcanvasswitch={(el) => openmenu(el.detail)}
		opened={navopen ? "yes" : "no"}
	/>
	<navbarbootstrap-component
		companylogouri={company?.logoUri || ""}
		companybrandname={company?.siteName || ""}
		switchopen={navopen ? "yes" : "no"}
		on:navmenuswitch={(el) => openmenu(el.detail)}
	/>
	<div><slot name="page">page</slot></div>
	<footerbootstrap-component
		socials={socials ? JSON.stringify(socials) : ""}
		contacts={contacts ? JSON.stringify(contacts) : ""}
		style="background-color: burlywood;position:absolute;bottom:0px;width:100vw"
		company={company ? JSON.stringify(company) : ""}
	/>
</div>

<style lang="scss">
	// @import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
