import { Story, Meta } from "@storybook/html";
import { createFormTextInput, FormTextInputProps } from "./FormTextInput";

export default {
  title: "Form/FormTextInput",
  argTypes: {
    id: { control: { disable: true } },
  },
} as Meta;

const Template: Story<FormTextInputProps> = (args) => createFormTextInput(args);

export const FormTextInputTemplate = Template.bind({});
FormTextInputTemplate.args = {
  id: "BasicFormTextInput",
  companybrandname: "testbrand",
  companylogouri:
    "https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg",
};
