import { Story, Meta } from "@storybook/html";
import { createFooter, FooterProps } from "./Footer";

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

export const BasicFooter = Template.bind({});
BasicFooter.args = {
  id: "BasicFooter",
  companybrandname: "testbrand",
};
export const BasicFooterWithTitle = Template.bind({});
BasicFooterWithTitle.args = {
  id: "BasicFooterWithTitle",
  companybrandname: "testbrand2",
  pagetitle: "pagetest",
};
export const BasicFooterWithTitleOpen = Template.bind({});
BasicFooterWithTitleOpen.args = {
  id: "BasicFooterWithTitleOpen",
  companybrandname: "testbrand2",
  pagetitle: "pagetest",
  switchopen: true,
};
export const FooterSlotted = Template.bind({});
FooterSlotted.args = {
  id: "FooterSlotted",
  companybrandname: "testbrand2",
  pagetitle: "pagetest",
  switchopen: true,
};
