import { Story, Meta } from "@storybook/html";
import { createSidebar, SidebarProps } from "./Sidebar";

export default {
  title: "Components/Sidebar",
  argTypes: {
    opened: { control: { type: "boolean" } },
    pageclick: { action: "pageclickEvent" },
    sidebarswitch: { action: "sidebarswitchEvent" },
    id: { control: { disable: true } },
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: Story<SidebarProps> = (args) => createSidebar(args);

export const BasicSidebar = Template.bind({});
BasicSidebar.args = {
  id: "BasicSidebar",
};
export const BasicSidebarClosed = Template.bind({});

BasicSidebarClosed.args = {
  opened: true,
  id: "BasicSidebarClosed",
};
