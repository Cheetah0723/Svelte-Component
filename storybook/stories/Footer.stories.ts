import { Story, Meta } from "@storybook/html";
import { createFooter, FooterProps } from "./Footer";
interface IColumn {
  _id?: string;
  cells: { label: string; key: string }[];
  title: string;
}
export default {
  title: "Layout/Footer",
  argTypes: {
    id: { control: { disable: true } },
    smallrow: { control: { type: "object" } },
    columns: { control: { type: "array" } },
    companyname: { control: { type: "text" } },
    companylogouri: { control: { type: "text" } },
    brandandcontacts: { control: { type: "object" } },
    footerclick: { action: "footerClickEvent" },
  },
} as Meta;

const Template: Story<FooterProps> = (args) => createFooter(args);

const columns1: IColumn[] = [
  {
    cells: [
      {
        label: "test",
        key: "test",
      },
      {
        label: "test2",
        key: "test2",
      },
      {
        label: "test3",
        key: "test3",
      },
    ],
    title: "stringtitle",
  },
  {
    cells: [
      {
        label: "test",
        key: "test",
      },
      {
        label: "test2",
        key: "test2",
      },
      {
        label: "test3",
        key: "test3",
      },
    ],
    title: "stringtitle",
  },
  {
    cells: [
      {
        label: "test",
        key: "test",
      },
      {
        label: "test2",
        key: "test2",
      },
      {
        label: "test3",
        key: "test3",
      },
    ],
    title: "stringtitle",
  },
];

const brandandcontacts1 = {};
const footerbottom1 = {};

export const Footer = Template.bind({});
Footer.args = {
  id: "BasicFooter",
  companyname: "testcompany",
  companylogouri:
    "https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg",
  brandandcontacts: brandandcontacts1,
  columns: columns1,
  footerbottom: footerbottom1,
};
export const FooterWithBrand = Template.bind({});
FooterWithBrand.args = {
  id: "FooterWithBrand",
  brandandcontacts: brandandcontacts1,
};
export const FooterWithColumns = Template.bind({});
FooterWithColumns.args = {
  id: "FooterWithColumns",
  columns: columns1,
};
export const FooterWithBottom = Template.bind({});
FooterWithBottom.args = {
  id: "FooterWithBottom",
  footerbottom: footerbottom1,
};
