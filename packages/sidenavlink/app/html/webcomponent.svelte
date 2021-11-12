<svelte:options tag="sidenavlink-component" />

<script lang="ts">
	/**
	 * Svelte Video Login/Register/Forget Password WebComponent
	 * =====================
	 *
	 * @contributors: Dario Caruso <dev@dariocaruso.info> (https://dariocaruso.info)
	 *
	 * @license: MIT License
	 *
	 */
	import { createEventDispatcher } from "svelte";
	import { each, get_current_component } from "svelte/internal";
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		// console.log(`svelte: ${name}`);
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function changePage(page: string) {
		dispatch("pagechange", {
			page,
		});
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
		subLinks?: INavLink[];
		active: boolean;
		open?: boolean;
	}

	export let id: string;
	export let navlink: INavLink;
	export let navpage: string;

	$: {
		if (!id) id = null;
		if (!navpage) navpage = null;
		try {
			if (navlink) {
				try {
					navlink = JSON.parse(navlink as unknown as string);
				} catch (err) {}
			} else {
				navlink = null;
			}
		} catch (err) {}
	}

	function openKey() {
		navlink.open = navlink.open ? false : true;
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
<template>
	{#if navlink}
		<li class="nav-item">
			{#if navlink.subLinks?.length}
				<button
					on:click={() => {
						openKey();
					}}
					style="width:100%;text-align:left;color:black;box-shadow: none!important;"
					class="btn nav-link"
				>
					<i class="bi me-2 bi-{navlink.icon}" />
					{navlink.label}
					{#if navlink.open || (navlink.subLinks && navlink.subLinks.find((f) => f.key === navpage))}
						<span style="float:right">▼</span>
					{:else}
						<span style="float:right">►</span>
					{/if}
				</button>
				{#if navlink.open || (navlink.subLinks && navlink.subLinks.find((f) => f.key === navpage))}
					<div style="padding-left:0.8em">
						{#each navlink.subLinks as navLinkSub (navLinkSub.key)}
							{#if navLinkSub.key === navpage}
								<button
									style="width: 100%;text-align:left;box-shadow: none!important;"
									class="btn btn-outline-primary nav-link active"
									aria-current="page"
								>
									<i class="bi me-2 bi-{navLinkSub.icon}" />
									{navLinkSub.label}
									{#if navLinkSub.badge}
										<span
											style="float:right"
											class="{navLinkSub.badge.class || 'badge rounded-pill'} {navLinkSub.badge.classcolor || 'bg-secondary'}"
											>{navLinkSub.badge.text}</span
										>
									{/if}
								</button>
							{:else}
								<button
									on:click={() => {
										changePage(navLinkSub.key);
									}}
									style="width:100%;text-align:left;color:black;box-shadow: none!important;"
									class="btn nav-link"
								>
									<i class="bi me-2 bi-{navLinkSub.icon}" />
									{navLinkSub.label}
									{#if navLinkSub.badge}
										<span
											style="float:right"
											class="{navLinkSub.badge.class || 'badge rounded-pill'} {navLinkSub.badge.classcolor || 'bg-secondary'}"
											>{navLinkSub.badge.text}</span
										>
									{/if}
								</button>
							{/if}
						{/each}
					</div>
				{/if}
			{:else if navlink.key === navpage}
				<button style="width: 100%;text-align:left;box-shadow: none!important;" class="btn btn-outline-primary nav-link active" aria-current="page">
					<i class="bi me-2 bi-{navlink.icon}" />
					{navlink.label}
					{#if navlink.badge}
						<span style="float:right" class="{navlink.badge.class || 'badge rounded-pill'} {navlink.badge.classcolor || 'bg-secondary'}"
							>{navlink.badge.text}</span
						>
					{/if}
				</button>
			{:else}
				<button
					on:click={() => {
						changePage(navlink.key);
					}}
					style="width:100%;text-align:left;color:black;box-shadow: none!important;"
					class="btn nav-link"
				>
					<i class="bi me-2 bi-{navlink.icon}" />
					{navlink.label}
					{#if navlink.badge}
						<span style="float:right" class="{navlink.badge.class || 'badge rounded-pill'} {navlink.badge.classcolor || 'bg-secondary'}"
							>{navlink.badge.text}</span
						>
					{/if}
				</button>
			{/if}
		</li>
	{/if}
</template>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";

	i {
		min-width: 16px;
		display: inline-block;
	}

	.nav-link {
		padding: 0.5rem 0.2rem 0.5rem 0.2rem;
	}
</style>
