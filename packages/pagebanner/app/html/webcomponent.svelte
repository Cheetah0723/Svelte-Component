<svelte:options tag="pagebanner-component" />

<script lang="ts">
	/**
	 * Svelte Video Login/Register/Forget Password WebComponent
	 * =====================
	 *
	 * @contributors: Dario Caruso <dev@dariocaruso.info> (https://dariocaruso.info)
	 *
	 * @license: MIT License
	 *
	 */

	import { dictionary } from "../functions/i18n";

	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";
	export let id: string;

	export let logouri: string;
	export let title: string;
	export let description: string;

	$: {
		if (!id) {
			id = null;
		}
		if (!logouri) {
			logouri = null;
		}
		if (!title) {
			title = null;
		}
		if (!description) {
			description = "email";
		}
	}
</script>

<div class="container align-items-center d-none d-lg-block">
	<div class="row">
		<div class="col-lg-4" style="text-align: right;">
			<img alt="" src={logouri} style="height: 150px;" />
		</div>
		<div class="col-lg-8">
			<h2 style="padding-top: 10px;"><strong>{title}</strong></h2>
			<h3 style="margin-top: 20px;">{description}</h3>
		</div>
	</div>
</div>

<div class="container d-lg-none">
	<div class="row">
		<div class="col-lg-4" style="text-align: center;">
			<img alt="" src={logouri} style="height: 150px;" />
		</div>
		<div class="col-lg-8">
			<h2 style="padding-top: 10px;text-align:center"><strong>{title}</strong></h2>
			<h3 style="margin-top: 20px;text-align:center">{description}</h3>
		</div>
	</div>
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
