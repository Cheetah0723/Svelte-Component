import { Story, Meta } from "@storybook/html";
import { createTable, TableProps } from "./Basic";

const rows = [
	{ title: "bau", videoSrc: "https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video", time: "2021-08-06T22:46:30.565Z" },
	{ title: "bb1", videoSrc: "https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video", time: "2021-08-06T22:46:31.565Z" },
	{ title: "bb2", time: "2021-08-02T22:46:32.565Z" },
	{ title: "ss", time: "2021-08-06T22:46:34.565Z", description: "fffffff", testnested: { nested: "dddd" } },
	{ title: "bb4", time: "2021-08-06T22:46:34.565Z" },
	{ title: "aa5", time: "2021-08-06T22:46:34.565Z" },
	{ title: "bb6", time: "2021-08-06T22:46:34.565Z" },
	{ title: "bb7", time: "2021-08-06T22:46:34.565Z" },
	{ title: "bb8", time: "2021-08-06T22:46:34.565Z" },
	{ title: "bb9", time: "2021-08-06T22:46:33.565Z" },
	{ title: "bb10", time: "2021-08-06T22:46:34.565Z" },
	{ title: "bb11", time: "2021-08-06T22:46:34.565Z" },
	{ title: "bb12", time: "2021-08-06T22:46:34.565Z", videoSrc: "https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video" },
	{ title: "bb13", time: "2021-08-07T22:46:39.565Z" },
];
const headers = [
	{
		label: "title",
		key: "title",
		search: true,
	},
	{
		label: "description",
		key: "description",
	},
	{
		label: "nested",
		key: "testnested.nested",
	},
	{
		label: "data",
		key: "time",
		type: "datetime",
		format: "DD MMMM YYYY",
	},
];

export default {
	title: "Table/Basic",
	argTypes: {
		size: { control: { type: "range", min: 1, max: rows.length + 2 } },
		page: { control: { type: "number" } },
		primarycolor: { control: { type: "color" } },
	},
} as Meta;

const Template: Story<TableProps> = (args) => createTable(args);

export const BasicTable = Template.bind({});
BasicTable.args = {
	rows,
	headers,
};
