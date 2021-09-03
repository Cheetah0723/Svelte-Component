<svelte:options tag="sidebar-component" />

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
	export let opened: boolean;

	$: {
		if (!opened || (opened as unknown) === "yes") {
			opened = true;
		} else {
			opened = false;
		}
		console.log(opened);
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
<div id="webcomponent">
	{#if opened}
		<div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;min-height:100vh">
			<a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
				<svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap" /></svg>
				<span class="fs-4">Sidebar</span>
			</a>
			<hr />
			<ul class="nav nav-pills flex-column mb-auto">
				<li class="nav-item">
					<a href="#" class="nav-link active" aria-current="page">
						<svg class="bi me-2" width="16" height="16"><use xlink:href="#home" /></svg>
						Home
					</a>
				</li>
				<li>
					<a href="#" class="nav-link link-dark">
						<svg class="bi me-2" width="16" height="16"><use xlink:href="#speedometer2" /></svg>
						Dashboard
					</a>
				</li>
				<li>
					<a href="#" class="nav-link link-dark">
						<svg class="bi me-2" width="16" height="16"><use xlink:href="#table" /></svg>
						Orders
					</a>
				</li>
				<li>
					<a href="#" class="nav-link link-dark">
						<svg class="bi me-2" width="16" height="16"><use xlink:href="#grid" /></svg>
						Products
					</a>
				</li>
				<li>
					<a href="#" class="nav-link link-dark">
						<svg class="bi me-2" width="16" height="16"><use xlink:href="#people-circle" /></svg>
						Customers
					</a>
				</li>
			</ul>
			<hr />
			<div class="dropdown">
				<a
					href="#"
					class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
					id="dropdownUser2"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					<img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2" />
					<strong>mdo</strong>
				</a>
				<ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
					<li><a class="dropdown-item" href="#">New project...</a></li>
					<li><a class="dropdown-item" href="#">Settings</a></li>
					<li><a class="dropdown-item" href="#">Profile</a></li>
					<li><hr class="dropdown-divider" /></li>
					<li><a class="dropdown-item" href="#">Sign out</a></li>
				</ul>
			</div>
		</div>
	{:else}
		<div class="d-flex flex-column flex-shrink-0 bg-light" style="width: 4.5rem;min-height:100vh">
			<a href="/" class="d-block p-3 link-dark text-decoration-none" title="Icon-only" data-bs-toggle="tooltip" data-bs-placement="right">
				<svg class="bi" width="40" height="32"><use xlink:href="#bootstrap" /></svg>
				<span class="visually-hidden">Icon-only</span>
			</a>
			<ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
				<li class="nav-item">
					<a href="#" class="nav-link active py-3 border-bottom" aria-current="page" title="Home" data-bs-toggle="tooltip" data-bs-placement="right">
						<svg class="bi" width="24" height="24" role="img" aria-label="Home"><use xlink:href="#home" /></svg>
					</a>
				</li>
				<li>
					<a href="#" class="nav-link py-3 border-bottom" title="Dashboard" data-bs-toggle="tooltip" data-bs-placement="right">
						<svg class="bi" width="24" height="24" role="img" aria-label="Dashboard"><use xlink:href="#speedometer2" /></svg>
					</a>
				</li>
				<li>
					<a href="#" class="nav-link py-3 border-bottom" title="Orders" data-bs-toggle="tooltip" data-bs-placement="right">
						<svg class="bi" width="24" height="24" role="img" aria-label="Orders"><use xlink:href="#table" /></svg>
					</a>
				</li>
				<li>
					<a href="#" class="nav-link py-3 border-bottom" title="Products" data-bs-toggle="tooltip" data-bs-placement="right">
						<svg class="bi" width="24" height="24" role="img" aria-label="Products"><use xlink:href="#grid" /></svg>
					</a>
				</li>
				<li>
					<a href="#" class="nav-link py-3 border-bottom" title="Customers" data-bs-toggle="tooltip" data-bs-placement="right">
						<svg class="bi" width="24" height="24" role="img" aria-label="Customers"><use xlink:href="#people-circle" /></svg>
					</a>
				</li>
			</ul>
			<div class="dropdown border-top">
				<a
					href="#"
					class="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle"
					id="dropdownUser3"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					<img src="https://github.com/mdo.png" alt="mdo" width="24" height="24" class="rounded-circle" />
				</a>
				<ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
					<li><a class="dropdown-item" href="#">New project...</a></li>
					<li><a class="dropdown-item" href="#">Settings</a></li>
					<li><a class="dropdown-item" href="#">Profile</a></li>
					<li><hr class="dropdown-divider" /></li>
					<li><a class="dropdown-item" href="#">Sign out</a></li>
				</ul>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
