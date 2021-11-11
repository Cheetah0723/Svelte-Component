<svelte:options tag="simpledropdown-component" />

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
	interface IDropDownMenuListItem {
		key: string;
		label: string;
		badge?: number;
		group?: string;
		linkHref?: string;
	}

	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	export let id: string;
	export let position: "left" | "right";
	export let list: IDropDownMenuListItem[];
	type stringinput = "" | "yes" | "no" | undefined;
	export let open: boolean;
	// let calcPosition: () => "left" | "right";
	$: {
		console.log(open);

		if (!id) id = "";
		if (!position) {
			if (component?.style?.float && component.style.float === "right") position = "right";
			else position = "left";
		}

		if ((open as unknown as stringinput) === "yes" || (open as unknown as stringinput) === "" || open === true) open = true;
		else open = false;

		try {
			if (list && !list[0]?.key) list = JSON.parse(list as unknown as string);
			else if (!list) list = [];
		} catch (err) {
			list = [];
		}
		// calcPosition = function () {
		// 	if (position) return position;
		// 	if (component?.style?.float && component.style.float === "right") return "right";
		// 	else return "left";
		// };
	}

	// if (!document.getElementById("spectrumelements")) {
	// 	const script = document.createElement("script");
	// 	script.id = "spectrumelements";
	// 	script.src = `https://jspm.dev/@spectrum-web-components/bundle/elements.js`;
	// 	script.type = "module";

	// 	document.head.appendChild(script);
	// }
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		// console.log(`svelte: ${name}`);
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function switchDown() {
		open = !open;
		dispatch("dropdownSwitch", {
			open,
			id,
		});
	}
	function clickMenu(key: string) {
		dispatch("dropDownClick", {
			key,
		});
		switchDown();
	}
	// window.addEventListener(
	// 	"click",
	// 	() => {
	// 		open = false;
	// 		dispatch("dropdownSwitch", {
	// 			open,
	// 			id,
	// 		});
	// 	},
	// 	true,
	// );
</script>

<div class="dropdown" part="dropdown">
	<div on:click={switchDown} class="dropbtn" part="dropdownbutton">
		<slot name="dropdownbutton">btn</slot>
	</div>
	{#if open}
		<div class="dropdown-content" part="dropdowncontent" style={position === "right" ? "" : "left:0;"}>
			{#each list as listItem (listItem.key)}
				<div on:click={() => clickMenu(listItem.key)}>
					{#if listItem.linkHref}
						<a href={listItem.linkHref}>{listItem.label}</a>
					{:else}
						<div>{listItem.label}</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	// @import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
