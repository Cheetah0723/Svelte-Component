import { Story, Meta } from "@storybook/html";
import { createOffcanvas, OffcanvasProps } from "./Offcanvas";

export default {
  title: "Components/Offcanvas",
  argTypes: {
    opened: { control: { type: "boolean" } },

    pageclick: { action: "pageclickEvent" },
    Offcanvasswitch: { action: "sidebarswitchEvent" },
    pagechange: { action: "pagechangeEvent" },
    id: { control: { disable: true } },
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: Story<OffcanvasProps> = (args) => createOffcanvas(args);

const navlinks1 = [
  {
    label: "Home",
    key: "home",
    icon: "house-door",
  },
  {
    label: "Dashboard",
    key: "dashboard",
    icon: "speedometer",
  },
  {
    label: "Settings",
    key: "settings",
    icon: "gear",
  },
  {
    label: "Users",
    key: "users",
    icon: "people-fill",
  },
  {
    label: "Stats",
    key: "stats",
    icon: "graph-up",
  },
];

export const BasicOffcanvas = Template.bind({});
BasicOffcanvas.args = {
  id: "BasicOffcanvas",
  navlinks: navlinks1,
};
export const BasicOffcanvasOpen = Template.bind({});
BasicOffcanvasOpen.args = {
  opened: true,
  id: "BasicOffcanvasOpen",
  navlinks: navlinks1,
};
export const BasicOffcanvasOpenOnSettings = Template.bind({});
BasicOffcanvasOpenOnSettings.args = {
  opened: true,
  id: "BasicOffcanvasOpenOnSettings",
  navlinks: navlinks1,
  navpage: "settings",
};
