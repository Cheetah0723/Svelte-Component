import { Story, Meta } from "@storybook/html";
import { createLoginRegister, LoginRegisterProps } from "./LoginRegister";

export default {
  title: "Components/LoginRegister",
  argTypes: {
    page: { control: { type: "number" } },
    pagechange: { action: "pagechangeEvent" },
  },
} as Meta;

const Template: Story<LoginRegisterProps> = (args) => createLoginRegister(args);

export const LoginRegister = Template.bind({});
LoginRegister.args = {
  pages: 9,
};
