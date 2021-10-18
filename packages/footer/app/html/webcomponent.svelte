<svelte:options tag="footerbootstrap-component" />

<script lang="ts">
	/**
	 * Svelte Video Gallery WebComponent
	 * =====================
	 *
	 * @contributors: Dario Caruso <dev@dariocaruso.info> (https://dariocaruso.info)
	 *
	 * @license: MIT License
	 *
	 */

	interface IPhoneContact {
		label?: string;
		number: string;
		_id?: string;
	}
	interface IAddressContact {
		googleMapUri?: string;
		address: string;
		shortAddress?: string;
		_id?: string;
	}
	interface ISiteContact {
		label?: string;
		uri: string;
		open?: boolean;
		_id?: string;
	}
	interface IEmailContact {
		label?: string;
		address: string;
		_id?: string;
	}

	interface IColumn {
		_id?: string;
		cells: {
			label?: string;
			_id: string;
			phone?: IPhoneContact;
			address?: IAddressContact;
			email?: IEmailContact;
			site?: ISiteContact;
		}[];
		title?: string;
	}
	interface IBrandAndContacts {
		companyName: string;
		companyLogoUri: string;
	}
	interface ISmallRow {}
	interface IFooterBottom {}

	interface IPolicies {
		label: string;
		key: string;
	}

	interface ISocials {
		facebook: string;
		gmail: string;
		twitter: string;
		github: string;
		youtube: string;
		twitch: string;
		discord: string;
	}

	interface IContacts {
		phones?: IPhoneContact[];
		addresses?: IAddressContact[];
		emails?: IEmailContact[];
		sites?: ISiteContact[];
	}

	interface ICompany {
		logoUri: string;
		siteName: string;
		companyName: string;
		registration?: { since?: number; text?: string };
		description: string;
		vatNumber?: string;
		fiscalCode?: string;
		since?: number;
	}

	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import pkg from "../../package.json";

	export let id: string;
	export let company: ICompany;
	export let smallrow: ISmallRow;
	export let brandandcontacts: IBrandAndContacts;
	export let columns: IColumn[];
	export let footerbottom: IFooterBottom;
	export let description: string;

	export let socials: ISocials;
	export let contacts: IContacts;
	export let copyrighttext: string;
	export let policies: IPolicies[];
	$: {
		if (!id) id = "";

		if (!copyrighttext) copyrighttext = "";
		if (!description) description = "";

		if (!company) {
			company = null;
		} else {
			try {
				company = JSON.parse(company as unknown as string);
			} catch (err) {}
		}

		if (!columns) {
			columns = null;
		} else {
			try {
				columns = JSON.parse(columns as unknown as string);

				let n = 0;
				for (const c of columns) {
					if (!c._id) c._id = "ccc_" + n.toString();
					n++;
				}
			} catch (err) {}
		}

		if (!brandandcontacts) {
			brandandcontacts = null;
		} else {
			try {
				brandandcontacts = JSON.parse(brandandcontacts as unknown as string);
			} catch (err) {}
		}
		if (!smallrow) {
			smallrow = null;
		} else {
			try {
				smallrow = JSON.parse(smallrow as unknown as string);
			} catch (err) {}
		}
		if (!footerbottom) {
			footerbottom = null;
		} else {
			try {
				footerbottom = JSON.parse(footerbottom as unknown as string);
			} catch (err) {}
		}
		if (!socials) {
			socials = null;
		} else {
			try {
				socials = JSON.parse(socials as unknown as string);
			} catch (err) {}
		}
		if (!contacts) {
			contacts = null;
		} else {
			try {
				contacts = JSON.parse(contacts as unknown as string);
				let n = 0;
				if (contacts.phones?.length) {
					for (const phone of contacts.phones) {
						n++;
						if (!phone._id) phone._id = n.toString();
					}
				}
				if (contacts.emails?.length) {
					for (const email of contacts.emails) {
						n++;
						if (!email._id) email._id = n.toString();
					}
				}
				if (contacts.addresses?.length) {
					for (const address of contacts.addresses) {
						n++;
						if (!address._id) address._id = n.toString();
					}
				}
				if (contacts.sites?.length) {
					for (const site of contacts.sites) {
						n++;
						if (!site._id) site._id = n.toString();
					}
				}
			} catch (err) {}
		}
		if (!policies) {
			policies = null;
		} else {
			try {
				policies = JSON.parse(policies as unknown as string);
			} catch (err) {}
		}
	}
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		// console.log(`svelte: ${name}`);
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	function footerClick(elClick: string) {
		dispatch("footerClick", {
			elClick,
		});
	}

	if (!document.getElementById("contactcomponentscript")) {
		const script = document.createElement("script");
		script.id = "contactcomponentscript";
		script.src = `https://cdn.jsdelivr.net/npm/@htmlbricks/contact-component@${pkg.version}/release/contact.js`;
		if (location.href.includes("localhost")) script.src = `http://localhost:6006/contact/dist/contact.js`;

		document.head.appendChild(script);
	}
</script>

