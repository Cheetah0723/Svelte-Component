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
	export let id: string;

	export let type: "login" | "register" | "activate" | "recover" | "forgetpassword";

	export let language: string;

	export let sessionkey: string;

	export let redirectonlogin: string;
	export let redirectoncreate: string;
	export let loginuri: string;
	export let registeruri: string;
	export let activateuri: string;
	export let recoveruri: string;
	export let requestmethod: string;
	export let appendqueryparams: string;
	export let appendbodyparams: string;
	export let logouri: string;
	export let oauth2providers: string;
	export let disableregister: boolean = null;

	export let passwordpattern: string;
	export let recoverycode: string;

	// export let expectmailconfirm: string;
	let oauth2ProvidersObj: {
		provider: string;
		uri: string;
	}[];

	let email: string;
	let checkValidity: boolean;
	let rememberMe: boolean;

	let password: string;
	let getWord;
	let localDictionary = dictionary["en"];
	let recoveryCodeExists = false;
	$: {
		if (!id) {
			id = null;
		}
		if (!passwordpattern) {
			passwordpattern = null;
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
		if (!email) {
			email = "";
		}
		if (!password) {
			password = "";
		}
		if (location?.href && location.href.split("recoverycode=").length > 1) {
			recoverycode = location.href.split("recoverycode=")[1].split("&")[0];
			recoveryCodeExists = true;
			if (location?.href && location.href.split("recoverytype=").length > 1) {
				type = location.href.split("recoverytype=")[1].split("&")[0] as unknown as "activate" | "recover" | "forgetpassword";
			}
		} else if (!recoverycode) {
			recoverycode = "";
		}

		if (!logouri) {
			logouri = "";
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
		if (!recoveruri) {
			recoveruri = null;
		}
		if (!disableregister || (disableregister as unknown as string) === "no") {
			disableregister = false;
		}
		if (!activateuri) {
			activateuri = null;
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
		console.log(disableregister);
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

	function checkValidityFn(type: "password" | "email") {
		checkValidity = true;
		if (type === "email") {
			if (email.length && email.length > 3 && email.split("@").length === 2 && email.split(".")[email.split(".").length - 1]?.length > 1) return true;
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
		if (checkValidityFn("email") && checkValidityFn("password")) {
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

					const serverAnswer = await response.json();
					const answer = serverAnswer;
					// answer.requestSent = { user, password, rememberMe, uri: loginuri };
					if (!answer.ok && !answer.token) {
						console.log(answer);
						throw new Error("invalid login");
					}

					if (rememberMe) setLoginOnStorage(JSON.stringify(answer));
					else setLoginSession(JSON.stringify(answer));

					if (redirectonlogin) location.href = redirectonlogin;
					dispatch("login", answer);
				} catch (err) {
					console.error(err);

					console.error("invalid login", { email, password, rememberMe });
				}
			} else {
				// const cookie = {
				// 	user,
				// 	password,
				// };
				// setLoginCookie(JSON.stringify(cookie));
				// if (redirectonlogin) location.href = redirectonlogin;

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

	function setLoginOnStorage(tokenStringified: string, expire?: number) {
		localStorage.setItem(sessionkey, tokenStringified);
	}

	function setLoginSession(tokenStringified: string, expire?: number) {
		sessionStorage.setItem(sessionkey, tokenStringified);
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
					const cookie = {
						email,
						password,
					};
					// setLoginCookie(JSON.stringify(cookie));

					if (redirectoncreate) location.href = redirectoncreate;
					dispatch("register", answer);
				} catch (err) {
					console.error(err);
					console.error("invalid register", { email, password, uri: registeruri });
				}
			} else {
				// const cookie = {
				// 	user,
				// 	password,
				// };
				// setLoginCookie(JSON.stringify(cookie));
				// if (redirectoncreate) location.href = redirectoncreate;

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
		email = "";
		password = "";
		rememberMe = false;
		checkValidity = false;
		type = t;
	}
	//test@tt.com
	function recoverOrActivate() {
		if (password && recoverycode) {
			// TODO: is useful to use fetch here and on register or login!?
			console.log("unsupported yet");
		} else if (type === "activate" && activateuri) {
			console.log("unsupported yet");
		} else {
			dispatch("recoverOrActivate", { password, recoverycode });
		}
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
<div id="webcomponent" class="text-center">
	<main class="form-signin">
		<slot name="header">
			{#if logouri}
				<div class="mb-4 text-center">
					<img src={logouri} alt="" width="90" />
				</div>
			{/if}
		</slot>

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

		{#if type === "login" || type === "register"}
			<div class="form-floating">
				<input
					type="text"
					class="form-control {checkValidity ? (checkValidityFn('email') ? 'is-valid' : 'is-invalid') : ''}"
					bind:value={email}
					placeholder="name@example.com"
					required
				/>

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
		{:else if type === "activate" || type === "recover"}
			<div class="form-floating">
				{#if !recoveryCodeExists}
					<input type="password" class="form-control" placeholder="Password" bind:value={recoverycode} required />
				{:else}
					<input type="password" class="form-control" placeholder="Password" bind:value={recoverycode} disabled />
				{/if}
				<label for="floatingPassword">Codice temporaneo</label>
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
				<label for="floatingPassword">Nuova Password</label>
			</div>
		{/if}

		{#if type === "login"}
			<div class="checkbox mb-3">
				<label>
					<input type="checkbox" bind:checked={rememberMe} />
					{getWord("rememberMe")}
				</label>
			</div>
			<button class="w-100 btn btn-lg btn-primary" on:click={login}>{getWord("loginButton").toUpperCase()}</button>
			{#if !disableregister}
				<p style="margin-bottom:0px">
					<button class="btn btn-link" on:click={() => switchType("register")}>{getWord("registerSwitch")}</button>
				</p>
			{/if}
		{:else if type === "register"}
			<div class="checkbox mb-3">
				<label />
			</div>
			<button class="w-100 btn btn-lg btn-primary" on:click={register}>{getWord("registerButton").toUpperCase()}</button>
			<p style="margin-bottom:0px">
				<button class="btn btn-link" on:click={() => switchType("login")}>{getWord("loginSwitch")}</button>
			</p>
		{:else if type === "activate" || type === "recover"}
			<div class="checkbox mb-3">
				<label />
			</div>
			<button class="w-100 btn btn-lg btn-primary" on:click={recoverOrActivate}>Memorizza</button>
		{/if}

		<!-- <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p> -->
	</main>
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
