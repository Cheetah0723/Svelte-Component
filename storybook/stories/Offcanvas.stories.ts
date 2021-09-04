import { Story, Meta } from "@storybook/html";
import { createOffcanvas, OffcanvasProps } from "./Offcanvas";

export default {
  title: "Components/Offcanvas",
  argTypes: {
    opened: { control: { type: "boolean" } },
    pageclick: { action: "pageclickEvent" },
    Offcanvasswitch: { action: "sidebarswitchEvent" },
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: Story<OffcanvasProps> = (args) => createOffcanvas(args);

export const BasicOffcanvas = Template.bind({});
BasicOffcanvas.args = {
  id: "BasicOffcanvas",
};
export const BasicOffcanvasOpen = Template.bind({});
BasicOffcanvasOpen.args = {
  opened: true,
  id: "BasicOffcanvas",
};
