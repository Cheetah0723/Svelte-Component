<svelte:options tag="formrenderer-textinput" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import type { FormSchemaEntry } from "@app/types/webcomponent.type";
	export let setvalue: boolean;
	export let setvalid: boolean;

	

	export let schemaentry: FormSchemaEntry;

	let value: string;
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
		if (schemaentry && typeof schemaentry === 'string') {
			console.log("SCHEMAENTRY", schemaentry);
			schemaentry = JSON.parse(schemaentry as unknown as string);
		}
		if (!setvalue && (setvalue as unknown as string) === "no"){
			 setvalue = false;
			} else{
				setvalue = true;
			}
		if (!setvalid && (setvalid as unknown as string) === "no") {
			setvalid = false;
		} else {
			setvalid = true;
		}
		console.log("SCHEMAENTRY", schemaentry,setvalue);

		value = value != null ? value : (schemaentry?.value as string);
		if (setvalue) dispatch("setValue", { value, id: schemaentry.id });
		regex = schemaentry?.validationRegex && new RegExp(schemaentry.validationRegex);
		valid = schemaentry
			? (!schemaentry?.required || value != null) &&
			  (regex ? regex.test(value) : true) &&
			  (value == null || (value.length >= (schemaentry.params?.minlength ?? 0) && value.length <= (schemaentry.params?.maxlength ?? Infinity)))
			: false;
		if (setvalid) dispatch("setValid", { valid, id: schemaentry.id });
	}
</script>

<input
	bind:value
	type="text"
	class="form-control"
	class:is-invalid={!valid}
	id={schemaentry?.id}
	required={schemaentry?.required}
	placeholder={schemaentry?.placeholder}
	readonly={schemaentry?.readonly}
/>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
