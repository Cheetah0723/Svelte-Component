<svelte:options tag="bootstrap-downloader-component" />

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
	export let uri: string;
	export let headers: {};
	export let targetfilename: string;
	let total: number;
	let loaded: number;
	let show: boolean;
	let xhr: XMLHttpRequest;
	let downloaded: boolean;
	$: {
		if (!id) id = "";
		if (!downloaded) downloaded = false;
		if (uri) show = true;
		else show = false;
		try {
			if (headers) headers = JSON.parse(headers as unknown as string);
		} catch (err) {}
		if (!targetfilename && uri) targetfilename = uri.split("/")[uri.split("/").length - 1].split("?")[0];
	}

	export let dialogClasses = "";
	export let backdrop = true;
	export let ignoreBackdrop = false;
	export let keyboard = true;
	export let describedby = "";
	export let labelledby = "";
	export let onOpened = () => dispatch("downloadStart", { id, uri });
	export let onClosed = () => dispatch("downloadEnd", { id, downloaded, uri });
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

		function onRequestError(error: any) {
			uri = "";
			show = false;
			xhr = null;
			downloaded = false;
			dispatch("downloadError", { downloaded, id, error });
		}

		xhr = new XMLHttpRequest();
		try {
			xhr.open("GET", uri, true);
			if (headers) {
				for (const header of Object.keys(headers)) {
					xhr.setRequestHeader(header, headers[header]);
				}
			}

			xhr.responseType = "blob";
			xhr.onload = function () {
				if (xhr.status && (xhr.status > 299 || xhr.status < 200)) return onRequestError("request error");
				const urlCreator = window.URL || window.webkitURL;
				const imageUrl = urlCreator.createObjectURL(this.response);
				const tag = document.createElement("a");
				tag.href = imageUrl;
				tag.target = "_blank";
				tag.download = targetfilename;
				document.body.appendChild(tag);
				tag.click();
				document.body.removeChild(tag);
				console.log("loadEnd");
				uri = "";
				show = false;
				xhr = null;
				downloaded = true;
				return dispatch("downloadComplete", { downloaded, id });
			};
			xhr.onerror = (error) => {
				return onRequestError(error);
				// uri = "";
				// show = false;
				// xhr = null;
				// downloaded = false;
				// dispatch("downloadError", { downloaded, id, error });
			};
			xhr.onprogress = function (event) {
				total = event?.total || 0;
				loaded = event?.loaded || 0;
				// console.log("PROGRES", event?.total, event?.loaded, event);
			};
			xhr.onloadend = function (event) {};
			xhr.send();
		} catch (error) {
			console.error("download err ", error);

			return onRequestError(error);
		}
	}
	function onModalClosed() {
		if (_keyboardEvent) {
			_keyboardEvent.remove();
		}
		onClosed();
		downloaded = false;
	}
	// Watching changes for Open vairable
	$: {
		if (show) {
			modalOpen();
		} else {
			modalClose();
		}
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
				<div class="modal-header">
					<h5 class="modal-title" style="width: 100%;text-align:center"><slot name="title-label">Downloading</slot></h5>
				</div>
				<div class="modal-body">
					{#if !total}
						<div class="progress">
							<div
								class="progress-bar progress-bar-striped progress-bar-animated"
								role="progressbar"
								aria-valuenow="100"
								aria-valuemin="0"
								aria-valuemax="100"
								style="width: 100%"
							/>
						</div>
					{:else}
						<div class="progress">
							<div
								class="progress-bar"
								style="width:{Math.round((loaded / total) * 100)}%"
								role="progressbar"
								aria-valuenow={Math.round((loaded / total) * 100)}
								aria-valuemin="0"
								aria-valuemax="100"
							>
								{Math.round((loaded / total) * 100)}%
							</div>
						</div>
					{/if}
				</div>
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
