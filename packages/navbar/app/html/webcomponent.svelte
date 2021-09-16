<svelte:options tag="navbarbootstrap-component" />

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

	export let companybrandname: string;
	export let companylogouri: string;
	export let id: string;
	export let pagetitle: string;
	export let switchopen: string;
	export let usermenu: IUserMenu;

	let isOpen: boolean;
	$: {
		if (!companybrandname) companybrandname = "";
		if (!companylogouri) companylogouri = "";
		if (!id) id = "";
		if (!pagetitle) pagetitle = "";
		if (!switchopen || switchopen === "no") {
			switchopen = "";
			isOpen = false;
		} else {
			isOpen = true;
		}
		if (!usermenu) {
			usermenu = null;
		} else {
			try {
				usermenu = JSON.parse(usermenu as unknown as string);
			} catch (err) {}
		}
	}
	if (!document.getElementById("bootstrapdropdownscript")) {
		const script = document.createElement("script");
		script.id = "bootstrapdropdownscript";
		script.src = `https://cdn.jsdelivr.net/npm/@htmlbricks/bootstrapdropdown-component@${pkg.version}/release/bootstrapdropdown.js`;
		if (location.href.includes("localhost")) script.src = `http://localhost:6006/dropdown/dist/bootstrapdropdown.js`;

		document.head.appendChild(script);
	}

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		// console.log(`svelte: ${name}`);
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function switchMenu() {
		isOpen = !isOpen;
		dispatch("navmenuswitch", {
			isOpen,
		});
	}
</script>

<nav id="webcomponent">
	<div style="text-align:left" class="navitem">
		<button style="padding:0px" on:click={() => switchMenu()} class="btn btn-lg">☰</button>
	</div>
	<div class="navitem">
		<slot name="brand">
			{#if companylogouri}<img style="height: 30px;" alt="" src={companylogouri} />{/if}
			{companybrandname}
		</slot>
	</div>

	<div class="navitem">
		<slot name="right-slot">
			<!-- <div style="text-align:right;margin-right:10px">{pagetitle}</div> -->
		</slot>
		{#if usermenu}
			<bootstrapdropdown-component list={usermenu.list?.length ? JSON.stringify(usermenu.list) : ""}>
				<div slot="dropdownbutton">user</div>
			</bootstrapdropdown-component>
		{/if}
	</div>
</nav>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
