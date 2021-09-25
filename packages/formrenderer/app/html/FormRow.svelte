<svelte:options tag="formrenderer-component--row" />

<script lang="ts">
  import type { FormSchemaEntry } from "@app/types/webcomponent.type";
  import FormElement from "./FormElement.svelte";

  export let setValueFor: (id: string) => (value: string|number|boolean) => void
  export let setValidFor: (id: string) => (valid: boolean) => void

  export let allValues: Record<string, string|number|boolean>
  export let visibility: Record<string,boolean>

  export let columns: { entry: FormSchemaEntry, component: any, options: any, columns?: any[] }[]
  export let visible = true

  let visibleForColumns: boolean
  $: visibleForColumns = columns?.length ? columns.some(c => visibility[c.entry.id]) : false
</script>

{#if visible && visibleForColumns}
  <div class="form-row">
    {#each columns as { entry, component, options } (entry.id)}
      <div class="col">
        <FormElement
          bind:visible={visibility[entry.id]}
          label={entry.label}
          labelForId={entry.id}
          showLabel={!options.labelIsHandledByComponent}
          validationTip={entry.validationTip}
          component={component}
          schemaEntry={{ ...entry, value: allValues[entry.id] ?? entry.value }}
          setValue={setValueFor(entry.id)}
          setValid={setValidFor(entry.id)}
        />      
      </div>
    {/each}
  </div>
{/if}
