export interface ICapabilities {
	groups: {
		_id: string;
		label: string;
		type: string;
	}[];
	items: {
		groupId: string;
		title: string;
		scope: string;
		description?: string;
		descriptionUrl?: string;
		_id: string;
		thirdCompanyName?: string;
		cookieName: string;
		isMandatory?: boolean;
		isTechnical?: boolean;
		isMarketing?: boolean;
		isThirdPartyOwned?: boolean;
		isSessionCookie?: boolean;
		cookieExpirationInSeconds?: number;
	}[];
}
