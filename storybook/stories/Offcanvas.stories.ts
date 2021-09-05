import { Story, Meta } from "@storybook/html";
import { createOffcanvas, OffcanvasProps } from "./Offcanvas";

export default {
  title: "Components/Offcanvas",
  argTypes: {
    opened: { control: { type: "boolean" } },

    pageclick: { action: "pageclickEvent" },
    offcanvasswitch: { action: "offcanvasswitchEvent" },
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
    group: "admin",
  },
  {
    label: "Users",
    key: "users",
    icon: "people-fill",
    group: "admin",
  },
  {
    label: "Stats",
    key: "stats",
    icon: "graph-up",
    group: "stats",
  },
];

const navlinks0 = [
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

const groups1 = [
  {
    key: "stats",
    label: "statistiche",
  },
  {
    key: "admin",
    label: "amministrazione",
  },
];

export const BasicOffcanvas = Template.bind({});
BasicOffcanvas.args = {
  id: "BasicOffcanvas",
  navlinks: navlinks0,
};
export const BasicOffcanvasOpen = Template.bind({});
BasicOffcanvasOpen.args = {
  opened: true,
  id: "BasicOffcanvasOpen",
  navlinks: navlinks0,
};
export const BasicOffcanvasOnSettings = Template.bind({});
BasicOffcanvasOnSettings.args = {
  opened: true,
  id: "BasicOffcanvasOnSettings",
  navlinks: navlinks0,
  navpage: "settings",
};
export const BasicOffcanvasWithGroups = Template.bind({});
BasicOffcanvasWithGroups.args = {
  opened: true,
  id: "BasicOffcanvasWithGroups",
  navlinks: navlinks1,
  groups: groups1,
};
export const BasicOffcanvasWithGroupsOnSettings = Template.bind({});
BasicOffcanvasWithGroupsOnSettings.args = {
  opened: true,
  id: "BasicOffcanvasWithGroupsOnSettings",
  navlinks: navlinks1,
  groups: groups1,
  navpage: "settings",
};
export const BasicOffcanvasWithAutoGroupsOnSettings = Template.bind({});
BasicOffcanvasWithAutoGroupsOnSettings.args = {
  opened: true,
  id: "BasicOffcanvasWithAutoGroupsOnSettings",
  navlinks: navlinks1,
  navpage: "settings",
};
