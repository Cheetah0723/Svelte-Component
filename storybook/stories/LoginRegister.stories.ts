import { Story, Meta } from "@storybook/html";
import { createLoginRegister, LoginRegisterProps } from "./LoginRegister";

export default {
  title: "Components/LoginRegister",
  argTypes: {
    type: {
      options: ["login", "register"],
      control: { type: "select" }, // Automatically inferred when 'options' is defined
    },
    language: { type: "string" },
    loginuri: { type: "string" },
    registeruri: { type: "string" },
    login: { action: "loginEvent" },
    register: { action: "registerEvent" },
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
export const LoginEn = Template.bind({});
LoginEn.args = {
  type: "login",
  language: "en",
};

export const LoginEnWithFetch = Template.bind({});
LoginEnWithFetch.args = {
  type: "login",
  language: "en",
  loginuri: "https://kernel.free.beeceptor.com/login",
  registeruri: "https://kernel.free.beeceptor.com/register",
};
