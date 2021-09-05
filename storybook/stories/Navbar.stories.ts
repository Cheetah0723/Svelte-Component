import { Story, Meta } from "@storybook/html";
import { createNavbar, NavbarProps } from "./Navbar";

export default {
  title: "Components/Navbar",
  argTypes: {
    id: { control: { disable: true } },
  },
} as Meta;

const Template: Story<NavbarProps> = (args) => createNavbar(args);

export const BasicNavbar = Template.bind({});
BasicNavbar.args = {
  id: "BasicNavbar",
};
