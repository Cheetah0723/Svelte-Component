import { Story, Meta } from "@storybook/html";
import { createLoginRegister, LoginRegisterProps } from "./LoginRegister";

export default {
  title: "Components/LoginRegister",
  argTypes: {
    type: {
      options: ["login", "register"],
      control: { type: "select" }, // Automatically inferred when 'options' is defined
    },
    login: { action: "loginEvent" },
  },
} as Meta;

const Template: Story<LoginRegisterProps> = (args) => createLoginRegister(args);

export const Login = Template.bind({});
Login.args = {
  type: "login",
};
export const Register = Template.bind({});
Register.args = {
  type: "register",
};
