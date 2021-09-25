<svelte:options tag="formrenderer-component--number" accessors={true} />

<script lang="ts">
  import type { FormSchemaEntry } from "@app/types/webcomponent.type";

  export let setValue: (value: number) => void
  export let setValid: (valid: boolean) => void

  export let schemaEntry: FormSchemaEntry

  let value: number 
  $: value = value != null ? value : schemaEntry?.value as number
  $: setValue?.(value)

  let regex: RegExp | undefined
  $: regex = schemaEntry?.validationRegex && new RegExp(schemaEntry.validationRegex)

  let valid = false

  $: valid = schemaEntry ?
    (!schemaEntry.required || schemaEntry.value != null) &&
    (regex ? regex.test(value.toString()) : true) &&
    (value == null || (value >= (schemaEntry.params?.min ?? -Infinity) && value <= (schemaEntry.params?.max ?? Infinity)))
  : false

  $: setValid?.(valid)
</script>

<input
  bind:value
  type="number"
  class="form-control"
  class:is-invalid={!valid}
  id={schemaEntry?.id}
  required={schemaEntry?.required}
  placeholder={schemaEntry?.placeholder}
  readonly={schemaEntry?.readonly}
/>
