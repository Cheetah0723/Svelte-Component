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

	import { dictionary } from "../functions/i18n";

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
	export let language: string;

	if (!logouri) {
		logouri = "https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg";
	}

	let email: string;

	let password: string;
	let getWord;
	$: {
		console.log("l", language);

		if (!language || !dictionary[language]) {
			const autolang = navigator.languages[0];

			console.log("autolang", autolang);
			if (navigator?.languages[0] && dictionary[autolang]) {
				language = autolang;
			} else {
				console.log("lang", language);
				language = "en";
			}
		}
		getWord = (w) => {
			console.log("lll", language);
			const dict = dictionary[language];

			let word = dict[w];

			if (!word && language !== "en") word = dictionary["en"][w];

			return word || "";
		};
		console.log("ll", language);

		if (!type) {
			type = "login";
		}
		if (!email) {
			email = "";
		}
		if (!password) {
			password = "";
		}
		if (!requestmethod) {
			requestmethod = "post";
		}
	}

	async function login() {
		dispatch("login", {
			email,
			password,
		});
	}

	async function register() {
		dispatch("register", {
			email,
			password,
		});
	}
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		// console.log(`svelte: ${name}`);
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	function switchType(t: "login" | "register") {
		console.log(type);

		type = t;
		console.log(type);
	}
	//test@tt.com
	console.log(type);
</script>

<div id="webcomponent" class="text-center">
	<main class="form-signin">
		<img class="mb-4 text-center" src={logouri} alt="" width="72" height="57" />
		<h1 class="h3 mb-3 fw-normal">
			{#if type === "login"}
				<h1 class="h3 mb-3 fw-normal">{getWord("loginTitle")}</h1>
			{:else if type === "register"}
				<h1 class="h3 mb-3 fw-normal">{getWord("registerTitle")}</h1>
			{/if}
		</h1>
		<div class="form-floating">
			<input type="email" class="form-control" bind:value={email} placeholder="name@example.com" />
			<label for="floatingInput">Email address</label>
		</div>
		<div class="form-floating">
			<input type="password" class="form-control" placeholder="Password" bind:value={password} />
			<label for="floatingPassword">Password</label>
		</div>
		{#if type === "login"}
			<div class="checkbox mb-3">
				<label>
					<input type="checkbox" value="remember-me" /> Remember me
				</label>
			</div>
			<button class="w-100 btn btn-lg btn-primary" on:click={login}>Sign in</button>
			<p>
				<button class="btn btn-link" on:click={() => switchType("register")}>register</button>
			</p>
		{:else if type === "register"}
			<div class="checkbox mb-3">
				<label />
			</div>
			<button class="w-100 btn btn-lg btn-primary" on:click={login}>Sign in</button>
			<p>
				<button class="btn btn-link" on:click={() => switchType("login")}>login</button>
			</p>
		{/if}
		<!-- <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p> -->
	</main>
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