<footer>
	<div class="container">
		<slot name="footerheader" class="row">
			<!-- <div class="row">
			<div class="col" style="max-height:40px">
				{#if companylogouri}
					<span><img style="height: 100%;" alt="" src={companylogouri} /></span>
				{/if}

				{company.siteName}
			</div>
		</div> -->
		</slot>
		<slot name="footercontent">
			<div class="row">
				<div style="padding:20px 20px" class="col-md-{12 / (1 + (contacts ? 1 : 0) + (socials ? 1 : 0) + (columns?.length ? columns.length : 0))}">
					<div class="row">
						<div class="col">
							{#if company?.logoUri}
								<span><img style="height: 40px" alt="" src={company.logoUri} /></span>
							{/if}
							{company?.siteName || ""}
						</div>
					</div>
					<div id="description" style="margin:20px auto 10px auto">
						{company?.description || ""}
					</div>
					<div id="company" style="margin:20px auto 10px auto">
						{company?.companyName || ""}
					</div>
					<div id="fiscal" style="margin:20px auto 10px auto">
						{company?.vatNumber || company?.fiscalCode || ""}
					</div>
				</div>
				{#if contacts}
					<div style="padding:20px 20px" class="col-md-{12 / (1 + (contacts ? 1 : 0) + (socials ? 1 : 0) + (columns?.length ? columns.length : 0))}">
						<h5 style="margin-bottom:20px">Contatti</h5>
						<ul class="list-unstyled">
							{#if contacts.phones?.length}
								{#each contacts.phones as phone (phone._id)}
									<li><contact-component phone={JSON.stringify(phone)} /></li>
								{/each}
							{/if}
							{#if contacts.addresses?.length}
								{#each contacts.addresses as address (address._id)}
									<li><contact-component address={JSON.stringify(address)} /></li>
								{/each}
							{/if}
							{#if contacts.emails?.length}
								{#each contacts.emails as email (email._id)}
									<li><contact-component email={JSON.stringify(email)} /></li>
								{/each}
							{/if}
							{#if contacts.sites?.length}
								{#each contacts.sites as site (site._id)}
									<li><contact-component site={JSON.stringify(site)} /></li>
								{/each}
							{/if}
						</ul>
					</div>
				{/if}
				{#if socials}
					<div style="padding:20px 20px" class="col-md-{12 / (1 + (contacts ? 1 : 0) + (socials ? 1 : 0) + (columns?.length ? columns.length : 0))}">
						<h5 style="margin-bottom:20px">Social</h5>
						<ul class="list-unstyled">
							{#if socials.facebook}
								<li>
									<contact-component
										social={JSON.stringify({ name: "facebook", label: "pagina facebook", pageUri: "https://facebook.com" })}
									/>
								</li>
							{/if}

							{#if socials?.gmail}
								<li>
									<contact-component social={JSON.stringify({ name: "gmail", label: "pagina gmail", pageUri: "https://gmail.com" })} />
								</li>
							{/if}
							{#if socials?.twitter}
								<li>
									<contact-component social={JSON.stringify({ name: "twitter", label: "pagina twitter", pageUri: "https://twitter.com" })} />
								</li>
							{/if}
							{#if socials?.github}
								<li>
									<contact-component social={JSON.stringify({ name: "github", label: "pagina github", pageUri: "https://github.com" })} />
								</li>
							{/if}
							{#if socials?.twitch}
								<li>
									<contact-component social={JSON.stringify({ name: "twitch", label: "pagina twitch", pageUri: "https://twitch.com" })} />
								</li>
							{/if}
							{#if socials?.youtube}
								<li>
									<contact-component social={JSON.stringify({ name: "youtube", label: "pagina youtube", pageUri: "https://youtube.com" })} />
								</li>
							{/if}
							{#if socials?.discord}
								<li>
									<contact-component social={JSON.stringify({ name: "discord", label: "pagina discord", pageUri: "https://discord.com" })} />
								</li>
							{/if}
						</ul>
					</div>
				{/if}
				{#if columns && columns.length}
					{#each columns as column (column._id)}
						<div
							style="padding:20px 20px"
							class="col-md-{12 / (1 + (contacts ? 1 : 0) + (socials ? 1 : 0) + (columns?.length ? columns.length : 0))}"
						>
							<h5 style="margin-bottom:20px">{column.title ? column.title : ""}</h5>
							<ul class="list-unstyled">
								{#each column.cells as cell (cell._id)}
									{#if cell.label}
										<li>
											<button
												part="column-cell-button-content"
												style="padding:0px"
												class="btn text-small"
												on:click={() => footerClick(cell._id)}>{cell.label}</button
											>
										</li>
									{:else if cell.phone}
										<li><contact-component phone={JSON.stringify(cell.phone)} /></li>
									{:else if cell.address}
										<li><contact-component address={JSON.stringify(cell.address)} /></li>
									{:else if cell.email}
										<li><contact-component email={JSON.stringify(cell.email)} /></li>
									{:else if cell.site}
										<li><contact-component site={JSON.stringify(cell.site)} /></li>
									{:else if cell.label}
										<li>
											<button
												part="column-cell-button-content"
												style="padding:0px"
												class="btn text-small"
												on:click={() => footerClick(cell._id)}>{cell.label}</button
											>
										</li>
									{/if}
								{/each}
							</ul>
						</div>
					{/each}
				{/if}
			</div>
		</slot>

		<div class="row">
			<slot name="footerpolicy">
				{#if policies?.length}
					{#each policies as policy (policy.key)}
						<div class="col" style="margin:20px auto 20px auto;max-height:20px;text-align:center;font-size:0.9rem;">
							<button on:click={() => footerClick(policy.key)} class="btn btn-link">{policy.label}</button>
						</div>
					{/each}
				{/if}
			</slot>
		</div>
		<div class="row">
			<slot name="footerbottom">
				{#if company?.siteName}
					<div class="col" style="max-height:20px;text-align:center;font-size:0.8rem;margin:10px auto 5px auto">
						<!-- {#if company.logoUri}
						<span><img style="height: 100%;" alt="" src={company.logoUri} /></span>
					{/if} -->

						{company?.registration?.text ||
							(company.since ? `${company.since?.toString()} - ` : "") +
								new Date().getFullYear().toString() +
								" " +
								(company?.siteName || "") +
								(company?.companyName ? " - " + (company?.companyName || "") : "")}
					</div>
				{/if}
			</slot>
		</div>
	</div>
</footer>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
