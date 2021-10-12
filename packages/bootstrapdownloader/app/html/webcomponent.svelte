<svelte:options tag="bootstrap-downloader-component" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import pkg from "../../package.json";
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		// console.log(`svelte: ${name}`);
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	import { fade, fly } from "svelte/transition";
	import { quintOut } from "svelte/easing";

	if (!document.getElementById("bootstrapdialogcomponentscript")) {
		const script = document.createElement("script");
		script.id = "bootstrapdialogcomponentscript";
		script.src = `https://cdn.jsdelivr.net/npm/@htmlbricks/bootstrap-dialog-component@${pkg.version}/release/bootstrapdialogcomponent.js`;
		if (location.href.includes("localhost")) script.src = `http://localhost:6006/bootstrapdialog/dist/bootstrapdialogcomponent.js`;

		document.head.appendChild(script);
	}

	export let downloadid: string;
	export let uri: string;
	export let headers: {};
	export let targetfilename: string;
	let total: number;
	let loaded: number;
	let show: boolean;
	let xhr: XMLHttpRequest;
	let downloaded: boolean;
	let errorMessage: string;
	$: {
		if (!downloadid) downloadid = "";
		if (!downloaded) downloaded = false;
		if (uri) show = true;
		else show = false;
		try {
			if (headers) headers = JSON.parse(headers as unknown as string);
		} catch (err) {}
		if (!targetfilename && uri) targetfilename = uri.split("/")[uri.split("/").length - 1].split("?")[0];
	}

	function onModalOpened() {
		function onRequestError(err: any) {
			console.log(err);
			if (err) errorMessage = err;
			// uri = "";
			// show = false;
			// xhr = null;
			// downloaded = false;
			// downloadid = "";
			dispatch("downloadError", { downloaded, id: downloadid, error: err });
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
				downloadid = "";
				uri = "";
				show = false;
				xhr = null;
				downloaded = true;
				errorMessage = null;
				return dispatch("downloadComplete", { downloaded, id: downloadid });
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

	function dialogShowEvent(d) {
		if (d.show) {
			downloadid = d.id;
			onModalOpened();
		} else {
			show = false;
			downloadid = "";
			errorMessage = null;
		}
	}
</script>

<bootstrap-dialog-component id={downloadid} show={show ? "yes" : "no"} on:modalShow={(d) => dialogShowEvent(d.detail)}>
	<span slot="title">
		<slot name="title">Downloading</slot>
	</span>
	<div slot="body-content">
		{#if !total && !errorMessage}
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
		{:else if !errorMessage}
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
		{:else if errorMessage}
			{errorMessage}
		{/if}
	</div>
	<span slot="modal-footer" />
</bootstrap-dialog-component>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";

	.modal {
		display: block;
	}
</style>
