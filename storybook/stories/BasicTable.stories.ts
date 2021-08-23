import { Story, Meta } from "@storybook/html";
import { createTable, TableProps } from "./BasicTable";

const rows = [
  {
    title: "bau",
    videoSrc:
      "https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video",
    time: "2021-08-06T22:46:30.565Z",
  },
  {
    title: "bb1",
    videoSrc:
      "https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video",
    time: "2021-08-06T22:46:31.565Z",
    description: "ffff2",
  },
  { title: "bb2", time: "2021-08-02T22:46:32.565Z" },
  {
    title: "ss",
    time: "2021-08-06T22:46:34.565Z",
    description: "fffffff",
    testnested: { nested: "dddd" },
  },
  { title: "bb4", time: "2021-08-06T22:46:34.565Z" },
  { title: "aa5", time: "2021-08-06T22:46:34.565Z" },
  { title: "bb6", time: "2021-08-06T22:46:34.565Z" },
  { title: "bb7", time: "2021-08-06T22:46:34.565Z" },
  { title: "bb8", time: "2021-08-06T22:46:34.565Z" },
  { title: "bb9", time: "2021-08-06T22:46:33.565Z" },
  { title: "bb10", time: "2021-08-06T22:46:34.565Z" },
  { title: "bb11", time: "2021-08-06T22:46:34.565Z" },
  {
    title: "bb12",
    time: "2021-08-06T22:46:34.565Z",
    videoSrc:
      "https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video",
  },
  { title: "bb13", time: "2021-08-07T22:46:39.565Z" },
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

const headers2 = [
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
  },
  {
    label: "data",
    key: "time",
    type: "datetime",
    format: "DD MMMM YYYY",
  },
];
const headers3 = [
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
const headers4 = [
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
const headers5 = [
  {
    label: "title",
    key: "title",
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
    search: true,
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

    pagechange: { action: "pagechangeEvent" },
  },
} as Meta;

const Template: Story<TableProps> = (args) => createTable(args);

export const BasicTable = Template.bind({});
BasicTable.args = {
  headers: basicHeaders,
  rows,
};

export const BasicTableWithMoreSearch = Template.bind({});
BasicTableWithMoreSearch.args = {
  headers: headers2,
  rows,
};

export const BasicTableWithSearchOnNestedField = Template.bind({});
BasicTableWithSearchOnNestedField.args = {
  headers: headers3,
  rows,
};

export const BasicTableWithSearchOnAllFields = Template.bind({});
BasicTableWithSearchOnAllFields.args = {
  headers: headers4,
  rows,
};
export const BasicTableWithDate = Template.bind({});
BasicTableWithDate.args = {
  headers: headers5,
  rows,
};
