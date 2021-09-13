import { Story, Meta } from "@storybook/html";
import { createNavbar, NavbarProps } from "./Navbar";

export default {
  title: "Layout/Navbar",
  argTypes: {
    id: { control: { disable: true } },
    pagetitle: { control: { type: "text" } },
    companybrandname: { control: { type: "text" } },
    companylogouri: { control: { type: "text" } },
    navmenuswitch: { action: "navmenuswitchEvent" },
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: Story<NavbarProps> = (args) => createNavbar(args);

export const BasicNavbar = Template.bind({});
BasicNavbar.args = {
  id: "BasicNavbar",
  companybrandname: "testbrand",
  companylogouri:
    "https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg",
};
export const BasicNavbarWithTitle = Template.bind({});
BasicNavbarWithTitle.args = {
  id: "BasicNavbarWithTitle",
  companybrandname: "testbrand2",
  pagetitle: "pagetest",
};
export const BasicNavbarWithTitleOpen = Template.bind({});
BasicNavbarWithTitleOpen.args = {
  id: "BasicNavbarWithTitleOpen",
  companybrandname: "testbrand2",
  pagetitle: "pagetest",
  switchopen: true,
};
export const NavbarSlotted = Template.bind({});
NavbarSlotted.args = {
  id: "NavbarSlotted",
  companybrandname: "testbrand2",
  pagetitle: "pagetest",
  switchopen: true,
};
