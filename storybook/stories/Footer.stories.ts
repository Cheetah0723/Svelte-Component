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
    smallrow: { control: { type: "text" } },
    columns: { control: { type: "text" } },
    brandandcontacts: { control: { type: "text" } },
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
    ],
    title: "stringtitle",
  },
];

const brandandcontacts1 = {};
const footerbottom1 = {};

export const Footer = Template.bind({});
Footer.args = {
  id: "BasicFooter",
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
