export interface IFilter {
	key: string;
	value?: string;
	type?: "datetime" | "string" | "enum";
	start?: Date;
	end?: Date;
}
export interface ITableHeader {
	label: string;
	key: string;
	type?: "datetime" | "string" | "enum" | "actions";
	format?: string;
	search?: boolean;
	click?: boolean;
	select?: string[];
	nosort?: boolean;
	sortBy?: "asc" | "desc" | "none";
}

export interface IRow {
	_id: string;
	_actions?: IActionButton[];
	[k: string]: string | IActionButton[];
}

export interface IActionButton {
	name: string;
	type: "icon" | "text";
	iconOrText: string;
	btnClass?: string;
	disabled?: boolean;
	confirm?: {
		title: string;
		text?: string;
		confirmLabel: string;
		denyLabel?: string;
		content: string;
	};
}
