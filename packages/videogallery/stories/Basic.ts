interface ITableHeader {
	label: string;
	key: string;
	type?: string;
	format?: string;
	search?: boolean;
}

export interface TableProps {
	cards: any[];
	headers: ITableHeader[];
	size?: number;
	page?: number;
	primarycolor?: string;
}

export const createTable = ({ cards, size, page, primarycolor }: TableProps) => {
	const script = document.createElement("script");
	script.src = "http://localhost:5000/videogallerycomponent.js";
	document.body.appendChild(script);

	let html = `<videogallery-bootstrap-component cards='${JSON.stringify(cards)}'`;
	if (size) {
		html += ` size='${size.toString()}'`;
	}
	if (page) {
		html += ` page='${page.toString()}'`;
	}
	if (primarycolor) {
		html += ` primarycolor='${primarycolor.toString()}'`;
	}
	html += "></videogallery-bootstrap-component>";

	return html;
};
