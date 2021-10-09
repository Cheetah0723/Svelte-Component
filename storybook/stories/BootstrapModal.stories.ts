import { Story, Meta } from "@storybook/html";
import { createBootstrapModal, BootstrapModalProps } from "./BootstrapModal";

export default {
  title: "Components/Modal",
  argTypes: {
    id: { control: { disable: true } },
  },
} as Meta;

const Template: Story<BootstrapModalProps> = (args) =>
  createBootstrapModal(args);

export const BasicBootstapModal = Template.bind({});
BasicBootstapModal.args = {
  id: "BasicBootstapModal",
};
