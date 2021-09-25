<svelte:options tag="formrenderer-component--text" />

<script lang="ts">
  import type { FormSchemaEntry } from "@app/types/webcomponent.type";

  export let setValue: (value: string) => void
  export let setValid: (valid: boolean) => void

  export let schemaEntry: FormSchemaEntry

  let value: string
  $: value = value != null ? value : schemaEntry?.value as string
  $: setValue?.(value)

  let regex: RegExp | undefined
  $: regex = schemaEntry?.validationRegex && new RegExp(schemaEntry.validationRegex)

  let valid = false

  $: valid = schemaEntry ?
    (!schemaEntry?.required || value != null) &&
    (regex ? regex.test(value) : true) &&
    (value == null || (value.length >= (schemaEntry.params?.minlength ?? 0) && value.length <= (schemaEntry.params?.maxlength ?? Infinity)))
  : false

  $: setValid?.(valid)
</script>

<input
  bind:value
  type="text"
  class="form-control"
  class:is-invalid={!valid}
  id={schemaEntry?.id}
  required={schemaEntry?.required}
  placeholder={schemaEntry?.placeholder}
  readonly={schemaEntry?.readonly}
/>

