<svelte:options tag="formrenderer-host" />

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
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";

	import type { FormSchema, FormSchemaEntry } from "@app/types/webcomponent.type";

	import pkg from "../../package.json";

	import { groupMultipleBy } from "../functions/utils";

	type IComponentName =
		| "Select"
		| "formrenderer-dateinput"
		| "formrenderer-textinput"
		| "formrenderer-numberinput"
		| "formrenderer-emailinput"
		| "TextArea"
		| "formrenderer-checkboxinput"
		| "RadioInput";

	interface ISchemaOption {
		labelIsHandledByComponent?: boolean;
		row?: boolean;
	}
	interface IComponent {
		options?: ISchemaOption;
		component?: IComponentName;
	}
	interface IRegisterComponent {
		[k: string]: IComponent;
	}
	interface IControl {
		entry: FormSchemaEntry;
		component?: IComponentName;
		options?: ISchemaOption;
		columns?: any;
	}
	const registeredComponents: IRegisterComponent = {
		row: { component: null, options: { row: true } },
		select: { component: "Select" },
		date: { component: "formrenderer-dateinput" },
		text: { component: "formrenderer-textinput" },
		number: { component: "formrenderer-numberinput" },
		email: { component: "formrenderer-emailinput" },
		textarea: { component: "TextArea" },
		checkbox: { component: "formrenderer-checkboxinput", options: { labelIsHandledByComponent: true } },
		radio: { component: "RadioInput", options: { labelIsHandledByComponent: true } },
	};

	export let schema: FormSchema;

	export const values: Record<string, string | number | boolean> = {};

	export let isInvalid: boolean;
	let controls: IControl[];
	const visibility: Record<string, boolean> = {};
	const valids: Record<string, boolean> = {};

	const allValues: Record<string, string | number | boolean> = {};
	let dependencyMap: Record<string, FormSchemaEntry[]>;
	let getControls: (schema: FormSchema) => IControl[];

	$: {
		if (!schema) {
			schema = null;
		} else if (typeof schema === "string") {
			schema = JSON.parse(schema as unknown as string);
		}
		dependencyMap = schema
			? groupMultipleBy(
					schema.filter((entry) => entry.dependencies?.length),
					(entry) => entry.dependencies.map((dep) => dep.id),
			  )
			: {};

		if (!isInvalid && isInvalid !== false) isInvalid = true;

		getControls = (schema: FormSchema): IControl[] => {
			return schema.map((entry) => {
				const component = registeredComponents[entry.type];

				if (!component) {
					throw new Error(`FormRenderer: Tried to render an unknown component type ${entry.type}!`);
				}

				if (component.options?.row) {
					console.log("ROWWWWW");
					return { entry, columns: getControls(entry.params?.columns ?? []), options: component.options };
				} else {
					visibility[entry.id] = !entry.dependencies?.length;
				}

				return { entry, component: component.component, options: component.options || {} };
			});
		};

		controls = schema ? getControls(schema) : [];
		console.log({ controls, schema });
		isInvalid = Object.entries(valids).some(([id, isValid]) => !isValid && visibility[id]);
	}

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

	function addComponent(componentName: string, scriptJsName: string, componentId: string, localPackageDir?: string) {
		if (!document.getElementById(componentId)) {
			const script = document.createElement("script");
			script.id = componentId;
			script.src = `https://cdn.jsdelivr.net/npm/@htmlbricks/${componentName}@${pkg.version}/release/${scriptJsName}`;
			if (localPackageDir && location.href.includes("localhost")) script.src = `http://localhost:6006/${localPackageDir}/dist/${scriptJsName}`;

			document.head.appendChild(script);
		}
	}

	addComponent("formrenderer-dateinput", "formrendererdateinput.js", "formrendererdateinputscript", "formdateinputrenderer");

	addComponent("formrenderer-textinput", "formrenderertextinput.js", "formrenderertextinputscript", "formtextinputrenderer");
	addComponent("formrenderer-emailinput", "formrendereremailinput.js", "formrendereremailinputscript", "formemailinputrenderer");
	addComponent("formrenderer-checkboxinput", "formrenderercheckboxinput.js", "formrenderercheckboxinputscript", "formcheckboxinputrenderer");
	addComponent("formrenderer-numberinput", "formrenderernumberinput.js", "formrenderernumberinputscript", "formnumberinputrenderer");

	const component = get_current_component();

	const svelteDispatch = createEventDispatcher();

	const onSubmit = () => {
		svelteDispatch("submit", values);
		component.dispatchEvent?.(new CustomEvent("submit", { detail: values }));
	};

	function setValueByMessage(message: { id: string; value: string }) {
		console.log(message);
	}
	function setValidByMessage(message: { id: string; valid: boolean }) {
		console.log(message);
	}
</script>

