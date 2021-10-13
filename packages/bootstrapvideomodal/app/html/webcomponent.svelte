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

	if (!document.getElementById("bootstrapdialogcomponentscript")) {
		const script = document.createElement("script");
		script.id = "bootstrapdialogcomponentscript";
		script.src = `https://cdn.jsdelivr.net/npm/@htmlbricks/bootstrap-dialog-component@${pkg.version}/release/bootstrapdialogcomponent.js`;
		if (location.href.includes("localhost")) script.src = `http://localhost:6006/bootstrapdialog/dist/bootstrapdialogcomponent.js`;

		document.head.appendChild(script);
	}

	export let item: string;
	export let uri: string;
	export let title: string;

	$: {
		if (!item) item = "";
		if (!uri) uri = "";
		if (!title) title = "";
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
			<video controls style="ratio:16/9;width:100%"
				><source src={uri} type="video/mp4" />
				<track kind="captions" />
				Your browser does not support the video tag.
			</video>
		{/if}
	</div>

	<span slot="modal-footer" />
</bootstrap-dialog-component>

<style lang="scss">
	@import "../styles/webcomponent.scss";
</style>
