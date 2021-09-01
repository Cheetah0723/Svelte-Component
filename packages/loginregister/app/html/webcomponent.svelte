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

	export let language: string;

	export let loginuri: string;
	export let registeruri: string;
	export let requestmethod: string;
	export let appendqueryparams: string;
	export let appendbodyparams: string;
	export let logouri: string;
	// export let oauth2providers: string;
	// export let expectmailconfirm: string;

	let email: string;
	let checkValidity: boolean;
	let rememberMe: boolean;

	let password: string;
	let getWord;
	let localDictionary = dictionary["en"];
	$: {
		if (!type) {
			type = "login";
		}
		if (!email) {
			email = "";
		}
		if (!password) {
			password = "";
		}
		if (!logouri) {
			logouri = "https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg";
		}
		// validation
		checkValidity = false;

		// fetch request config
		if (!appendqueryparams) {
			appendqueryparams = null;
		}
		if (!appendbodyparams) {
			appendbodyparams = null;
		}
		if (!loginuri) {
			loginuri = null;
		}
		if (!registeruri) {
			registeruri = null;
		}
		if (appendqueryparams) {
			if (loginuri)
				loginuri = loginuri.split("/")[loginuri.split("/").length].includes("?")
					? `${loginuri}&${appendqueryparams}`
					: `${loginuri}?${appendqueryparams}`;
			if (registeruri)
				registeruri = registeruri.split("/")[registeruri.split("/").length].includes("?")
					? `${registeruri}&${appendqueryparams}`
					: `${registeruri}?${appendqueryparams}`;
		} else {
			appendqueryparams = null;
		}

		if (!requestmethod) {
			requestmethod = "POST";
		} else {
			requestmethod = requestmethod.toUpperCase();
		}
		// i18n
		if (!language || !dictionary[language]) {
			const autolang = navigator?.languages ? navigator.languages[0]?.split("-")[0]?.toLowerCase() : null;
			if (autolang && dictionary[autolang]) {
				language = autolang;
			} else {
				language = "en";
			}
			localDictionary = dictionary[language];
		} else {
			localDictionary = dictionary[language];
		}
		getWord = (w) => {
			return localDictionary[w] || dictionary["en"][w] || "";
		};
	}

	function checkValidityFn(type: "password" | "email") {
		checkValidity = true;
		if (type === "email") {
			if (email.length && email.length > 3) return true;
		} else if (type === "password") {
			if (password.length && password.length > 3) return true;
		}
		return false;
	}

	async function login() {
		if (checkValidityFn("email") && checkValidityFn("password")) {
			if (loginuri) {
				try {
					let response;
					if (requestmethod === "GET") {
						response = await fetch(`${loginuri}`, {
							method: requestmethod, // *GET, POST, PUT, DELETE, etc.
							// mode: "cors", // no-cors, *cors, same-origin
							cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
							// credentials: "same-origin", // include, *same-origin, omit
							headers: {
								"Content-Type": "application/json",
								// 'Content-Type': 'application/x-www-form-urlencoded',
							},
							redirect: "follow", // manual, *follow, error
							referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
						});
					} else {
						let body = { email, password, rememberMe };
						if (appendbodyparams) Object.assign(body, JSON.parse(appendbodyparams));

						response = await fetch(`${loginuri}`, {
							method: requestmethod, // *GET, POST, PUT, DELETE, etc.
							// mode: "cors", // no-cors, *cors, same-origin
							cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
							// credentials: "same-origin", // include, *same-origin, omit
							headers: {
								"Content-Type": "application/json",
								// 'Content-Type': 'application/x-www-form-urlencoded',
							},
							redirect: "follow", // manual, *follow, error
							referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
							body: JSON.stringify(body), // body data type must match "Content-Type" header
						});
					}

					const answer = await response.json();
					answer.ok = true;
					answer.requestSent = { email, password, rememberMe, uri: loginuri };

					dispatch("login", answer);
				} catch (err) {
					console.error("invalid login", { email, password, rememberMe });
				}
			} else {
				dispatch("login", {
					email,
					password,
					rememberMe,
				});
			}
		} else {
			console.error("invalid login", { email, password, rememberMe });
		}
	}

	async function register() {
		if (checkValidityFn("email") && checkValidityFn("password")) {
			if (registeruri) {
				try {
					let response;
					if (requestmethod === "GET") {
						response = await fetch(`${registeruri}`, {
							method: requestmethod, // *GET, POST, PUT, DELETE, etc.
							// mode: "cors", // no-cors, *cors, same-origin
							cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
							// credentials: "same-origin", // include, *same-origin, omit
							headers: {
								"Content-Type": "application/json",
								// 'Content-Type': 'application/x-www-form-urlencoded',
							},
							redirect: "follow", // manual, *follow, error
							referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
						});
					} else {
						let body = { email, password };
						if (appendbodyparams) Object.assign(body, JSON.parse(appendbodyparams));

						response = await fetch(`${registeruri}`, {
							method: requestmethod, // *GET, POST, PUT, DELETE, etc.
							// mode: "cors", // no-cors, *cors, same-origin
							cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
							// credentials: "same-origin", // include, *same-origin, omit
							headers: {
								"Content-Type": "application/json",
								// 'Content-Type': 'application/x-www-form-urlencoded',
							},
							redirect: "follow", // manual, *follow, error
							referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
							body: JSON.stringify(body), // body data type must match "Content-Type" header
						});
					}
					const answer = await response.json();
					answer.ok = true;
					answer.requestSent = { email, password };
					dispatch("register", answer);
				} catch (err) {
					console.error("invalid register", { email, password, uri: registeruri });
				}
			} else {
				dispatch("register", {
					email,
					password,
				});
			}
		} else {
			console.error("invalid register", { email, password });
		}
	}
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		// console.log(`svelte: ${name}`);
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	function switchType(t: "login" | "register") {
		type = t;
	}
	//test@tt.com
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
			<input
				type="email"
				class="form-control {checkValidity ? (checkValidityFn('email') ? 'is-valid' : 'is-invalid') : ''}"
				bind:value={email}
				placeholder="name@example.com"
			/>
			<label for="floatingInput">Email</label>
		</div>
		<div class="form-floating">
			<input
				type="password"
				class="form-control {checkValidity ? (checkValidityFn('password') ? 'is-valid' : 'is-invalid') : ''}"
				placeholder="Password"
				bind:value={password}
			/>
			<label for="floatingPassword">Password</label>
		</div>
		{#if type === "login"}
			<div class="checkbox mb-3">
				<label>
					<input type="checkbox" bind:checked={rememberMe} />
					{getWord("rememberMe")}
				</label>
			</div>
			<button class="w-100 btn btn-lg btn-primary" on:click={login}>{getWord("loginButton").toUpperCase()}</button>
			<p>
				<button class="btn btn-link" on:click={() => switchType("register")}>{getWord("registerSwitch")}</button>
			</p>
		{:else if type === "register"}
			<div class="checkbox mb-3">
				<label />
			</div>
			<button class="w-100 btn btn-lg btn-primary" on:click={register}>{getWord("registerButton").toUpperCase()}</button>
			<p>
				<button class="btn btn-link" on:click={() => switchType("login")}>{getWord("loginSwitch")}</button>
			</p>
		{/if}
		<!-- <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p> -->
	</main>
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
