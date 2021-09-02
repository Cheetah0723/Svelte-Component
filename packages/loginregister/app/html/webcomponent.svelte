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

	export let sessionkey: string;

	export let redirectonlogin: string;
	export let redirectoncreate: string;
	export let loginuri: string;
	export let registeruri: string;
	export let requestmethod: string;
	export let appendqueryparams: string;
	export let appendbodyparams: string;
	export let logouri: string;
	export let oauth2providers: string;

	export let passwordpattern: string;
	export let userpattern: string;
	export let usertype: "email" | "username";
	// export let expectmailconfirm: string;
	let oauth2ProvidersObj: {
		provider: string;
		uri: string;
	}[];

	let user: string;
	let checkValidity: boolean;
	let rememberMe: boolean;

	let password: string;
	let getWord;
	let localDictionary = dictionary["en"];

	$: {
		if (!passwordpattern) {
			passwordpattern = null;
		}
		if (!userpattern) {
			userpattern = null;
		}
		if (!usertype) {
			usertype = "email";
		}
		if (!redirectonlogin) {
			redirectonlogin = null;
		}
		if (!redirectoncreate) {
			redirectoncreate = null;
		}
		if (!type) {
			type = "login";
		}

		if (!sessionkey) {
			sessionkey = "_lg";
		}
		if (!oauth2providers) {
			oauth2ProvidersObj = null;
			oauth2providers = null;
		} else {
			try {
				oauth2ProvidersObj = JSON.parse(oauth2providers);
			} catch (err) {
				console.error("wrong oauth provider params");
				oauth2ProvidersObj = null;
			}
		}
		if (!user) {
			user = "";
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
				loginuri = loginuri.split("/")[loginuri.split("/").length - 1].includes("?")
					? `${loginuri}&${appendqueryparams}`
					: `${loginuri}?${appendqueryparams}`;
			if (registeruri)
				registeruri = registeruri.split("/")[registeruri.split("/").length - 1].includes("?")
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
	// function getCookie(cname: string) {
	// 	let name = cname + "=";
	// 	let decodedCookie = decodeURIComponent(document.cookie);
	// 	let ca = decodedCookie.split(";");
	// 	for (let i = 0; i < ca.length; i++) {
	// 		let c = ca[i];
	// 		while (c.charAt(0) == " ") {
	// 			c = c.substring(1);
	// 		}
	// 		if (c.indexOf(name) == 0) {
	// 			return c.substring(name.length, c.length);
	// 		}
	// 	}
	// 	return "";
	// }
	// console.log(getCookie(cookierequestkeys));

	function checkValidityFn(type: "password" | "user") {
		console.log(usertype, user, type);

		checkValidity = true;
		if (type === "user") {
			if (usertype === "username" && user.length && user.length > 3) return true;
			console.log(usertype, user);
			if (
				usertype === "email" &&
				user.length &&
				user.length > 3 &&
				user.split("@").length === 2 &&
				user.split(".")[user.split(".").length - 1]?.length > 1
			)
				return true;
		} else if (type === "password") {
			if (password.length && password.length > 3) return true;
		}
		return false;
	}

	async function socialLogin(providerName: string) {
		const provider = oauth2ProvidersObj.find((f) => f.provider === providerName);
		location.href = provider.uri;
	}

	async function login() {
		if (checkValidityFn("user") && checkValidityFn("password")) {
			console.log("request");
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
						let body = { user, password, rememberMe };
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

					const serverAnswer = await response.json();
					const answer = serverAnswer;
					answer.ok = true;
					answer.requestSent = { user, password, rememberMe, uri: loginuri };

					setLoginSession(JSON.stringify(answer));

					if (redirectonlogin) location.href = redirectonlogin;
					dispatch("login", answer);
				} catch (err) {
					console.error("invalid login", { user, password, rememberMe });
				}
			} else {
				// const cookie = {
				// 	user,
				// 	password,
				// };
				// setLoginCookie(JSON.stringify(cookie));
				// if (redirectonlogin) location.href = redirectonlogin;

				dispatch("login", {
					user,
					password,
					rememberMe,
				});
			}
		} else {
			console.error("invalid login", { user, password, rememberMe });
		}
	}

	function setLoginSession(tokenStringified: string, expire?: number) {
		localStorage.setItem(sessionkey, tokenStringified);
	}

	async function register() {
		if (checkValidityFn("user") && checkValidityFn("password")) {
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
						let body = { user, password };
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
					answer.requestSent = { user, password };
					const cookie = {
						user,
						password,
					};
					// setLoginCookie(JSON.stringify(cookie));

					if (redirectoncreate) location.href = redirectoncreate;
					dispatch("register", answer);
				} catch (err) {
					console.error("invalid register", { user, password, uri: registeruri });
				}
			} else {
				// const cookie = {
				// 	user,
				// 	password,
				// };
				// setLoginCookie(JSON.stringify(cookie));
				// if (redirectoncreate) location.href = redirectoncreate;

				dispatch("register", {
					user,
					password,
				});
			}
		} else {
			console.error("invalid register", { user, password });
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
		user = "";
		password = "";
		rememberMe = false;
		checkValidity = false;
		type = t;
	}
	//test@tt.com
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
<div id="webcomponent" class="text-center">
	<main class="form-signin">
		<img class="mb-4 text-center" src={logouri} alt="" width="72" height="57" />
		{#if type === "login"}
			<h1 class="h3 mb-3 fw-normal">{getWord("loginTitle")}</h1>
		{:else if type === "register"}
			<h1 class="h3 mb-3 fw-normal">{getWord("registerTitle")}</h1>
		{/if}
		{#if oauth2ProvidersObj?.length}
			<div class="d-flex justify-content-center mt-1">
				<ul class="social-icons">
					{#each oauth2ProvidersObj as p (p.provider)}
						<li>
							<button
								on:click={() => {
									socialLogin(p.provider);
								}}
								class="btn btn-primary dot"><i class="bi-{p.provider}" /></button
							>
						</li>
					{/each}
				</ul>
			</div>

			<h1 class="h3 mb-3 fw-normal">Credenziali</h1>
		{/if}

		<div class="form-floating">
			{#if usertype === "email"}
				<input
					type="email"
					class="form-control {checkValidity ? (checkValidityFn('user') ? 'is-valid' : 'is-invalid') : ''}"
					bind:value={user}
					placeholder="name@example.com"
					pattern={userpattern ? userpattern : ""}
				/>
			{:else if usertype === "username"}
				<input
					type="text"
					class="form-control {checkValidity ? (checkValidityFn('user') ? 'is-valid' : 'is-invalid') : ''}"
					bind:value={user}
					placeholder="name@example.com"
					required
					pattern={userpattern ? userpattern : ""}
				/>
			{/if}

			<label for="floatingInput">Email</label>
		</div>
		<div class="form-floating">
			<input
				type="password"
				class="form-control {checkValidity ? (checkValidityFn('password') ? 'is-valid' : 'is-invalid') : ''}"
				placeholder="Password"
				bind:value={password}
				required
				pattern={passwordpattern ? passwordpattern : ""}
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
