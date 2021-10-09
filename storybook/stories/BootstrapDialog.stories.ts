import { Story, Meta } from "@storybook/html";
import { createBootstrapDialog, BootstrapDialogProps } from "./BootstrapDialog";

export default {
  title: "Components/Dialog",
  argTypes: {
    id: { control: { disable: true } },
    show: { control: { type: "boolean" } },
  },
} as Meta;

const Template: Story<BootstrapDialogProps> = (args) =>
  createBootstrapDialog(args);

export const BasicBootstapModal = Template.bind({});
BasicBootstapModal.args = {
  id: "BasicBootstapModal",
};
