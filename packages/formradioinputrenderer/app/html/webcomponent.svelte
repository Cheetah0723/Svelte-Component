<svelte:options tag="formrenderer-radioinput" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import type { FormSchemaEntry } from "@app/types/webcomponent.type";
	export let setvalue: boolean;
	export let setvalid: boolean;

	export let schemaentry: FormSchemaEntry;

	let value: boolean;
	let regex: RegExp | undefined;
	let valid = false;

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		// console.log(`svelte: ${name}`);
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	$: {
		if (schemaentry && typeof schemaentry === "string") {
			console.log("SCHEMAENTRY", schemaentry);
			schemaentry = JSON.parse(schemaentry as unknown as string);
		}
		if (!setvalue && (setvalue as unknown as string) === "no") {
			setvalue = false;
		} else {
			setvalue = true;
		}
		if (!setvalid && (setvalid as unknown as string) === "no") {
			setvalid = false;
		} else {
			setvalid = true;
		}
		console.log("SCHEMAENTRY", schemaentry, setvalue);

		value = value != null ? value : !!schemaentry?.value;
		if (setvalue) dispatch("setValue", { value, id: schemaentry?.id });

		if (setvalid) dispatch("setValid", { valid: true, id: schemaentry.id });
	}
</script>

<div class="form-check">
	<input
		bind:group={value}
		type="radio"
		class="form-check-input"
		name={schemaentry?.params?.group}
		id={schemaentry?.id}
		required={schemaentry?.required}
		readonly={schemaentry?.readonly}
	/>
	<label for={schemaentry?.id} class="form-check-label">{schemaentry?.label}</label>
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
