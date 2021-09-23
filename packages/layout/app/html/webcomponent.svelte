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

	interface IPage {
		href: string;
		pageName: string;
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

	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import pkg from "../../package.json";
	export let socials: ISocials;
	export let contacts: IContacts;

	export let id: string;
	export let style: string;
	export let company: ICompany;
	export let navlinks: INavLink[];
	export let page: IPage;
	export let usermenu: IUserMenu;
	export let cookielaw: string;

	let navopen: boolean;
	$: {
		if (!id) id = "";
		if (!page) {
			page = {
				href: location.href,
				pageName: "home",
			};
		} else {
			try {
				page = Object.assign({ href: location.href }, JSON.parse(page as unknown as string));
			} catch (err) {}
		}
		if (!cookielaw) {
			cookielaw = null;
		}
		if (!usermenu) {
			usermenu = null;
		} else {
			try {
				usermenu = JSON.parse(usermenu as unknown as string);
			} catch (err) {}
		}
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
	}
</script>

<div>
	{#if navlinks}
		<offcanvas-component
			navpage={page.pageName || ""}
			navlinks={navlinks ? JSON.stringify(navlinks) : "[]"}
			on:offcanvasswitch={(el) => openmenu(el.detail)}
			opened={navopen ? "yes" : "no"}
		/>
	{/if}

	<navbarbootstrap-component
		noburger={navlinks ? "" : "yes"}
		companylogouri={company?.logoUri || ""}
		companybrandname={company?.siteName || ""}
		usermenu={JSON.stringify(usermenu) || ""}
		switchopen={navopen ? "yes" : "no"}
		on:navmenuswitch={(el) => openmenu(el.detail)}
	/>

	<div id="page">
		<slot name="page">page</slot>
	</div>
	{#if cookielaw}
		<cookielaw-component />
	{/if}
	<footerbootstrap-component
		socials={socials ? JSON.stringify(socials) : ""}
		contacts={contacts ? JSON.stringify(contacts) : ""}
		style="display:block"
		company={company ? JSON.stringify(company) : ""}
	/>
</div>

<style lang="scss">
	// @import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
