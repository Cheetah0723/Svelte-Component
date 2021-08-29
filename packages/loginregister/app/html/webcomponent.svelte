<svelte:options tag="loginregister-component" />

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
	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";

	export let type: "login" | "register";

	export let expectmailconfirm: string;

	export let serveruri: string;
	export let requestmethod: string;
	export let appendqueryparams: string;
	export let appendbodyparams: string;
	export let logouri: string;
	export let oauth2providers: string;
	if (!logouri) {
		logouri = "https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg";
	}
	$: {
		if (!type) {
			type = "login";
		}

		if (!requestmethod) {
			requestmethod = "post";
		}
	}

	async function login() {}

	async function register() {}
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		// console.log(`svelte: ${name}`);
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
</script>

<div id="webcomponent" class="text-center">
	<main class="form-signin">
		{#if type === "login"}
			<form>
				<img class="mb-4 text-center" src={logouri} alt="" width="72" height="57" />
				<h1 class="h3 mb-3 fw-normal">Please sign in</h1>

				<div class="form-floating">
					<input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
					<label for="floatingInput">Email address</label>
				</div>
				<div class="form-floating">
					<input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
					<label for="floatingPassword">Password</label>
				</div>

				<div class="checkbox mb-3">
					<label>
						<input type="checkbox" value="remember-me" /> Remember me
					</label>
				</div>
				<button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
				<p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
			</form>
		{:else if type === "register"}
			todo
		{/if}
	</main>
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
