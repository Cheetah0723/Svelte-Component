<svelte:options tag="formrenderer-checkboxinput" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import type { FormSchemaEntry } from "@app/types/webcomponent.type";
	export let setvalue: boolean;
	export let setvalid: boolean;

	export let key: string;

	export let schemaentry: FormSchemaEntry;

	let value: boolean;

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		// console.log(`svelte: ${name}`);
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	$: {
		if (schemaentry && typeof schemaentry === 'string') {
			console.log("SCHEMAENTRY", schemaentry);
			schemaentry = JSON.parse(schemaentry as unknown as string);
		}
		if (!setvalue && (setvalue as unknown as string) !== "no") setvalue = false;
		if (!setvalid && (setvalid as unknown as string) !== "no") setvalid = false;
		if (!key) key = "none";
		value = value = value != null ? value : !!schemaentry?.value
		if (setvalue) dispatch("setValue", { value, id: schemaentry.id });

		if (setvalid) dispatch("setValid", true);
	}
</script>

<div class="form-check">
	<input bind:checked={value} type="checkbox" class="form-check-input"   id={schemaentry?.id} required={schemaentry?.required} readonly={schemaentry?.readonly} />
	<label for={schemaentry?.id} class="form-check-label">{schemaentry?.label}</label>
  </div>
  

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
