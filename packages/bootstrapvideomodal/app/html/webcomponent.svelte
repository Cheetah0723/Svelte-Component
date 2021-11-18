<svelte:options tag="bootstrap-videomodal-component" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import pkg from "../../package.json";
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
	addComponent("bootstrap-dialog-component", "bootstrapdialogcomponent.js", "bootstrapdialogcomponentscript", "bootstrapdialog");

	export let item: string;
	export let uri: string;
	export let title: string;
	export let provider: string;

	$: {
		if (!item) item = "";
		if (!uri) uri = "";
		if (!title) title = "";
		if (!provider) provider = "";
	}

	function dialogShowEvent(d) {
		if (d.show) {
			item = d.id;
		} else {
			item = "";
			uri = "";
			title = "";
		}
		dispatch("videoModalEvent", { id: item, show: d.show });
	}
</script>

<bootstrap-dialog-component id={item} show={uri ? "yes" : "no"} on:modalShow={(d) => dialogShowEvent(d.detail)}>
	{#if title}
		<span slot="title">
			<slot name="title">Video: {title}</slot>
		</span>
	{/if}
	<div slot="body-content">
		{#if uri}
			{#if provider === "youtube"}
				<div style="ratio:16/9;width:100%;text-align: center;">
					<iframe style="border:0;aspect-ratio: 16 / 9;width:100%" src={uri} title="YouTube video" allowfullscreen />
				</div>
			{:else}
				<div style="aspect-ratio: 16 / 9;width:100%;text-align: center;background-color: black;">
					<video controls style="aspect-ratio: 16 / 9;width:100%">
						<track kind="captions" />
						<source src={uri} type="video/mp4" />
						Your browser does not support the video tag.
					</video>
				</div>
			{/if}
		{/if}
	</div>

	<span slot="modal-footer" />
</bootstrap-dialog-component>

<style lang="scss">
	@import "../styles/webcomponent.scss";
</style>