{#if schema}
	{#each controls as { entry, component, options, columns } (entry.id)}
		{#if options.row}
			{#if (visibility[entry.id] || visibility[entry.id] !== false) && columns?.length ? columns.some((c) => visibility[c.entry.id]) : false}
				<div class="row">
					{#each columns as { entry, component, options } (entry.id)}
						<div class="col">
							{#if visibility[entry.id]}
								<div class="col mb-3">
									{#if !options.labelIsHandledByComponent}
										<label for={entry.id}>{entry.label}</label>
									{/if}

									{#if component === "formrenderer-textinput"}
										<formrenderer-textinput
											on:setValid={(d) => setValidByMessage(d.detail)}
											on:setValue={(d) => setValueByMessage(d.detail)}
											schemaentry={JSON.stringify(
												{
													...entry,
													value: allValues[entry.id] ?? entry.value,
												},
												null,
												0,
											)}
											setvalue
											setvalid
										/>
									{:else if component === "formrenderer-emailinput"}
										<formrenderer-emailinput
											on:setValid={(d) => setValidByMessage(d.detail)}
											on:setValue={(d) => setValueByMessage(d.detail)}
											schemaentry={JSON.stringify(
												{
													...entry,
													value: allValues[entry.id] ?? entry.value,
												},
												null,
												0,
											)}
											setvalue
											setvalid
										/>
									{:else if component === "formrenderer-dateinput"}
										<formrenderer-dateinput
											on:setValid={(d) => setValidByMessage(d.detail)}
											on:setValue={(d) => setValueByMessage(d.detail)}
											schemaentry={JSON.stringify(
												{
													...entry,
													value: allValues[entry.id] ?? entry.value,
												},
												null,
												0,
											)}
											setvalue
											setvalid
										/>
									{:else if component === "formrenderer-checkboxinput"}
										<formrenderer-checkboxinput
											on:setValid={(d) => setValidByMessage(d.detail)}
											on:setValue={(d) => setValueByMessage(d.detail)}
											schemaentry={JSON.stringify(
												{
													...entry,
													value: allValues[entry.id] ?? entry.value,
												},
												null,
												0,
											)}
											setvalue
											setvalid
										/>
									{:else if component === "formrenderer-numberinput"}
										<formrenderer-numberinput
											on:setValid={(d) => setValidByMessage(d.detail)}
											on:setValue={(d) => setValueByMessage(d.detail)}
											schemaentry={JSON.stringify(
												{
													...entry,
													value: allValues[entry.id] ?? entry.value,
												},
												null,
												0,
											)}
											setvalue
											setvalid
										/>
									{/if}

									{#if entry.validationTip}
										<div class="invalid-feedback mb-1">
											{entry.validationTip}
										</div>
									{/if}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			{/if}
		{:else if visibility[entry.id]}
			<div class="col mb-3">
				{#if !options.labelIsHandledByComponent}
					<label for={entry.id}>{entry.label}</label>
				{/if}

				{#if component === "formrenderer-textinput"}
					<formrenderer-textinput
						on:setValid={(d) => setValidByMessage(d.detail)}
						on:setValue={(d) => setValueByMessage(d.detail)}
						schemaentry={JSON.stringify(
							{
								...entry,
								value: allValues[entry.id] ?? entry.value,
							},
							null,
							0,
						)}
						setvalue
						setvalid
					/>
				{:else if component === "formrenderer-emailinput"}
					<formrenderer-emailinput
						on:setValid={(d) => setValidByMessage(d.detail)}
						on:setValue={(d) => setValueByMessage(d.detail)}
						schemaentry={JSON.stringify(
							{
								...entry,
								value: allValues[entry.id] ?? entry.value,
							},
							null,
							0,
						)}
						setvalue
						setvalid
					/>
				{:else if component === "formrenderer-dateinput"}
					<formrenderer-dateinput
						on:setValid={(d) => setValidByMessage(d.detail)}
						on:setValue={(d) => setValueByMessage(d.detail)}
						schemaentry={JSON.stringify(
							{
								...entry,
								value: allValues[entry.id] ?? entry.value,
							},
							null,
							0,
						)}
						setvalue
						setvalid
					/>
				{:else if component === "formrenderer-checkboxinput"}
					<formrenderer-checkboxinput
						on:setValid={(d) => setValidByMessage(d.detail)}
						on:setValue={(d) => setValueByMessage(d.detail)}
						schemaentry={JSON.stringify(
							{
								...entry,
								value: allValues[entry.id] ?? entry.value,
							},
							null,
							0,
						)}
						setvalue
						setvalid
					/>
				{:else if component === "formrenderer-numberinput"}
					<formrenderer-numberinput
						on:setValid={(d) => setValidByMessage(d.detail)}
						on:setValue={(d) => setValueByMessage(d.detail)}
						schemaentry={JSON.stringify(
							{
								...entry,
								value: allValues[entry.id] ?? entry.value,
							},
							null,
							0,
						)}
						setvalue
						setvalid
					/>
				{/if}

				{#if entry.validationTip}
					<div class="invalid-feedback mb-1">
						{entry.validationTip}
					</div>
				{/if}
			</div>
		{/if}
	{/each}
	<button type="button" class="btn btn-primary" disabled={isInvalid} on:click|preventDefault={onSubmit}><slot name="submit-label">Submit</slot></button>
{/if}

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
