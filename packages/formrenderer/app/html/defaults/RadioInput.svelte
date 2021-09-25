<svelte:options tag="formrenderer-component--radio" />

<script lang="ts">
  import type { FormSchemaEntry } from "@app/types/webcomponent.type";

  export let setValue: (value: boolean) => void
  export let setValid: (valid: boolean) => void

  export let schemaEntry: FormSchemaEntry

  let value: boolean
  $: value = value != null ? value : !!schemaEntry?.value
  $: setValue?.(value)

  $: setValid?.(true)
</script>

<div class="form-check">
  <input bind:group={value} type="radio" class="form-check-input" name={schemaEntry?.params?.group} id={schemaEntry?.id} required={schemaEntry?.required} readonly={schemaEntry?.readonly} />
  <label for={schemaEntry?.id} class="form-check-label">{schemaEntry?.label}</label>
</div>

