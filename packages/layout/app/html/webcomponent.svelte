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
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import pkg from "../../package.json";

	export let id: string;
	export let company: ICompany;
	export let navlinks: INavLink[];

	let navopen: boolean;
	$: {
		if (!id) id = "";
		navopen = false;
		if (!company) {
			company = null;
		} else {
			try {
				company = JSON.parse(company as unknown as string);
			} catch (err) {
				console.error("parseerr?", company, err);
			}
		}
		if (!navlinks) {
			navlinks = null;
		} else {
			try {
				navlinks = JSON.parse(navlinks as unknown as string);
			} catch (err) {
				console.error("parseerr?", navlinks, err);
			}
		}
	}

	if (!document.getElementById("footerscript")) {
		const script = document.createElement("script");
		script.id = "footerscript";
		script.src = `https://unpkg.com/@htmlbricks/footerbootstrap-component@${pkg.version}/release/footerbootstrap.js`;
		if (location.href.includes("localhost")) script.src = `http://localhost:6006/footer/dist/footerbootstrap.js`;

		document.head.appendChild(script);
	}

	if (!document.getElementById("offcanvasscript")) {
		const script = document.createElement("script");
		script.id = "offcanvasscript";
		script.src = `https://unpkg.com/@htmlbricks/offcanvas-component@${pkg.version}/release/offcanvas.js`;
		if (location.href.includes("localhost")) script.src = `http://localhost:6006/offcanvas/dist/offcanvas.js`;

		document.head.appendChild(script);
	}

	if (!document.getElementById("navbarscript")) {
		const script = document.createElement("script");
		script.id = "navbarscript";
		script.src = `https://unpkg.com/@htmlbricks/navbarbootstrap-component@${pkg.version}/release/navbarbootstrap.js`;
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
	<footerbootstrap-component style="background-color: burlywood;position:absolute;bottom:0px;width:100vw" company={company ? JSON.stringify(company) : ""} />
</div>

<style lang="scss">
	// @import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
