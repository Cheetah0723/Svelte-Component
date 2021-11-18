<svelte:options tag="bootstrap-dialog-component" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		// console.log(`svelte: ${name}`);
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	import { fade, fly } from "svelte/transition";
	import { quintOut } from "svelte/easing";

	export let id: string;
	export let show: boolean;
	$: {
		if (!id) id = "";
		if (show && ((show as unknown as string) === "yes" || (show as unknown as string) === "")) show = true;
		else show = false;
	}

	export let dialogClasses = "";
	export let title = "";
	export let backdrop = true;
	export let ignoreBackdrop = false;
	export let keyboard = true;
	export let describedby = "";
	export let labelledby = "";
	export let content = "";
	export let closelabel = "";
	export let confirmlabel = "";
	export let onOpened = () => dispatch("modalShow", { id, show: true });
	export let onClosed = () => dispatch("modalShow", { id, show: false });
	let _keyboardEvent;
	function attachEvent(target, ...args) {
		target.addEventListener(...args);
		return {
			remove: () => target.removeEventListener(...args),
		};
	}
	function checkClass(className) {
		return document.body.classList.contains(className);
	}
	function modalOpen() {
		if (!checkClass("modal-open")) {
			document.body.classList.add("modal-open");
		}
	}
	function modalClose() {
		if (checkClass("modal-open")) {
			document.body.classList.remove("modal-open");
		}
	}
	function handleBackdrop(event) {
		if (backdrop && !ignoreBackdrop) {
			event.stopPropagation();
			show = false;
		}
	}
	function onModalOpened() {
		if (keyboard) {
			_keyboardEvent = attachEvent(document, "keydown", (e) => {
				if ((event as any).key === "Escape") {
					show = false;
				}
			});
		}
		onOpened();
	}
	function onModalClosed() {
		if (_keyboardEvent) {
			_keyboardEvent.remove();
		}
		onClosed();
	}
	// Watching changes for Open vairable
	$: {
		if (show) {
			modalOpen();
		} else {
			modalClose();
		}
	}
	function handleConfirm() {
		dispatch("modalConfirm", { id, confirm: true });
		show = false;
	}
	function handleCancel() {
		show = false;

		dispatch("modalConfirm", { id, confirm: false });
	}
</script>

{#if show}
	<div
		class="modal show"
		tabindex="-1"
		role="dialog"
		aria-labelledby={labelledby}
		aria-describedby={describedby}
		aria-modal="true"
		on:click|self={handleBackdrop}
		on:introend={onModalOpened}
		on:outroend={onModalClosed}
		transition:fade
	>
		<div class="modal-dialog {dialogClasses}" role="document" in:fly={{ y: -50, duration: 300 }} out:fly={{ y: -50, duration: 300, easing: quintOut }}>
			<div class="modal-content">
				<slot name="header" class="modal-header">
					<h5 class="modal-title"><slot name="title">{title || "title"}</slot></h5>
					<button type="button" class="btn-close" on:click={() => (show = false)}>
						<span aria-hidden="true">&times;</span>
					</button>
				</slot>
				<div class="modal-body"><slot name="body-content">{content || "Woohoo, you're reading this text in a modal!"}</slot></div>
				<slot name="modal-footer" class="modal-footer">
					<div>
						<slot name="footer">
							<button type="button" class="btn btn-secondary" on:click={() => handleCancel()}
								><slot name="close-button-label">{closelabel || "Close"}</slot></button
							>
							<button type="button" class="btn btn-primary" on:click={() => handleConfirm()}
								><slot name="confirm-button-label">{confirmlabel || "Save changes"}</slot></button
							>
						</slot>
					</div>
				</slot>
			</div>
		</div>
	</div>
	{#if show}
		<div class="modal-backdrop show" transition:fade={{ duration: 150 }} />
	{/if}
{/if}

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";

	.modal {
		display: block;
	}
</style>
