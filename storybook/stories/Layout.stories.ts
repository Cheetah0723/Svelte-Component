import { Story, Meta } from "@storybook/html";
import { createLayout, LayoutProps } from "./Layout";

export default {
  title: "Layout/MainLayout",
  argTypes: {
    id: { control: { disable: true } },
  },
} as Meta;
const company1 = {
  logoUri: "https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg",
  siteName: "testsite",
  companyName: "testcompany S.R.L.",
  registration: "copyright",
  description: `testo e descrizione di esempio dell'applicazione`,
  vatNumber: "aa - ffffff",
  fiscalCode: "f4f5f6fff",
};
const Template: Story<LayoutProps> = (args) => createLayout(args);

export const LayoutA = Template.bind({});
LayoutA.args = {
  id: "LayoutA",
  company: company1,
};
