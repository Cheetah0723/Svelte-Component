<svelte:options tag="formrenderer-component--schema-renderer" />

<script lang="ts">
	import type { FormSchema, FormSchemaEntry } from "@app/types/webcomponent.type";

	import { groupMultipleBy } from "./utils";

	import Select from "./defaults/Select.svelte";
	import TextInput from "./defaults/TextInput.svelte";
	import DateInput from "./defaults/DateInput.svelte";
	import NumberInput from "./defaults/NumberInput.svelte";
	import EmailInput from "./defaults/EmailInput.svelte";
	import TextArea from "./defaults/TextArea.svelte";
	import CheckboxInput from "./defaults/CheckboxInput.svelte";
	import RadioInput from "./defaults/RadioInput.svelte";
	import FormElement from "./FormElement.svelte";
	import FormRow from "./FormRow.svelte";

	export let schema: FormSchema;

	const registeredComponents = {
		row: { component: null, options: { row: true } },
		select: { component: Select },
		date: { component: DateInput },
		text: { component: TextInput },
		number: { component: NumberInput },
		email: { component: EmailInput },
		textarea: { component: TextArea },
		checkbox: { component: CheckboxInput, options: { labelIsHandledByComponent: true } },
		radio: { component: RadioInput, options: { labelIsHandledByComponent: true } },
	};

	const visibility: Record<string, boolean> = {};
	const valids: Record<string, boolean> = {};

	const allValues: Record<string, string | number | boolean> = {};
	export const values: Record<string, string | number | boolean> = {};

	export let isInvalid = true;
	$: isInvalid = Object.entries(valids).some(([id, isValid]) => !isValid && visibility[id]);

	const dependencyMap = schema
		? groupMultipleBy(
				schema.filter((entry) => entry.dependencies?.length),
				(entry) => entry.dependencies.map((dep) => dep.id),
		  )
		: {};

	const canShow = (entry: FormSchemaEntry) => {
		for (const dep of entry.dependencies || []) {
			if (!visibility[dep.id] || !dep.values.includes(values[dep.id])) {
				return false;
			}
		}

		return true;
	};

	const handleVisibility = (entry: FormSchemaEntry) => {
		if (canShow(entry)) {
			show(entry, entry.value);
		} else {
			hide(entry);
		}
	};

	const hide = (entry: FormSchemaEntry) => {
		visibility[entry.id] = false;
		delete values[entry.id];
		for (const d of dependencyMap[entry.id] || []) {
			hide(d);
		}
	};

	const show = (entry: FormSchemaEntry, defaultValue?: string | number | boolean) => {
		visibility[entry.id] = true;

		if (entry.type !== "row") {
			values[entry.id] = allValues[entry.id] ?? defaultValue;
		}

		for (const dependentEntry of dependencyMap[entry.id] || []) {
			handleVisibility(dependentEntry);
		}
	};

	const setValueFor = (id: string) => (value: string | number | boolean) => {
		allValues[id] = value;

		if (visibility[id]) {
			values[id] = value;
		}

		if (dependencyMap[id]) {
			for (const dependent of dependencyMap[id]) {
				handleVisibility(dependent);
			}
		}
	};

	const setValidFor = (id: string) => (valid: boolean) => {
		valids[id] = valid;
	};

	function getControls(schema: FormSchema) {
		return schema.map((entry) => {
			const component = registeredComponents[entry.type];

			if (!component) {
				throw new Error(`FormRenderer: Tried to render an unknown component type ${entry.type}!`);
			}

			if (component.options?.row) {
				return { entry, columns: getControls(entry.params?.columns ?? []), options: component.options };
			} else {
				visibility[entry.id] = !entry.dependencies?.length;
			}

			return { entry, component: component.component, options: component.options || {} };
		});
	}

	$: controls = schema ? getControls(schema) : [];

	$: console.log({ controls, schema });
</script>

{#each controls as { entry, component, options, columns } (entry.id)}
	{#if options.row}
		<FormRow bind:visible={visibility[entry.id]} {visibility} {allValues} {columns} {setValueFor} {setValidFor} />
	{:else}
		<FormElement
			bind:visible={visibility[entry.id]}
			label={entry.label}
			labelForId={entry.id}
			showLabel={!options.labelIsHandledByComponent}
			validationTip={entry.validationTip}
			{component}
			schemaEntry={{ ...entry, value: allValues[entry.id] ?? entry.value }}
			setValue={setValueFor(entry.id)}
			setValid={setValidFor(entry.id)}
		/>
	{/if}
{/each}
