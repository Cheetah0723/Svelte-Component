<svelte:options tag="apploginregister-component" />

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
	export let company: ICompany;
	export let navlinks: INavLink[];
	export let page: IPage;
	export let usermenu: IUserMenu;
	export let cookielaw: string;
	export let type: "login" | "register";

	export let language: string;

	export let sessionkey: string;

	export let redirectonlogin: string;
	export let redirectoncreate: string;
	export let loginuri: string;
	export let registeruri: string;
	export let requestmethod: string;
	export let appendqueryparams: string;
	export let appendbodyparams: string;
	export let logouri: string;
	export let oauth2providers: string;

	export let passwordpattern: string;
	export let userpattern: string;
	export let usertype: "email" | "username";

	let navopen: boolean;
	$: {
		if (!id) id = "";
		if (!oauth2providers) {
			oauth2providers = null;
		}
		if (!passwordpattern) {
			passwordpattern = null;
		}
		if (!userpattern) {
			userpattern = null;
		}
		if (!usertype) {
			usertype = "email";
		}
		if (!redirectonlogin) {
			redirectonlogin = null;
		}
		if (!redirectoncreate) {
			redirectoncreate = null;
		}
		if (!type) {
			type = "login";
		}

		if (!sessionkey) {
			sessionkey = "_lg";
		}
		if (!language) {
			language = "";
		}
		if (!appendqueryparams) {
			appendqueryparams = "";
		}
		if (!appendbodyparams) {
			appendbodyparams = "";
		}
		if (!loginuri) {
			loginuri = "";
		}
		if (!registeruri) {
			registeruri = "";
		}

		if (appendqueryparams) {
			appendqueryparams = "";
		}
		if (!logouri) {
			logouri = "";
		}
		if (!requestmethod) {
			requestmethod = "POST";
		}

		if (!page) {
			page = {
				href: location.href,
				pageName: "login",
			};
		}
		if (!cookielaw) {
			cookielaw = null;
		}
		if (!usermenu) {
			usermenu = null;
		}
		navopen = false;
		if (!company) {
			company = null;
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

	function addComponent(componentName: string, scriptJsName: string, componentId: string, localPackageDir?: string) {
		if (!document.getElementById(componentId)) {
			const script = document.createElement("script");
			script.id = componentId;
			script.src = `https://cdn.jsdelivr.net/npm/@htmlbricks/${componentName}@${pkg.version}/release/${scriptJsName}`;
			if (localPackageDir && location.href.includes("localhost")) script.src = `http://localhost:6006/${localPackageDir}/dist/${scriptJsName}`;

			document.head.appendChild(script);
		}
	}
	addComponent("bootstraplayout-component", "bootstraplayout.js", "bootstraplayoutscript", "layout");
	addComponent("loginregister-component", "loginregister.js", "loginregistercomponentscript", "loginregister");
</script>

<bootstraplayout-component socials={socials || ""} contacts={contacts || ""} style="display:block" company={company || ""}
	>d
	<loginregister-component slot="page" />
</bootstraplayout-component>

<style lang="scss">
	// @import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
