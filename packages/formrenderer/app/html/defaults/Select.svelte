<svelte:options tag="formrenderer-component--select" />

<script lang="ts">
  import type { FormSchemaEntry } from "@app/types/webcomponent.type";

  export let setValue: (value: string) => void
  export let setValid: (valid: boolean) => void

  export let schemaEntry: FormSchemaEntry

  let options: { value: string; label?: string }[] = []
  $: options = schemaEntry?.params?.options ?? []

  let value: string
  $: value = value != null ? value : schemaEntry?.value as string
  $: setValue?.(value)

  $: setValid?.(true)
</script>

<select bind:value class="custom-select" id={schemaEntry?.id} required={schemaEntry?.required} readonly={schemaEntry?.readonly}>
  {#each options as option (option)}
    <option value={option.value} selected={value === option.value}
      >{option.label ?? option.value}</option
    >
  {/each}
</select>
