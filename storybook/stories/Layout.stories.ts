import { Story, Meta } from "@storybook/html";
import { createLayout, LayoutProps } from "./Layout";

export default {
  title: "Layout/MainLayout",
  argTypes: {
    id: { control: { disable: true } },
  },
} as Meta;

const Template: Story<LayoutProps> = (args) => createLayout(args);

export const LayoutA = Template.bind({});
LayoutA.args = {
  id: "LayoutA",
  phone: { number: 465564 },
};
