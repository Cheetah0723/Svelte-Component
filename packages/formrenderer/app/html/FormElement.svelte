<svelte:options tag="formrenderer-component--element" />

<script lang="ts">
  import type { FormSchemaEntry } from "@app/types/webcomponent.type";

  export let label: string
  export let labelForId: string
  export let showLabel = true

  export let visible = true

  export let validationTip: string = ''

  export let component: any
  export let setValue: (value: string|number|boolean) => void
  export let setValid: (valid: boolean) => void
  export let schemaEntry: FormSchemaEntry
</script>

{#if visible}
    <div class="col mb-3">
      {#if showLabel}
        <label for={labelForId}>{label}</label>
      {/if}
      <svelte:component this={component} {schemaEntry} {setValue} {setValid}></svelte:component>
      {#if validationTip}
        <div class="invalid-feedback mb-1">
          {validationTip}
        </div>
      {/if}
    </div>
{/if}
