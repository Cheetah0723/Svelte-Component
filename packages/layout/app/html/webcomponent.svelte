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

	interface IUserMenuListItem {
		key: string;
		label: string;
		badge?: number;
		group?: string;
	}
	interface IUserMenu {
		imgUri: string;
		list?: IUserMenuListItem[];
	}

	interface IPhoneContact {
		label?: string;
		number: string;
		_id?: string;
	}
	interface IAddressContact {
		googleMapUri?: string;
		address: string;
		shortAddress?: string;
		_id?: string;
	}
	interface ISiteContact {
		label?: string;
		uri: string;
		open?: boolean;
		_id?: string;
	}
	interface IEmailContact {
		label?: string;
		address: string;
		_id?: string;
	}

	interface IColumn {
		_id?: string;
		cells: {
			label?: string;
			_id: string;
			phone?: IPhoneContact;
			address?: IAddressContact;
			email?: IEmailContact;
			site?: ISiteContact;
		}[];
		title?: string;
	}
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import pkg from "../../package.json";
	export let socials: ISocials;
	export let contacts: IContacts;

	export let id: string;
	export let company: ICompany;
	export let navlinks: INavLink[];
	export let pagename: string;
	export let usermenu: IUserMenu;
	export let cookielaw: string;
	export let columns: IColumn[];
	export let onescreen: "yes";

	let navopen: boolean;
	$: {
		if (!id) id = "";
		if (!pagename) pagename = null;
		if (!cookielaw) {
			cookielaw = null;
		}
		if (!usermenu) {
			usermenu = null;
		}
		if (!columns) {
			columns = null;
		}
		if (!onescreen) {
			onescreen = null;
		}
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
		}
		if (!socials) {
			socials = null;
		}
		if (!contacts) {
			contacts = null;
		}
	}
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		// console.log(`svelte: ${name}`);
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function addComponent(componentName: string, scriptJsName: string, componentId: string, localPackageDir?: string) {
		if (!document.getElementById(componentId)) {
			const script = document.createElement("script");
			script.id = componentId;
			script.src = `https://cdn.jsdelivr.net/npm/@htmlbricks/${componentName}@${pkg.version}/release/${scriptJsName}`;
			if (localPackageDir && location.href.includes("localhost")) script.src = `http://localhost:6006/${localPackageDir}/dist/${scriptJsName}`;

			document.head.appendChild(script);
		}
	}
	addComponent("footerbootstrap-component", "footerbootstrap.js", "footerscript", "footer");
	addComponent("offcanvas-component", "offcanvas.js", "offcanvasscript", "offcanvas");
	addComponent("navbarbootstrap-component", "navbarbootstrap.js", "navbarscript", "navbar");
	addComponent("cookielaw-component", "cookielaw.js", "cookielawcomponentscript", "cookielaw");

	function openmenu(o) {
		if (o.isOpen || o.isOpen === false) navopen = o.isOpen;
		console.log("evvvv", navopen, o);
		dispatch("offcanvasswitch", o);
	}
</script>

<div style={onescreen ? "display: flex;flex-direction: column;	height: 100vh;" : "display:block"} part="container">
	{#if navlinks}
		<offcanvas-component
			navpage={pagename || ""}
			navlinks={navlinks || "[]"}
			companytitle={company?.siteName || ""}
			companylogouri={company?.logoUri || ""}
			on:offcanvasswitch={(el) => openmenu(el.detail)}
			opened={navopen ? "yes" : "no"}
			on:pagechange={(p) => dispatch("pagechange", p.detail)}
		>
			<span slot="header"><slot name="nav-header-slot" /></span>
		</offcanvas-component>
	{/if}
	<navbarbootstrap-component
		part="navbar"
		noburger={navlinks ? "" : "yes"}
		companylogouri={company?.logoUri || ""}
		companybrandname={company?.siteName || ""}
		usermenu={usermenu || ""}
		switchopen={navopen ? "yes" : "no"}
		on:navmenuswitch={(el) => openmenu(el.detail)}
		on:userClick={(el) => dispatch("userClick", el.detail)}
	>
		<span slot="left-slot"><slot name="nav-left-slot" /></span>
		<span slot="center-slot"><slot name="nav-center-slot" /></span>
		<span slot="right-slot"><slot name="nav-right-slot" /></span>
	</navbarbootstrap-component>

	<div style={onescreen ? "flex: 2" : ""} part="page" id="page">
		<slot name="page">page</slot>
	</div>
	{#if cookielaw}
		<cookielaw-component />
	{/if}
	<footerbootstrap-component
		part="footer"
		socials={socials ? JSON.stringify(socials) : ""}
		contacts={contacts ? JSON.stringify(contacts) : ""}
		style="display:block;"
		company={company ? JSON.stringify(company) : ""}
		columns={columns || ""}
		on:footerClick={(el) => dispatch("footerClick", el.detail)}
	/>
</div>

<style lang="scss">
	// @import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
