<svelte:options tag="formrenderer-component--checkbox" />

<script lang="ts">
  import type { FormSchemaEntry } from "@app/types/webcomponent.type";

  export let setValue: (value: boolean) => void
  export let setValid: (valid: boolean) => void

  export let schemaEntry: FormSchemaEntry

  let value = !!schemaEntry?.value
  $: value = value != null ? value : !!schemaEntry?.value
  $: setValue?.(value)

  $: setValid?.(true)
</script>

<div class="form-check">
  <input bind:checked={value} type="checkbox" class="form-check-input"   id={schemaEntry?.id} required={schemaEntry?.required} readonly={schemaEntry?.readonly} />
  <label for={schemaEntry?.id} class="form-check-label">{schemaEntry?.label}</label>
</div>
