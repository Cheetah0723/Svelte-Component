import { Story, Meta } from "@storybook/html";
import { createTable, TableProps } from "./BasicTable";

const rows = [
  {
    title: "bau",
    videoSrc:
      "https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video",
    time: "2021-08-06T22:46:30.565Z",
    _id: "bau",
    status: "closed",
  },
  {
    title: "bb1",
    videoSrc:
      "https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video",
    time: "2021-08-06T22:46:31.565Z",
    description: "ffff2",
    _id: "bb1",
    status: "closed",
  },
  {
    title: "bb2",
    time: "2021-08-02T22:46:32.565Z",
    _id: "bb2",
    status: "active",
  },
  {
    title: "ss",
    time: "2021-08-06T22:46:34.565Z",
    description: "fffffff",
    testnested: { nested: "dddd" },
    _id: "ss",
    status: "active",
  },
  {
    title: "bb4",
    time: "2021-08-06T22:46:34.565Z",
    _id: "bb4",
    status: "active",
  },
  {
    title: "aa5",
    time: "2021-08-06T22:46:34.565Z",
    _id: "aa5",
    status: "active",
  },
  {
    title: "bb6",
    time: "2021-08-06T22:46:34.565Z",
    _id: "bb6",
    status: "active",
  },
  {
    title: "bb7",
    time: "2021-08-06T22:46:34.565Z",
    _id: "bb7",
    status: "active",
  },
  {
    title: "bb8",
    time: "2021-08-06T22:46:34.565Z",
    _id: "bb8",
    status: "active",
  },
  {
    title: "bb9",
    time: "2021-08-06T22:46:33.565Z",
    _id: "bb9",
    status: "active",
  },

  {
    title: "bb10",
    time: "2021-08-06T22:46:34.565Z",
    _id: "bb10",
    status: "active",
  },
  {
    title: "bb11",
    time: "2021-08-06T22:46:34.565Z",
    _id: "bb11",
    status: "active",
  },
  {
    title: "bb12",
    time: "2021-08-06T22:46:34.565Z",
    videoSrc:
      "https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video",
    _id: "bb12",
    status: "active",
  },
  {
    title: "bb13",
    time: "2021-08-07T22:46:39.565Z",
    _id: "bb13",
    status: "active",
  },
];
const basicHeaders = [
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

const headersWithMoreSearch = [
  {
    label: "title",
    key: "title",
    search: true,
  },

  {
    label: "clickable",
    key: "description",
    search: true,
    click: true,
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
  {
    label: "stato",
    key: "status",
    type: "enum",
    select: ["active", "closed"],
    search: true,
  },
];
const headersWithNestedLabel = [
  {
    label: "title",
    key: "title",
    search: true,
  },
  {
    label: "description",
    key: "description",
    search: true,
  },
  {
    label: "nested",
    key: "testnested.nested",
    search: true,
  },
  {
    label: "data",
    key: "time",
    type: "datetime",
    format: "DD MMMM YYYY",
  },
];
const headersWithAllSearches = [
  {
    label: "title",
    key: "title",
    search: true,
  },
  {
    label: "description",
    key: "description",
    search: true,
  },
  {
    label: "nested",
    key: "testnested.nested",
    search: true,
  },
  {
    label: "data",
    key: "time",
    type: "datetime",
    format: "DD MMMM YYYY",
    search: true,
  },
];
const headersWithDateOnly = [
  {
    label: "title",
    key: "title",
  },
  {
    label: "description",
    key: "description",
    click: true,
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
    search: true,
  },
];

const actions = [
  {
    name: "testaction",
    type: "text",
    iconOrText: "string",
  },
  {
    name: "testaction2",
    type: "icon",
    iconOrText: "github",
  },
];

const selections = [
  {
    name: "testaction",
    type: "text",
    iconOrText: "string",
  },
  {
    name: "testaction2",
    type: "icon",
    iconOrText: "github",
  },
];

export default {
  title: "Table/Basic",
  argTypes: {
    size: { control: { type: "range", min: 1, max: rows.length + 2 } },
    page: { control: { type: "number" } },
    primarycolor: {
      control: { type: "color" },
    },

    enableselect: { type: "boolean" },
    selectrow: { type: "boolean" },

    pagechange: { action: "pagechangeEvent" },
    tableaction: { action: "tableactionEvent" },
    cellclick: { action: "cellclickEvent" },
    actiononselected: { action: "actiononselectedEvent" },
    clickonrow: { action: "clickonrowEvent" },
  },
} as Meta;

const Template: Story<TableProps> = (args) => createTable(args);

export const BasicTable = Template.bind({});
BasicTable.args = {
  headers: basicHeaders,
  rows,
  id: "BasicTable",
};
export const BasicTableWithClick = Template.bind({});
BasicTableWithClick.args = {
  headers: basicHeaders,
  rows,
  selectrow: true,
  id: "BasicTableWithClick",
};

export const BasicTableWithMoreSearchAndSelect = Template.bind({});
BasicTableWithMoreSearchAndSelect.args = {
  headers: headersWithMoreSearch,
  rows,
  enableselect: true,
  selectactions: selections,
  id: "BasicTableWithMoreSearchAndSelect",
};

export const BasicTableWithSearchOnNestedField = Template.bind({});
BasicTableWithSearchOnNestedField.args = {
  headers: headersWithNestedLabel,
  rows,
  id: "BasicTableWithSearchOnNestedField",
};

export const BasicTableWithSearchOnAllFields = Template.bind({});
BasicTableWithSearchOnAllFields.args = {
  headers: headersWithAllSearches,
  rows,
  id: "BasicTableWithSearchOnAllFields",
};
export const BasicTableWithDate = Template.bind({});
BasicTableWithDate.args = {
  headers: headersWithDateOnly,
  rows,
  id: "BasicTableWithDate",
};
export const BasicTableWithActions = Template.bind({});
BasicTableWithActions.args = {
  headers: headersWithAllSearches,
  rows,
  actions,
  id: "BasicTableWithActions",
};
export const BasicTableWithActionsAndSelect = Template.bind({});
BasicTableWithActionsAndSelect.args = {
  headers: headersWithAllSearches,
  rows,
  actions,
  selectactions: selections,
  id: "BasicTableWithActionsAndSelect",
};
